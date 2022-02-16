const axios = require("axios");
const express = require("express");
const router = express.Router();

const apikey = process.env.APIKEY;

router.get("/character/:characterId", async (req, res) => {
  const params = req.params.characterId;
  try {
    const getSpecificCharacter = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-marvel-api.herokuapp.com/character/${params}?apiKey=${apikey}`
        );
        console.log(response.data);
        res.status(200).json(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    getSpecificCharacter();
  } catch (error) {
    console.log(error.response);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
