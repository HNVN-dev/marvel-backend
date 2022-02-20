const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(formidable());

const http = require("http");
const httpServer = http.createServer();

httpServer.on("request", (request, response) => {
  // On spécifie l'entête pour le CORS
  response.setHeader("Access-Control-Allow-Origin", "*");

  // On gère le cas où le navigateur fait un pré-contrôle avec OPTIONS ...
  // ... pas besoin d'aller plus loin dans le traitement, on renvoie la réponse
  if (request.method === "OPTIONS") {
    // On liste des méthodes et les entêtes valides
    response.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Accept, Origin, Authorization"
    );
    response.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );

    return response.end();
  }

  // suite du traitement ...
});

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

app.listen(process.env.PORT, () => {
  console.log("Server started");
});

httpServer.listen(process.env.PORT);
