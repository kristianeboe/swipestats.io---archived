const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({ any: {} });

module.exports = mongoose.model('profile', profileSchema, 'profiles');
