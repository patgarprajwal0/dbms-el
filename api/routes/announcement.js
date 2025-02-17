const router = require("express").Router();
const Announcement = require("../models/announcement");
const User = require("../models/User");

// Create a new announcement
router.post("/", async (req, res) => {
  try {
    const newAnnouncement = new Announcement({
      title: req.body.title,
      description: req.body.description,
      year: req.body.year,
      attachments: req.body.attachments, // array of file URLs
    });

    const savedAnnouncement = await newAnnouncement.save();
    res.status(200).json(savedAnnouncement);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update an existing announcement
router.put("/:id", async (req, res) => {
  try {
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedAnnouncement);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete an announcement
router.delete("/:id", async (req, res) => {
  try {
    await Announcement.findByIdAndDelete(req.params.id);
    res.status(200).json("Announcement deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single announcement by its ID
router.get("/:id", async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    res.status(200).json(announcement);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json(announcements);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
