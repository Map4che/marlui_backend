const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  elements: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "productSchema",
      },
      quantity: {
        type: Number,
        trim: true,
        required: true,
      },
    },
  ],
  total: {
    type: Number,
    trim: true,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userSchema",
  },
});

module.exports = mongoose.model("Order", orderSchema);
