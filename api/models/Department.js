const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
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
    head: {
      type: String, // Name of the Head of Department (HoD)
      required: true,
      max: 100,
    },
    contact: {
      email: {
        type: String,
        required: true,
        max: 100,
      },
      phone: {
        type: String,
        required: true,
        max: 15,
      },
    },
    courses: {
      type: [String], // List of courses offered by the department
      default: [],
    },
    facultyCount: {
      type: Number, // Number of faculty members in the department
      required: false,
    },
    establishedYear: {
      type: Number, // Year the department was established
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Department", DepartmentSchema);
