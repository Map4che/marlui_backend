const mongoose = require("mongoose");
//const category = require("category.js");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    required: true,
  },
  quantity: {
    type: Number,
    trim: true,
    required: true,
  },
  image: {
    type: String,
    trim: true,
    requiered: true,
  },
});

module.exports = mongoose.model("products", productSchema);
