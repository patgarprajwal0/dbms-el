const router = require("express").Router();
const Internship = require("../models/Internship");

// Create a new internship
router.post("/", async (req, res) => {
  try {
    const newInternship = new Internship({
      title: req.body.title,
      description: req.body.description,
      company: req.body.company,
      duration: req.body.duration,
      location: req.body.location,
    });

    const savedInternship = await newInternship.save();
    res.status(200).json(savedInternship);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update an existing internship
router.put("/:id", async (req, res) => {
  try {
    const updatedInternship = await Internship.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedInternship);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete an internship
router.delete("/:id", async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);
    res.status(200).json("Internship deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single internship by its ID
router.get("/:id", async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    res.status(200).json(internship);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all internships
router.get("/", async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });
    res.status(200).json(internships);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
