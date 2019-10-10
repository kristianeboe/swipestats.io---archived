const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const fs = require('fs');
const bodyParser = require('body-parser');

const File = require('../models/file');

// const fileService = require('../services/file.service.js');
const profileService = require('../services/profile.service.js');
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

router.post('/uploadData', bodyParser.json(), async (req, res, next) => {
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

  const { userId, ...profile } = data;
  console.log(userId);

  const newProfile = await profileService.createProfile({ userId, ...profile });

  console.log('newProfile', newProfile);

  return res.status(201).json({
    userId,
    success: true,
  });
});

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
      sendt: tinderData.Usage.messages_sent,
      received: tinderData.Usage.messages_receive,
    },
  };
}

module.exports = router;
