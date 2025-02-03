const mongoose = require("mongoose");

const personSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Doctor", "Nurse", "Driver", "Security", "Pharmacist"],
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    categoryRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Corrected to reference Category model
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Person = mongoose.model("People", personSchema); // Capitalized model name
module.exports = Person;
