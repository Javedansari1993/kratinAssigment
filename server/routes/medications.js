// medications.js (routes)
const express = require('express');
const router = express.Router();
const Medication = require('../models/Medication');

// POST route for creating a medication profile
router.post('/medications', async (req, res) => {
  try {
    const { medicationName, dosage, frequency, specialInstructions, patientId } = req.body;
    // Create a new medication profile in the database
    const medication = await Medication.create({
      patientId,
      medicationName,
      dosage,
      frequency,
      specialInstructions,
    });
    res.status(201).json(medication);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create medication profile' });
  }
});

router.get('/medications/:patientId', async (req, res) => {
    try {
      const { patientId } = req.params;
      // Find all medication profiles for the specified patient
      const medications = await Medication.find({ patientId });
      res.status(200).json(medications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch medication details' });
    }
  });


// PUT route for updating a medication profile
router.put('/medications/:patientId', async (req, res) => {
  try {
    const { patientId } = req.params;
    const { medicationName, dosage, frequency, specialInstructions } = req.body;
    // Find the medication profile by patientId and update its details
    const medication = await Medication.findOneAndUpdate(
      { patientId },
      { medicationName, dosage, frequency, specialInstructions },
      { new: true }
    );
    if (!medication) {
      return res.status(404).json({ error: 'Medication profile not found' });
    }
    res.status(200).json(medication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update medication profile' });
  }
});


module.exports = router;
