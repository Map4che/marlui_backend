const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
    required: false,
  },
  admin: {
    type: Boolean,
    required: false,
  }
});

module.exports = mongoose.model("users", userSchema);
