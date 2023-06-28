const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  authId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  homeFolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
  }
});

module.exports = mongoose.model("User", UserSchema);
