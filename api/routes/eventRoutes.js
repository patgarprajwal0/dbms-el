const router = require("express").Router();
const Event = require("../models/Event");

// Create a new event
router.post("/", async (req, res) => {
  try {
    const newEvent = new Event({
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      attachments: req.body.attachments,
    });

    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update an event
router.put("/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete an event
router.delete("/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json("Event deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single event by its ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 }); // Sort by upcoming date
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
