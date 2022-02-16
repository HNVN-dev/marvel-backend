const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

app.all("*", (req, res) => {
  res.json({ message: "Shu lo lo lo lo" });
});

app.listen(process.env.PORT || 3200, () => {
  console.log("Server started");
});
