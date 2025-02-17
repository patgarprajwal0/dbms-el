const express = require("express");
const router = express.Router();
const Department = require("../models/Department"); // Import the Department model

// POST: Add a new department
router.post("/add", async (req, res) => {
  try {
    // Extract data from the request body
    const { name, description, head, contact, courses, facultyCount, establishedYear } = req.body;

    // Check if the department already exists
    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
      return res.status(400).json({ message: "Department with this name already exists!" });
    }

    // Create a new department
    const newDepartment = new Department({
      name,
      description,
      head,
      contact,
      courses,
      facultyCount,
      establishedYear,
    });

    // Save the department to the database
    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while adding the department." });
  }
});

// GET: Fetch all departments
router.get("/", async (req, res) => {
  try {
    // Fetch all departments from the database
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching the departments." });
  }
});

module.exports = router;
