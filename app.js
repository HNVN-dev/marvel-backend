const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const app = express();
app.use(formidable());

app.all("*", (req, res) => {
  res.json({ message: "Shu lo lo lo lo" });
});

// api key L2bUh2Wdgv0GF7mV

app.listen(3000, (req, res) => {
  console.log("Server Started !!!");
});
