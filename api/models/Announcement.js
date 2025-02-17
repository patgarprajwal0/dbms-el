const mongoose = require("mongoose");

const AnnouncementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 100,
    },
    description: {
      type: String,
      required: true,
      max: 1000,
    },
    year: {
      type: String,
      required: false,
      max: 50,
    },
    attachments: {
      type: [String], // Array of file paths/URLs for attachments
      default: [],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", AnnouncementSchema);
