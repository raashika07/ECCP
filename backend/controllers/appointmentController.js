// backend/controllers/appointmentController.js

let appointments = [];

export const createAppointment = (req, res) => {
  const { name, doctor, date, time, reason, location, preparation } = req.body;

  if (!name || !doctor || !date || !time || !reason || !location || !preparation) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newAppointment = {
    id: appointments.length + 1,
    name,
    doctor,
    date,
    time,
    reason,
    location,
    preparation
  };

  appointments.push(newAppointment);
  res.status(201).json({ success: true, data: newAppointment });
};

export const getAppointments = (req, res) => {
  res.status(200).json({ success: true, data: appointments });
};