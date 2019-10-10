const mongoose = require('mongoose');
const Profile = require('../models/profile');

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true });

module.exports = {
  getOne: profileId => {
    Profile.findOne({ profileId }, (err, file) => {
      if (err) {
        throw err;
      }
      return file;
    });
  },
  async createProfile(profileData) {
    return Profile.create(
      {
        _id: profileData.userId,
        ...profileData,
      },
      function(err, small) {
        if (err) {
          console.log(err);
          return;
        }
        console.log('profile saved', profileData.userId);
        // saved!
      }
    );
  },
  async getAllIds() {
    return Profile.find((err, profiles) => {
      if (err) {
        return res.status(404).end();
      }
      console.log('Profiles fetched successfully', profiles.length);

      return profiles.map(profile => profile.userId);
    });
  },
};
