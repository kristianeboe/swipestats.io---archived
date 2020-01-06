const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const bodyParser = require("body-parser");

const File = require("../models/file");

const profileService = require("../services/profile.service.js");

router.get("/", (req, res) => {
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
  fileFilter: (req, file, cb) => {
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
  (req, res, next) => {
    const fileId = shortid.generate();
    req._fileId = fileId;
    next();
  },
  multerUpload.any(),
  async (req, res, next) => {
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
  async (req, res, next) => {
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

    const newProfile = await profileService.createProfile({
      userId,
      conversationsMeta: getConversationsMeta(conversations),
      conversations,
      ...profile
    });

    console.log("newProfile", newProfile);

    return res.status(201).json({
      userId,
      success: true
    });
  }
);

router.get("/profileData/:profileId", async (req, res, next) => {
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

  console.log("got profileData", profileData.userId);
});

router.get("/get-all", async (req, res, next) => {
  const allProfiles = await profileService.getAllProfiles();
  const allProfileIds = allProfiles.map(profile => profile._id);
  // const allProfileIds = await profileService.getAllIds();

  return res.json(allProfileIds);
});

router.get("/deleteProfile/:profileId", async (req, res, next) => {
  const deleteRes = await profileService.deleteProfile(req.params.profileId);

  return res.json(deleteRes);
});

module.exports = router;
