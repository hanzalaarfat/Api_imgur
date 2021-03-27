const mongoose = require("mongoose");

const register = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
  },
  password: {
    type: String,
    min: 0,
    max: 150,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("User", register);
