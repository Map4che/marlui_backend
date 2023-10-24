const orderSchema = require("../models/order");
const authRequerid = require("../middlewares/validateTokenAdmin");
const express = require("express");

const router = express.Router();

router.post("/order", authRequerid, async (req, res) => {
  const { product, price, elements, total } = req.body;
  try {
    const newOrder = new orderSchema({
      product,
      price,
      elements,
      total,
      user: req.user.id,
    });
    newOrder.save();
    res.status(200).json({ message: "Order created" });
  } catch (err) {
    res.json(err);
  }
});

router.get("/order", authRequerid, async (req, res) => {
  const order = await orderSchema
    .find({
      user: req.user.id,
    })
    .populate("user");
  res.json(order);
});

router.get("/order/:id", authRequerid, async (req, res) => {
  const order = await orderSchema.findById(req.params.id).populate("user");
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

router.put("/order/:id", authRequerid, async (req, res) => {
  const order = await orderSchema.findById(req.params.id, req.body, {
    new: true,
  });

  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

router.delete("/order/:id", authRequerid, async (req, res) => {
  const order = await orderSchema.findByIdAndDelete(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.sendStatus(201);
});

module.exports = router;
