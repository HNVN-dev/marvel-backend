const mongoose = require("mongoose");

const Users = mongoose.model("Users", {
  email: {
    unique: true,
    type: String,
  },
  favorites: Array,
  token: String,
  hash: String,
  salt: String,
});

module.exports = Users;
