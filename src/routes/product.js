const express = require("express");
const productSchema = require("../models/product");
const authRequerid = require("../middlewares/validateTokenAdmin");

const router = express.Router();

//Create producto
router.post("/product", authRequerid, (req, res) => {
  if (req.admin) {
    const product = productSchema(req.body);
    product
      .save()
      .then(() => {
        res.json({ message: "Product created succesfully" });
      })
      .catch((err) => res.json({ message: "An error has happened" }));
  } else {
    res.status(401).json({ message: "User not authorizated" });
  }
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

//Get sales
router.get("/sales", (req, res) => {
  productSchema
    .find({ sales: true })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json(["Error in this counsult"]);
    });
});

//Get category
router.post("/category", (req, res) => {
  const category = req.body.category;
  productSchema
    .find({ category })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json(["Error in this consult"]);
    });
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
router.put("/product/:id", authRequerid, (req, res) => {
  if (req.admin) {
    const { id } = req.params;
    const { name, price, quantity } = req.body;
    productSchema
      .updateOne({ _id: id }, { $set: { name, price, quantity } })
      .then((data) => {
        res.json({ message: "Product updated" });
      })
      .catch((err) => res.json({ message: err.message }));
  } else {
    res.status(401).json({ message: "User not authorizated" });
  }
});

//Remove product
router.delete("/product/:id", authRequerid, (req, res) => {
  if (req.admin) {
    const { id } = req.params;
    productSchema
      .findByIdAndRemove(id)
      .then((data) => {
        res.json({ message: "Product removed" });
      })
      .catch((err) => res.json({ message: err.message }));
  } else {
    res.status(401).json({ message: "User not authorizated" });
  }
});
module.exports = router;
