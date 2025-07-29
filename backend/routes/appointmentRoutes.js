const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/emailService'); // Email utility

// 🔒 In-memory appointment storage
let appointments = require('../data/appointmentsMemory');
// Create appointment
router.post('/appointments', async (req, res) => {
  const { name, doctor, date, time, reason, location, email } = req.body;

  if (!name || !doctor || !date || !time || !reason || !location || !email) {
    return res.status(400).json({ message: 'All fields are required' });
  }

const conflict = appointments.find(app =>
        app.date === date && app.time === time && app.doctor === doctor
      );
      if (conflict) {
                return res.status(409).json({ message: 'This appointment slot is already booked' });
    }      

  const newAppointment = {
    id: appointments.length + 1,
    name,
    doctor,
    date,
    time,
    reason,
    location,
    email,
    reminderSentDayBefore: false, // ✅ for cron job
    reminderSentHourBefore: false // ✅ for cron job
  };

  appointments.push(newAppointment);

  const subject = `Appointment Confirmation for ${name}`;
  const text = `Dear ${name},\n\nYour appointment with ${doctor} is confirmed for ${date} at ${time}.\n\nReason: ${reason}\nLocation: ${location}\n\nPlease make sure to bring your Old Medical Reports\n\nThank you,\nElderly Care Coordination Platform`;

  const success = await sendEmail(email, subject, text);
  if (!success) {
    console.warn("⚠️ Email failed to send.");
  }

  res.status(201).json(newAppointment);
});

// 📂 Fetch appointments
router.get('/appointments', (req, res) => {
  res.status(200).json(appointments);
});

// ❌ Cancel appointment
router.delete('/appointments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = appointments.findIndex((a) => a.id === id);

  if (index !== -1) {
    appointments.splice(index, 1);
    res.json({ message: 'Appointment cancelled successfully' });
  } else {
    res.status(404).json({ message: 'Appointment not found' });
  }
});

// 📝 Update notes
router.patch('/appointments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { notes } = req.body;

  const appointment = appointments.find((a) => a.id === id);

  if (appointment) {
    appointment.notes = notes;
    res.json({ message: 'Notes updated successfully' });
  } else {
    res.status(404).json({ message: 'Appointment not found' });
  }
});

module.exports = router;
