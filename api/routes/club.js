const express = require("express");
const router = express.Router();
const Club = require("../models/Club"); // Import the Club model

// POST: Add a new club
router.post("/add", async (req, res) => {
  try {
    const { name, description, president, contact, members, establishedYear } = req.body;

    // Check if the club already exists
    const existingClub = await Club.findOne({ name });
    if (existingClub) {
      return res.status(400).json({ message: "Club with this name already exists!" });
    }

    // Create a new club
    const newClub = new Club({
      name,
      description,
      president,
      contact,
      members,
      establishedYear,
    });

    // Save the club to the database
    const savedClub = await newClub.save();
    res.status(201).json(savedClub);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while adding the club." });
  }
});

// GET: Fetch all clubs
router.get("/", async (req, res) => {
  try {
    const clubs = await Club.find();
    res.status(200).json(clubs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the clubs." });
  }
});

module.exports = router;