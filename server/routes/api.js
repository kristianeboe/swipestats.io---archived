const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const bodyParser = require("body-parser");

const profileService = require("../services/profile.service.js");

router.get("/", (_req, res) => {
  res.send("Health ok");
});

const fileConfig = {
  supportedMimes: {
    "text/csv": "csv",
    "application/json": "json"
  },
  uploadsFolder: "server/uploads",
  dbConnection: "mongodb://127.0.0.1:27017/fileuploaddb"
};
const multer = require("multer");

// File upload is no longer used. Instead data is purely JSON based. However, it is kept for reference
// START FILE UPLOAD

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: fileConfig.uploadsFolder,
    filename: (req, file, cb) => {
      console.log("multer req", req._fileId);
      let extension = fileConfig.supportedMimes[file.mimetype];
      let originalname = file.originalname.split(".")[0];
      let fileName =
        (req._fileId || originalname + "-" + new Date().getMilliseconds()) +
        "." +
        extension;
      cb(null, fileName);
    }
  }),
  fileFilter: (_req, file, cb) => {
    let extension = fileConfig.supportedMimes[file.mimetype];
    if (!extension) {
      return cb(null, false);
    } else {
      cb(null, true);
    }
  }
});

router.post(
  "/upload",
  (req, _res, next) => {
    const fileId = shortid.generate();
    req._fileId = fileId;
    next();
  },
  multerUpload.any(),
  async (req, res) => {
    console.log("initiate upload");

    const fileId = req._fileId;
    console.log("fileId", fileId);

    return res.send(fileId);
  }
);

// END FILE UPLOAD

function treatAsUTC(date) {
  var result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
}

function daysBetween(startDate, endDate) {
  var millisecondsPerDay = 24 * 60 * 60 * 1000;
  return (treatAsUTC(endDate) - treatAsUTC(startDate)) / millisecondsPerDay;
}

function getConversationsMeta(conversations) {
  const meta = {
    nrOfConversations: conversations.length,
    longestConversation: 0,
    longestConversationInDays: 0, //days
    averageConversationLength: 0,
    averageConversationLengthInDays: 0, //days
    medianConversationLength: 0,
    medianConversationLengthInDays: 0, // days
    nrOfOneMessageConversations: 0,
    percentOfOneMessageConversations: 0,
    nrOfGhostingsAfterInitialMessage: 0
    //nrOfGhostings
  };

  if (conversations.length === 0) return meta;

  const conversationLengths = [];

  conversations.forEach(conversation => {
    const messagesSent = conversation.messages.length;

    meta.averageConversationLength += messagesSent;

    if (messagesSent === 0) {
      meta.nrOfGhostingsAfterInitialMessage += 1;
      conversationLengths.push({
        days: 0,
        messages: 0
      });
    } else {
      if (messagesSent === 1) {
        meta.nrOfOneMessageConversations += 1;
      }

      const conversationStartDate = new Date(
        conversation.messages[0].sent_date
      );
      const conversationEndDate = new Date(
        conversation.messages[messagesSent - 1].sent_date
      );
      const conversationLength = daysBetween(
        conversationStartDate,
        conversationEndDate
      );

      conversationLengths.push({
        days: conversationLength,
        messages: messagesSent
      });

      if (messagesSent > meta.longestConversation) {
        meta.longestConversation = messagesSent;
      }

      if (conversationLength > meta.longestConversationInDays) {
        meta.longestConversationInDays = conversationLength;
      }

      meta.averageConversationLengthInDays += conversationLength;
    }
  });

  meta.medianConversationLengthInDays = conversationLengths.sort(
    (a, b) => a.days - b.days
  )[Math.floor(conversationLengths.length / 2)].days; // fake median

  meta.medianConversationLength = conversationLengths.sort(
    (a, b) => a.messages - b.messages
  )[Math.floor(conversationLengths.length / 2)].messages; // fake median

  meta.averageConversationLength = Number(
    Number(meta.averageConversationLength / meta.nrOfConversations)
  );

  meta.averageConversationLengthInDays = Number(
    Number(meta.averageConversationLengthInDays / meta.nrOfConversations)
  );

  meta.percentOfOneMessageConversations =
    (meta.nrOfOneMessageConversations / meta.nrOfConversations) * 100;

  return meta;
}

router.post(
  "/uploadData",
  bodyParser.json({ limit: "10mb", extended: true }),
  async (req, res) => {
    console.log("creating new profile");
    let data;

    try {
      data = req.body;
      console.log("parsed body keys", Object.keys(data));
    } catch (error) {
      console.log(Object.keys(data));
      console.log(error);
      return res.status(500).json(error);
    }

    const { userId, conversations, ...profile } = data;
    console.log(userId);
    const now = Date.now();

    const newProfile = await profileService.createProfile({
      userId,
      conversationsMeta: getConversationsMeta(conversations),
      conversations,
      meta: {
        created: now,
        updated: now
      },
      ...profile
    });

    console.log("newProfile", userId, newProfile);

    return res.status(201).json({
      userId,
      success: true
    });
  }
);

router.get("/profileData/:profileId", async (req, res) => {
  const { profileId } = req.params;
  console.log("getting data for", profileId);

  if (typeof profileId !== String && profileId.length < 5) {
    return res
      .status(401)
      .json({ message: "ProfileId is malformed or too short" });
  }

  try {
    const profileData = await profileService.getOne(profileId);
    return res.status(200).json(profileData || {});
  } catch (e) {
    console.log("profile fetch failed", e);
    return res.status(500).json({
      message: `Profile fetch for ${profileId} failed`,
      profileId
    });
  }
});

