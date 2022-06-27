const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    unique: true,
  },
  feedback: {
    type: Number,
  },
});

module.exports = Movie = mongoose.model("movie", MovieSchema);
