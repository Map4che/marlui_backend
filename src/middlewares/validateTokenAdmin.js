const jwt = require("jsonwebtoken");

const authRequerid = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json(["Not authorized"]);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json(["Invalid Token"]);

    //console.log(decoded);
    if (decoded.scope === "admin") {
      req.admin = true;
    } else {
      req.admin = false;
    }
    console.log(req.admin);
    req.user = decoded;
    next();
  });
};
/*
const adminRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (req.cookies.scope === "admin") {
    req.admin = true;
  } else {
    req.admin = false;
  }
  console.log(req.admin);
  next();
};
*/
module.exports = authRequerid;
