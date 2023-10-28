const express = require("express");
const userSchema = require("../models/user");
const bcrypt = require("bcryptjs");
const createAccessToken = require("../libs/jwt");
const authRequerid = require("../middlewares/validateTokenAdmin");
const jwt = require("jsonwebtoken");
//const {TOKEN_SECTRE} =require("../../.env")

const router = express.Router();

//Create users
router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const userExist = await userSchema.findOne({ email });
    if (userExist) return res.status(400).json(["Email already exist"]);
    if (password.length < 4)
      return res.status(400).json(["Password should have unless 4 characters"]);
    if (password != confirmPassword)
      return res.status(400).json(["Password doesn't match"]);
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new userSchema({
      name,
      email,
      password: passwordHash,
    });

    user.save();

    const token = await createAccessToken({ id: user._id });
    res.cookie("token", token);
    res.json({
      name,
      email,
      admin: user.admin,
    });
  } catch (err) {
    res.send([err]);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await userSchema.findOne({ email });
    if (!userFound) return res.status(400).json(["User not found"]);

    const match = await bcrypt.compare(password, userFound.password);

    if (!match) return res.status(400).json(["Wrong password"]);

    if (userFound.admin) {
      const token = await createAccessToken({
        id: userFound._id,
        scope: "admin",
      });
      res.cookie("token", token),
        res.json({
          id: userFound._id,
          name: userFound.name,
          email: userFound.email,
          admin: userFound.admin,
        });
    } else {
      const token = await createAccessToken({
        id: userFound._id,
        scope: "user",
      });
      res.cookie("token", token),
        res.json({
          id: userFound._id,
          name: userFound.name,
          email: userFound.email,
        });
    }
  } catch (err) {
    res.json([err]);
  }
});

router.post("/logout", (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  return res.sendStatus(200);
});

router.get("/verify", async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json(["Not authorized"]);

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json(["Not authorized"]);

    const userFound = await userSchema.findById(user.id);

    if (!userFound) return res.status(401).json(["Not authorized"]);

    return res.json({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      admin: userFound.admin,
    });
  });
});

router.get("/profile", authRequerid, async (req, res) => {
  const userFound = await userSchema.findById(req.user.id);

  if (!userFound) return res.status(401).json(["User not found"]);

  res.json({
    id: userFound._id,
    name: userFound.name,
    email: userFound.email,
    admin: userFound.admin,
  });
});

// Get all users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json([error]));
});

// Get a User
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json([error]));
});

// update a User
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, email, password, image } })
    .then((data) => res.json(data))
    .catch((error) => res.json([error]));
});

// Delete a User
router.delete("/users/:id", authRequerid, (req, res) => {
  if (req.admin) {
    const { id } = req.params;
    userSchema
      .findByIdAndRemove(id)
      .then((data) => res.json(data))
      .catch((error) => res.json([error]));
  } else {
    res.status(401).json(["User not authorizated"]);
  }
});

module.exports = router;
