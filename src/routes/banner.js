const express = require("express");
const schemaBanner = require("../models/banner");
const authRequerid = require("../middlewares/validateTokenAdmin");

const router = express.Router();

router.get("/banner", (req, res) => {
  schemaBanner
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => res.status(400).json([err]));
});

module.exports = router;
