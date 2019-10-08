const mongoose = require('mongoose');
const Profile = require('../models/profile');

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true });

module.exports = {
  getOne: profileId => {
    Profile.findOne(profileId, (err, file) => {
      if (err) {
        throw err;
      }
      return file;
    });
  },
  async createProfile(profileData) {
    const newProfile = await Profile.create(profileData);
    return newProfile;
  },
  getAll: (req, res, next) => {
    File.find((err, files) => {
      if (err) {
        return res.status(404).end();
      }
      console.log('File fetched successfully');
      res.send(files);
    });
  },
};
