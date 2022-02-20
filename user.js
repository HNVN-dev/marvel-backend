const express = require("express");
const router = express.Router();
const Users = require("./Models/Users");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

// Route Signup

router.post("/user/signup", async (req, res) => {
  try {
    // Secure the password

    const password = req.fields.password;
    const salt = uid2(16);
    const hash = SHA256(password + salt).toString(encBase64);
    const token = uid2(16);

    // Checking if the mail exist

    const isEmailExist = await Users.findOne({ email: req.fields.email });

    const newUser = new Users({
      email: req.fields.email,
      token: token,
      hash: hash,
      salt: salt,
    });

    if (isEmailExist !== null) {
      res.json({ message: "Email already taken" });
    } else {
      await newUser.save();

      res.json({
        email: newUser.email,
        token: newUser.token,
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

// Route login

router.post("/user/login", async (req, res) => {
  try {
    const loggedUser = await Users.findOne({
      email: req.fields.email,
    });

    if (loggedUser === null) {
      res.status(401).json({ message: "Unauthorized !" });
    } else {
      const reconnect = req.fields.password;
      const testHash = SHA256(reconnect + loggedUser.salt).toString(encBase64);
      if (testHash === loggedUser.hash) {
        res
          .status(200)
          .json({ email: loggedUser.email, token: loggedUser.token });
      } else if (testHash !== loggedUser.hash) {
        res.status(401).json({ message: "Wrong password." });
      }
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
