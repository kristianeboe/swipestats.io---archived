const mongoose = require("mongoose");
const Profile = require("../models/profile");

const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true });

module.exports = {
  getOne(profileId) {
    return Profile.findOne({ _id: profileId })
      .lean()
      .exec();
  },
  async createProfile(profileData) {
    console.log("creating new user", profileData.userId);
    return Profile.updateOne(
      {
        _id: profileData.userId
      },

      {
        _id: profileData.userId,
        ...profileData
      },
      {
        upsert: true
      }
    ).exec();
  },
  async getAllProfiles() {
    return Profile.find()
      .lean()
      .exec();
  },
  async deleteProfile(profileId) {
    return Profile.deleteOne({ _id: profileId }).exec();
  },
  async deleteRandomProfile() {
    return Profile.deleteOne({}).exec();
  }
};
