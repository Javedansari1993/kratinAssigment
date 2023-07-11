// Reminder.js (models)
const mongoose = require('mongoose');
const reminderSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  days: { type: String, required: true },
  times: { type: String, required: true },
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
