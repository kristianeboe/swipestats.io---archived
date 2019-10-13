const mongoose = require('mongoose');
const Profile = require('../models/profile');

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true });

module.exports = {
  getOne(profileId) {
    return Profile.findOne({ _id: profileId })
      .lean()
      .exec();
  },
  async createProfile(profileData) {
    return Profile.update(
      {
        _id: profileData.userId,
      },

      {
        _id: profileData.userId,
        ...profileData,
      },
      {
        upsert: true,
      }
    ).exec();
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
