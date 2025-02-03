const mongoose = require("mongoose");

// Define the Facility schema
const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDesc: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true }, // Changed from Number to String to allow flexibility
  address: { type: String },
  bed_count: { type: Number, required: true },
  rating: { type: Number, default: 0 },

  // References to other collections
  personRef: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "People", // Ensure the model for People is correctly registered
      required: true,
    },
  ],
  serviceRef: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service", // Ensure the model for Service is correctly registered
      required: true,
    },
  ],
  cityRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City", // Ensure the model for City is correctly registered
    required: true,
  },
  categoryRef: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Ensure the model for Category is correctly registered
      required: true,
    },
  ],
});

// Register the model
const Facility = mongoose.model("Facility", facilitySchema);

module.exports = Facility;
