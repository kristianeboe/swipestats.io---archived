const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  _id: { type: String, required: true, max: 100 },
  userId: { type: String, required: true, max: 100 },
  user: {},
  swipes: {},
  swipeLikes: {},
  swipePasses: {},
  matches: {},
  messages: {},
  messagesSent: {},
  messagesReceived: {},
  appOpens: {},
  conversationsMeta: {},
  conversations: []
});

module.exports = mongoose.model("profile", profileSchema, "profiles");
