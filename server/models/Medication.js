// Medication.js (models)
const mongoose = require('mongoose');
const medicationSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  medicationName: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  specialInstructions: { type: String },
});

const Medication = mongoose.model('Medication', medicationSchema);

module.exports = Medication;