router.get("/get-all", async (_req, res) => {
  const allProfiles = await profileService.getAllProfiles();
  const allProfileIds = allProfiles.map(profile => profile._id);
  // const allProfileIds = await profileService.getAllIds();

  return res.json(allProfileIds);
});

router.get("/deleteProfile/:profileId", async (req, res) => {
  const deleteRes = await profileService.deleteProfile(req.params.profileId);

  return res.json(deleteRes);
});

router.get("/deleteRandomProfile/:adminId", async (req, res) => {
  if (req.params.adminId !== process.env.ADMIN_PROFILE) {
    return res.status(401).json({});
  }
  const deleteRes = await profileService.deleteRandomProfile();

  return res.json(deleteRes);
});

const aggregateObjects = (arr, valueMapping) =>
  arr.reduce((aggregate, [key, value]) => {
    //for (const [key, value] of entry) {
    if (!aggregate[key]) {
      aggregate[key] = 0;
    }

    aggregate[key] = valueMapping(aggregate[key], value);

    // aggregate[date] += value;
    //}

    return aggregate;
  }, {});

function calculateAge(birthday) {
  // birthday is a date
  var ageDifMs = Date.now() - birthday;
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function calculateYearDiff(date1, date2) {
  return Math.abs(date1.getUTCFullYear() - date2.getUTCFullYear());
}

const profileAverages = p => {
  try {
    const matches = Object.entries(p.matches);
    const swipeLikes = Object.entries(p.swipeLikes);
    const swipePasses = Object.entries(p.swipePasses);
    const messagesSent = Object.entries(p.messagesSent);
    const messagesReceived = Object.entries(p.messagesReceived);
    const allMessages = Object.entries(
      aggregateObjects(messagesSent.concat(messagesReceived), (a, b) => a + b)
    );
    const allSwipes = Object.entries(
      aggregateObjects(swipeLikes.concat(swipePasses), (a, b) => a + b)
    );

    const totals = {
      matches: matches.reduce((acc, cur) => acc + cur[1], 0),
      messages: allMessages.reduce((acc, cur) => acc + cur[1], 0),
      swipes: allSwipes.reduce((acc, cur) => acc + cur[1], 0),
      swipeLikes: swipeLikes.reduce((acc, cur) => acc + cur[1], 0),
      swipePasses: swipePasses.reduce((acc, cur) => acc + cur[1], 0),
      messagesSent: messagesSent.reduce((acc, cur) => acc + cur[1], 0),
      messagesReceived: messagesReceived.reduce((acc, cur) => acc + cur[1], 0)
    };

    const averages = {
      matches: totals.matches / matches.length,
      messages: totals.messages / allMessages.length,
      swipes: totals.swipes / allSwipes.length
    };

    const ratios = {
      matchesToSwipeLikes: totals.matches / totals.swipeLikes,
      swipesPositiveNegative: totals.swipeLikes / totals.swipePasses,
      messagesSentReceived: totals.messagesSent / totals.messagesReceived
    };

    return {
      id: p._id,
      firstMatchDate: matches[0][0],
      lastMatchDate: matches[matches.length - 1][0],
      daysCounted: matches.length,
      totals,
      // averages,
      ratios,
      profile: {
        gender: p.user.gender,
        age: calculateAge(new Date(p.user.birthDate)),
        ageFilterMin: p.user.ageFilterMin,
        ageFilterMax: p.user.ageFilterMax,
        cityName: p.user.cityName,
        country: p.user.country,
        createdTinderWhenTheyWereAge: calculateYearDiff(
          new Date(p.user.birthDate),
          new Date(p.user.createDate)
        )
      }
    };
  } catch (error) {
    return {};
  }
};

function flattenObject(yourObject) {
  return Object.assign(
    {},
    ...(function _flatten(o) {
      return [].concat(
        ...Object.keys(o).map(k =>
          typeof o[k] === "object" ? _flatten(o[k]) : { [k]: o[k] }
        )
      );
    })(yourObject)
  );
}

router.get("/profiles/analytics", async (req, res) => {
  const males = await profileService.getProfiles({ "user.gender": "M" });
  const females = await profileService.getProfiles({ "user.gender": "F" });

  return res.json({
    m: males.length,
    mAverage: reduceListOfObjectsByKey(
      males.map(profileAverages),
      values => values.reduce((a, b) => a + b) / values.length
    ),
    fAverage: reduceListOfObjectsByKey(
      females.map(profileAverages),
      values => values.reduce((a, b) => a + b) / values.length
    ),
    maleAverages: males.slice(0, 5).map(profileAverages),
    f: females.length,
    femaleAverages: females.slice(0, 5).map(profileAverages),
    example: Object.keys(males[0]),
    exampleUser: Object.keys(males[0].user)
  });
});

function reduceListOfObjectsByKey(data, func) {
  return Array.from(
    data.reduce((acc, obj) => {
      try {
        const flatObj = flattenObject(obj);
        return Object.keys(flatObj).reduce(
          (acc, key) =>
            typeof flatObj[key] == "number"
              ? acc.set(key, (acc.get(key) || []).concat(flatObj[key]))
              : acc,
          acc
        );
      } catch (error) {
        return acc;
      }
    }, new Map())
  ).reduce(
    (acc, [name, values]) =>
      Object.assign(acc, {
        [name]: func(values)
      }),
    {}
  );
}

module.exports = router;
