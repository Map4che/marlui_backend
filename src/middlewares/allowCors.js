const allowCors = require("./allow-cors");

const handler = (req, res) => {
  const d = new Date();
  res.end(d.toString());
};

module.exports = allowCors(handler);
