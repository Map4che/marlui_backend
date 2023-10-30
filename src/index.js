const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 4000;

//middleware
app.use(express.json({ extended: true }));
app.use(
  cors({
origin:"*",
    //origin: "http://localhost:5173",
    //origin: "https://c14-12-n-node-react.vercel.app",
    //origin: "https://c14-12-n-node-react-9s6iumb2d-marlui.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", orderRoutes);

//routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err.message));

app.listen(port, () => console.log(`Server running on port ${port}`));
