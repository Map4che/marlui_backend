const express = require("express");
const categorySchema = require("../models/category");
const authRequerid = require("../middlewares/validateTokenAdmin");

const router = express.Router();

//Create Category
router.post("/category", authRequerid, (req, res) => {
  if (req.admin) {
    const category = categorySchema(req.body);
    category
      .save()
      .then(() => {
        res.json({ message: "Category created succesfully" });
      })
      .catch((err) => res.json({ message: "An error has happened" }));
  } else {
    return res.status(401).json("User not authorizated");
  }
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
router.put("/category/:id", authRequerid, (req, res) => {
  if (req.admin) {
    const { id } = req.params;
    const { name, description } = req.body;
    categorySchema
      .updateOne({ _id: id }, { $set: { name, description } })
      .then((data) => {
        res.json({ message: "Category updated" });
      })
      .catch((err) => res.json({ message: err.message }));
  } else {
    return res.status(401).json("User not authorizated");
  }
});

//Remove category
router.delete("/category/:id", authRequerid, (req, res) => {
  if (req.admin) {
    const { id } = req.params;
    categorySchema
      .findByIdAndRemove(id)
      .then((data) => {
        res.json({ message: "Category removed" });
      })
      .catch((err) => res.json({ message: err.message }));
  } else {
    return res.status(401).json("User not authorizated");
  }
});

module.exports = router;
