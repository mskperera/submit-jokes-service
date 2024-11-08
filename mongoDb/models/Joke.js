const mongoose = require("mongoose");

const JokeSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    typeId: { type: Number, required: true },
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Joke = mongoose.model("Joke", JokeSchema);

module.exports = Joke;
