const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

//Create users
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then(() => {
      res.json({ message: `User created succesfully` });
    })
    .catch((err) => res.json({ message: err.message }));
});

// Get all users
router.get("/users", (req, res) => {
  userSchema
  .find()
  .then((data) => res.json(data))
  .catch((error) => res.json({ message: error }));
});

// Get a User
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
  .findById(id)
  .then((data) => res.json(data))
  .catch((error) => res.json({ message: error }));
});

// update a User
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  userSchema
  .updateOne({ _id: id }, { $set: {name, email, password, image} })
  .then((data) => res.json(data))
  .catch((error) => res.json({ message: error }));
});

// Delete a User
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
  .findByIdAndRemove(id)
  .then((data) => res.json(data))
  .catch((error) => res.json({ message: error }));
});

module.exports = router;