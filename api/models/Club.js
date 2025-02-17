const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      max: 100,
    },
    description: {
      type: String,
      required: true,
      max: 1000,
    },
    president: {
      type: String, // Name of the Club President
      required: true,
      max: 100,
    },contact: {
        email: {
          type: String,
          required: true,
          unique: true, // Ensure email is unique
          max: 100,
        },
        phone: {
          type: String,
          required: true,
          max: 15,
        },
      },
    members: {
      type: [String], // List of members in the club
      default: [],
    },
    establishedYear: {
      type: Number, // Year the club was established
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Club", ClubSchema);