const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();

app.use(formidable());

mongoose.connect(process.env.MONGODB_URI);

const user = require("./user");
app.use(user);

const userFavorites = require("./Routes/userFavorites");
app.use(userFavorites);

const comicsList = require("./Routes/comicslist");
app.use(comicsList);

const specificCharacter = require("./Routes/characters/specificcharacter");
app.use(specificCharacter);

const listComicsCharacter = require("./Routes/characters/listcomicscharacter");
app.use(listComicsCharacter);

const charactersList = require("./Routes/characters/characterslist");
app.use(charactersList);

app.all("*", (req, res) => {
  res.json({ message: "Nothing here" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
