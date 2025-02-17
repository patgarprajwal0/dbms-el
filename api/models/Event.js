const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      max: 100,
    },
    description: {
      type: String,
      required: true,
      max: 1000,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
      max: 200,
    },
    attachments: {
      type: [String], // Array of file paths/URLs for event-related attachments
      default: [],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
