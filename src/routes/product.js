const express = require("express");
const productSchema = require("../models/product");

const router = express.Router();

//Create producto
router.post("/product", (req, res) => {
  const product = productSchema(req.body);
  product
    .save()
    .then(() => {
      res.json({ message: "Product created succesfully" });
    })
    .catch((err) => res.json({ message: "An error has happened" }));
});

//Get all products
router.get("/product", (req, res) => {
  productSchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err.message }));
});

//Get one product
router.get("/product/:id", (req, res) => {
  const { id } = req.params;
  productSchema
    .findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err.message }));
});

//Update a product
router.put("/product/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, quantity } = req.body;
  productSchema
    .updateOne({ _id: id }, { $set: { name, price, quantity } })
    .then((data) => {
      res.json({ message: "Product updated" });
    })
    .catch((err) => res.json({ message: err.message }));
});

//Remove product
router.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  productSchema
    .findByIdAndRemove(id)
    .then((data) => {
      res.json({ message: "Product removed" });
    })
    .catch((err) => res.json({ message: err.message }));
});
module.exports = router;
