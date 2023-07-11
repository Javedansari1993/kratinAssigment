const express = require('express');
const router = express.Router();
const Reminder = require('../models/Reminder');
const Medication = require('../models/Medication');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// POST route for saving reminder schedules
router.post('/reminders', async (req, res) => {
  try {
    const { days, times, patientId } = req.body;

    // Find the user by patientId
    const user = await User.findById(patientId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get the medication details for the user
    const medications = await Medication.find({ patientId });

    // Create a new reminder schedule
    const reminder = new Reminder({
      days,
      times,
      patientId,
    });

    // Save the reminder schedule to the database
    await reminder.save();

    // Send email reminder
    sendEmailReminder(user, medications);

    res.status(200).json({ message: 'Reminder schedule saved and email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save reminder schedule and send email' });
  }
});

// Function to send email reminder
async function sendEmailReminder(user, medications) {
  // Create a transporter for sending emails
  const transporter = nodemailer.createTransport({
    // Configure the email transport options (e.g., SMTP, Gmail)
    // See the nodemailer documentation for more details
    service: 'gmail',
      auth: {
        user: 'merndeveloper07@gmail.com',
        pass: 'qsdpiozelrwffizr'
      }
  });

  // Compose the email message
  const message = {
    from: 'merndeveloper07@gmail.com', // Replace with your email address
    to: user.email, // User's email address
    subject: 'Medication Reminder',
    html: `
      <h2>Hello ${user.name},</h2>
      <p>This is a reminder for your medication:</p>
      <ul>
        ${medications
          .map(
            (medication) => `
            <li>
              Medication: ${medication.medicationName}<br>
              Dosage: ${medication.dosage}<br>
              Frequency: ${medication.frequency}<br>
              Special Instructions: ${medication.specialInstructions || 'None'}
            </li>
          `
          )
          .join('')}
      </ul>
      <p>Please follow the prescribed medication schedule.</p>
      <p>Thank you.</p>
    `,
  };

  // Send the email
  await transporter.sendMail(message);
}

module.exports = router;
