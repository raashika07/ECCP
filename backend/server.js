const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');
const sendEmail = require('./utils/emailService'); 
const dayjs = require('dayjs');
const profileRoutes = require('./routes/profileRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const emailRoutes = require('./routes/emailRoutes');
const app = express();
const appointments = require('./data/appointmentsMemory');

dotenv.config();

app.use(cors());
app.use(express.json());

// ✅ Serve uploaded files
app.use('/uploads', express.static('uploads'));
// ... All previous imports and middleware above

app.use('/profile', profileRoutes);
app.use('/api', appointmentRoutes);
app.use('/api', uploadRoutes);
app.use('/api', emailRoutes);

app.get('/', (_, res) => res.send('Elderly-Care backend running 🚀'));

// 🕑 CRON job for email reminders
cron.schedule('* * * * *', () => {
  const now = dayjs();
  const currentDate = now.format('YYYY-MM-DD');

  appointments.forEach(async (appt) => {
    const appointmentDateTime = dayjs(`${appt.date} ${appt.time}`, 'YYYY-MM-DD hh:mm A');
    const diffInMinutes = appointmentDateTime.diff(now, 'minute');

    // Reminder 1 day (1440 mins) before
    if (
      diffInMinutes <= 1440 && 
      diffInMinutes > 1430 && 
      !appt.reminderSentDayBefore
    ) {
      const subject = `📅 Reminder: Appointment Tomorrow`;
      const message = `Hi ${appt.name},\n\nJust a reminder that your appointment with  ${appt.doctor} is scheduled for tomorrow (${appt.date} at ${appt.time}).\n\nPlease make sure to bring your Old Medical Reports\n\n- ECCP Team`;
      const success = await sendEmail(appt.email, subject, message);
      if (success) appt.reminderSentDayBefore = true;
    }

    // Reminder 1 hour (60 mins) before
    if (
      diffInMinutes <= 60 &&
      diffInMinutes > 50 &&
      !appt.reminderSentHourBefore
    ) {
      const subject = `⏰ Reminder: Appointment in 1 Hour`;
      const message = `Hi ${appt.name},\n\nYou have an appointment with  ${appt.doctor} at ${appt.time} today.\n\nPlease make sure to bring your Old Medical Reports\n\n- ECCP Team`;
      const success = await sendEmail(appt.email, subject, message);
      if (success) appt.reminderSentHourBefore = true;
    }
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
