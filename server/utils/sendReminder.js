// sendReminder.js (utils)
const nodemailer = require('nodemailer');

const sendReminder = (days, time) => {
  // Implement the logic to send reminders via email
  // Example: Use Nodemailer to send reminders

  // Create a transporter with your email service provider's SMTP configuration
  const transporter = nodemailer.createTransport({
    service: 'YourEmailServiceProvider',
    auth: {
      user: 'your-email@example.com',
      pass: 'your-email-password',
    },
  });

  // Compose the email message
  const mailOptions = {
    from: 'your-email@example.com',
    to: 'recipient@example.com',
    subject: 'Medication Reminder',
    text: `Don't forget to take your medication (${medicationName}) at ${time}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending reminder:', error);
    } else {
      console.log('Reminder sent:', info.response);
    }
  });
};

module.exports = sendReminder;
