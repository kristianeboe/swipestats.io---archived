const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
  userId: { type: String, required: true, max: 100 },
  matches: {},
  user: {},
});

module.exports = mongoose.model('profile', profileSchema, 'profiles');
