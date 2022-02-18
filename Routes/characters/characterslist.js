const axios = require("axios");
const express = require("express");
const router = express.Router();

const apikey = process.env.APIKEY;

router.get("/characters", async (req, res) => {
  try {
    // Search by name
    const name = req.query.name ? String(req.query.name) : "";

    // Can filter limit
    const limit = req.query.limit ? Number(req.query.limit) : 100;

    // Can change page
    const page = req.query.page ? Number(req.query.page) : 1;

    // Page 1 by default
    const skip = limit * (page - 1);

    if (Number(req.query.page) === 0) {
      res.status(400).json({ message: "Page start at 1" });
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${apikey}&name=${name}&limit=${limit}&skip=${skip}&page=${page}`
    );
    console.log(req.query.limit);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.response);
    res.status(400).json({ error: "Bad request" });
  }
});

module.exports = router;
