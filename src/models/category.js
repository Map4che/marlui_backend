const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
    requires: true,
  },
});

module.exports = mongoose.model("categories", categorySchema);
