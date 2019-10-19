const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const fs = require('fs');
const bodyParser = require('body-parser');

const File = require('../models/file');

// const fileService = require('../services/file.service.js');
const profileService = require('../services/profile.service.js');
const { aggregateByMonth } = require('../utils/normalization');
// const app = express();
// router.get('/files', fileService.getAll);

router.get('/', (req, res) => {
  res.send('Hello Kristian');
});

// Get one subscriber
// router.get('/:id', (req, res) => {
// })

// Create one subscriber
router.post('/', (req, res) => {});

// Update one subscriber
router.patch('/:id', (req, res) => {});

// Delete one subscriber
router.delete('/:id', (req, res) => {});

const fileConfig = {
  supportedMimes: {
    'text/csv': 'csv',
    'application/json': 'json',
  },
  uploadsFolder: 'server/uploads',
  dbConnection: 'mongodb://127.0.0.1:27017/fileuploaddb',
};
const multer = require('multer');

const multerUpload = multer({
  storage: multer.diskStorage({
    destination: fileConfig.uploadsFolder,
    filename: (req, file, cb) => {
      console.log('multer req', req._fileId);
      let extension = fileConfig.supportedMimes[file.mimetype];
      let originalname = file.originalname.split('.')[0];
      let fileName =
        (req._fileId || originalname + '-' + new Date().getMilliseconds()) +
        '.' +
        extension;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    let extension = fileConfig.supportedMimes[file.mimetype];
    if (!extension) {
      return cb(null, false);
    } else {
      cb(null, true);
    }
  },
});

console.log(multerUpload);
router.post(
  '/upload',
  (req, res, next) => {
    const fileId = shortid.generate();
    req._fileId = fileId;
    next();
  },
  multerUpload.any(),
  async (req, res, next) => {
    console.log('initiate upload');

    const fileId = req._fileId;
    console.log('fileId', fileId);

    // const [tinderData] = req.files;

    // console.log('tinderdata', tinderData);

    // try {
    //   console.log(JSON.parse(tinderData));
    // } catch (error) {
    //   console.log('failed parsing json');
    // }

    // fs.mkdirSync(`./filesData/${fileId}/`);
    // fs.writeFileSync(
    //   `./filesData/${fileId}/${fileId}-tinder-data.json`,
    //   tinderData
    // );

    // console.log('directory created, in theory');

    return res.send(fileId);
  }
);

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
    nrOfGhostingsAfterInitialMessage: 0,
    //nrOfGhostings
  };

  const conversationLengths = [];

  conversations.forEach(conversation => {
    const messagesSent = conversation.messages.length;

    if (messagesSent === 0) {
      meta.nrOfGhostingsAfterInitialMessage += 1;
      conversationLengths.push({
        days: 0,
        messages: 0,
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
        messages: messagesSent,
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
  '/uploadData',
  bodyParser.json({ limit: '10mb', extended: true }),
  async (req, res, next) => {
    console.log('creating new profile');
    let data;

    try {
      data = req.body;
      console.log('parsed body keys', Object.keys(data));
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
      ...profile,
    });

    console.log('newProfile', newProfile);

    return res.status(201).json({
      userId,
      success: true,
    });
  }
);

// router.patch('/upload/:id', multerUpload.any(), async (req, res, next) => {
//   console.log('patching');
// });

// router.patch('/upload', multerUpload.any(), async (req, res, next) => {
//   console.log('start finalize upload');
//   let savedModels = [];

//   try {
//     const file = req.files[0];

//     let fileModel = new File({
//       name: file.filename,
//     });

//     fileModel.save(err => {
//       if (err) {
//         return next('Error creating new file', err);
//       }
//       fileModel.encodedName = shortid.generate(); // btoa(fileModel._id)
//       fileModel.save(err => {
//         if (err) {
//           return next('Error creating new file', err);
//         }
//         savedModels.push(fileModel);

//         console.log('File created successfully');
//       });
//     });

//     return res.send(savedModels);
//   } catch (e) {
//     return res.status(400).end();
//   }

//   // try {
//   //     await req.files.reduce(async (acc, file) => {
//   //         await acc

//   //         let fileModel = new File({
//   //             name: file.filename
//   //         });

//   //         return fileModel.save((err) => {
//   //             if (err) {
//   //                 return next('Error creating new file', err);
//   //             }
//   //             fileModel.encodedName = shortid.generate() // btoa(fileModel._id)
//   //             fileModel.save((err) => {
//   //                 if (err) {
//   //                     return next('Error creating new file', err);
//   //                 }
//   //                 savedModels.push(fileModel)

//   //                 console.log('File created successfully');
//   //             })
//   //         });
//   //     })

//   //     return res.send(savedModels)

//   // } catch (e) {
//   //     return res.status(400).end();
//   // }
// });

router.get('/get-kristian', (req, res, next) => {
  const kristianTinderData = require('../models/data.json');
  // console.log(kristianTinderData.User);
  const mySwipeStatsData = getSwipeStatsData(kristianTinderData);
  return res.json(mySwipeStatsData);
});

router.get('/profileData/:profileId', async (req, res, next) => {
  const { profileId } = req.params;
  console.log('getting data for', profileId);

  const profileData = await profileService.getOne(profileId);
  console.log('got profileData', profileData.userId);

  const matchesByMonth = aggregateByMonth(profileData.matches);
  const appOpensByMonth = aggregateByMonth(profileData.appOpens);
  console.log('aggregation complete');

  const messagesByMonth = {
    sent: aggregateByMonth(profileData.messages.sent),
    received: aggregateByMonth(profileData.messages.received),
  };

  profileData.matchesByMonth = matchesByMonth;
  profileData.appOpensByMonth = appOpensByMonth;
  profileData.messagesByMonth = messagesByMonth;

  console.log(
    'profileData keys to be sent to client',
    Object.keys(profileData)
  );

  return res.status(200).json(profileData || {});
});

router.get('/get-all', async (req, res, next) => {
  const allProfileIds = await profileService.getAllIds();

  return res.json(allProfileIds);
});

function getSwipeStatsData(tinderData) {
  var md5 = require('md5');

  const secretId = md5(
    tinderData.User.email +
      tinderData.User.username +
      tinderData.User.create_date
  );

  return {
    userId: secretId,
    user: tinderData.User,
    swipes: {
      likes: tinderData.Usage.swipes_likes,
      swipes: tinderData.Usage.swipes_passe,
    },
    matches: tinderData.Usage.matches,
    messages: {
      sent: tinderData.Usage.messages_sent,
      received: tinderData.Usage.messages_received,
    },
  };
}

module.exports = router;
