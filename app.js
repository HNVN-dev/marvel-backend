const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(formidable());

mongoose.connect(process.env.MONGODB_URI);

const comicsList = require("./Routes/comicslist");
app.use(comicsList);

const specificCharacter = require("./Routes/characters/specificcharacter");
app.use(specificCharacter);

const listComicsCharacter = require("./Routes/characters/listcomicscharacter");
app.use(listComicsCharacter);

const charactersList = require("./Routes/characters/characterslist");
app.use(charactersList);

app.all("*", (req, res) => {
  res.json({ message: "Shu lo lo lo lo" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
