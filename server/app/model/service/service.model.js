const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  description: { type: String, required: true },
  serviceRef: { type: mongoose.Schema.Types.ObjectId, unique: true }, // Clarify purpose of this field
});

const Service = mongoose.model("Service", serviceSchema); // Capitalized model name
module.exports = Service;
