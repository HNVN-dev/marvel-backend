const express = require("express");
const router = express.Router();
const axios = require("../config/api-axios");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/user/favorites", isAuthenticated, async (req, res) => {
  try {
    res.status(200).json({
      favorites: {
        favoritesCharacters: req.user.favorites.favoriteCharacters,
        favoritesomics: req.user.favorites.favoriteComics,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

const addFavCharacter = (user, character) => {
  if (user.favorites === undefined) {
    user.favorites = {
      favoriteCharacters: [],
      favoriteComics: [],
    };
  }

  let exist = user.favorites.favoriteCharacters.find((element) => {
    return element._id === character._id;
  });

  if (!exist) {
    user.favorites.favoriteCharacters.push(character);
  }
};

const addFavComic = (user, comic) => {
  if (user.favorites === undefined) {
    user.favorites = {
      favoriteCharacters: [],
      favoriteComics: [],
    };
  }

  let exist = user.favorites.favoriteComics.find((element) => {
    return element._id === comic._id;
  });

  if (!exist) {
    user.favorites.favoriteComics.push(comic);
  }
};

router.post("/user/favorites", isAuthenticated, async (req, res) => {
  try {
    const favId = req.fields.id;

    const favType = req.fields.type;

    const user = await User.findById(req.user.id);

    if (favType === "character") {
      const response = await axios.get(
        `/character/${favId}?apiKey=${process.env.APIKEY}`
      );
      addFavCharacter(user, response.data);
    } else if (favType === "comic") {
      const response = await axios.get(
        `/comic/${favId}?apiKey=${process.env.API_APIKEY}`
      );
      addFavComic(user, response.data);
    }

    await user.save();

    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
