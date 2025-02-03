const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cityRef: [{ type: mongoose.Schema.Types.ObjectId, ref: "City", default: [] }], // Corrected ref to "City"
  serviceRef: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Service", default: [] }, // Corrected ref to "Service"
  ],
});

const Category = mongoose.model("Category", categorySchema); // Capitalized model name
module.exports = Category;
