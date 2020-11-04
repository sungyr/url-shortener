const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const UrlShortSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: () => nanoid(),
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("UrlShort", UrlShortSchema);
