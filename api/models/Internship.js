const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema(
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
    company: {
      type: String,
      required: true,
      max: 100,
    },
    duration: {
      type: String,
      required: true,
      max: 50,
    },
    location: {
      type: String,
      required: false,
      max: 100,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internship", InternshipSchema);
