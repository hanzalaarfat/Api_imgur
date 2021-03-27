const mongoose = require("mongoose");

const img = mongoose.Schema({
  user_id: {
    type: String,
  },
  img_url: { type: String, required: true },
  des: {
    type: String,
  },
  comment: [
    {
      type: String,
      trim: true,
    },
  ],
  like: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("image", img);
