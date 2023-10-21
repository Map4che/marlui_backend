const express = require("express");
const categorySchema = require("../models/category");

const router = express.Router();

//Create Category
router.post("/category", (req, res) => {
  const category = categorySchema(req.body);
  category
    .save()
    .then(() => {
      res.json({ message: "Category created succesfully" });
    })
    .catch((err) => res.json({ message: "An error has happened" }));
});

//Get all categories
router.get("/category", (req, res) => {
    categorySchema
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err.message }));
});

//Get one category
router.get("/category/:id", (req, res) => {
  const { id } = req.params;
  categorySchema
    .findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.json({ message: err.message }));
});

//Update a category
router.put("/category/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  categorySchema
    .updateOne({ _id: id }, { $set: { name, description } })
    .then((data) => {
      res.json({ message: "Category updated" });
    })
    .catch((err) => res.json({ message: err.message }));
});

//Remove category
router.delete("/category/:id", (req, res) => {
  const { id } = req.params;
  categorySchema
    .findByIdAndRemove(id)
    .then((data) => {
      res.json({ message: "Category removed" });
    })
    .catch((err) => res.json({ message: err.message }));
});

module.exports = router;