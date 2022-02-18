const axios = require("axios");
const express = require("express");
const router = express.Router();

const apikey = process.env.APIKEY;

router.get("/comics", async (req, res) => {
  try {
    // Search by title
    const title = req.query.title ? String(req.query.title) : "";

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
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${apikey}&title=${title}&page=${page}&limit=${limit}&skip=${skip}`
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error.response);
  }
});

module.exports = router;
