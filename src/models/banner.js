const mongoose = require("mongoose");

const schemaBanner = mongoose.Schema({
  image: {
    type: String,
    trime: true,
    required: true,
  },
  title: {
    type: String,
    trime: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("Banner", schemaBanner);
