const mongoose = require("mongoose");

const TheatreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  shows: [
    {
      startTiming: {
        type: Date,
        required: true,
      },
      endTiming: {
        type: Date,
        required: true,
      },
      startDate: {
        type: Date,
        required: false,
      },
      endDate: {
        type: Date,
        required: false,
      },
      positions: [
        {
          type: {
            type: String,
            required: true,
          },
          seats: {
            type: Number,
            required: true,
          },
        },
      ],
      price: {
        type: Number,
        required: true,
      },
      eventId: {
        type: mongoose.Types.ObjectId,
        ref: "movie",
      },
    },
  ],
});

module.exports = Theatre = mongoose.model("theatre", TheatreSchema);
