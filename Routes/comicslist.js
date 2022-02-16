const axios = require("axios");
const express = require("express");
const router = express.Router();

const apikey = process.env.APIKEY;

router.get("/comics", async (req, res) => {
  try {
    const getComics = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apikey}`
        );
        console.log(response.data);
        res.status(200).json(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };
    getComics();
  } catch (error) {
    console.log(error.response);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
