const mongoose = require("mongoose");
const FileSchema = new mongoose.Schema({
  name: { type: String, required: true, max: 100 },
  encodedName: { type: String, required: false, max: 100, default: null },
  uploadDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("file", FileSchema, "files");
