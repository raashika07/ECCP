import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createAppointment } from '../utils/api';

interface Appointment {
  name: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  location: string;
  email: string;
}

const doctorSuggestions: Record<string, string[]> = {
  "Fever": ["Dr. Mehta", "Dr. Sharma"],
  "Heart Issue": ["Dr. Rao (Cardiologist)", "Dr. Verma"],
  "Skin Issue": ["Dr. Patel", "Dr. Desai"],
  "Headache": ["Dr. Singh", "Dr. Kapoor"],
  "Stomach Issue": ["Dr. Iyer", "Dr. Nair"],
  "Cold and Cough": ["Dr. Gupta", "Dr. Sharma"],
  "Allergy": ["Dr. Khan", "Dr. Joshi"],
  "Back Pain": ["Dr. Mehta", "Dr. Singh"],
  "Diabetes": ["Dr. Gupta"],
  "General Checkup": ["Dr. Singh", "Dr. Kapoor"]
};

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "2:00 PM", "2:30 PM", "3:00 PM", "4:00 PM" , "4:30 PM", "5:00 PM",
];

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    doctor: '',
    date: '',
    time: '',
    reason: '',
    location: '',
    email: ''
  });

  const [name, setName] = useState('');
  const [doctorOptions, setDoctorOptions] = useState<string[]>([]);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [existingAppointments, setExistingAppointments] = useState<any[]>([]);
  const [availableSlots, setAvailableSlots] = useState<string[]>(timeSlots);

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      const { name } = JSON.parse(storedProfile);
      setName(name);
    }

    axios.get('http://localhost:5000/api/appointments')
      .then(res => setExistingAppointments(res.data as any[]))
      .catch(err => console.error("Error fetching appointments", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    if (name === 'reason') {
      const suggestedDoctors = doctorSuggestions[value] || [];
      setDoctorOptions(suggestedDoctors);
      setFormData(prev => ({ ...prev, doctor: '', time: '' }));
    }

    if (['date', 'doctor', 'reason'].includes(name)) {
      const selectedDate = name === 'date' ? value : formData.date;
      const selectedDoctor = name === 'doctor' ? value : formData.doctor;

      const filtered = timeSlots.filter(slot =>
        !existingAppointments.some(app =>
          app.date === selectedDate &&
          app.time === slot &&
          app.doctor === selectedDoctor
        )
      );

      setAvailableSlots(filtered);
      setShowTimeSlots(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert("Please select a valid date.");
      return;
    }

    if (!name) {
      alert("User name not found. Please complete your profile.");
      return;
    }

    try {
      const res = await axios.get('http://localhost:5000/api/appointments');
      const latestAppointments = res.data as Appointment[];

      const isBooked = latestAppointments.some(app =>
        app.date === formData.date &&
        app.time === formData.time &&
        app.doctor === formData.doctor
      );

      if (isBooked) {
        alert("❌ This slot is already booked for this doctor. Please select another time.");
        return;
      }

      await createAppointment({ ...formData, name });
      alert(`${name}, your appointment is booked for ${formData.date} at ${formData.time}`);

      setFormData({ doctor: '', date: '', time: '', reason: '', location: '', email: '' });
      setDoctorOptions([]);
      setShowTimeSlots(false);

      setExistingAppointments(latestAppointments.concat({
        ...formData,
        name
      }));
    } catch (err: any) {
      console.error("Error creating appointment:", err);
      if (err.response && err.response.data) {
        alert(`❌ ${err.response.data.message || "Failed to book appointment. Please try again."}`);
      } else {
        alert("❌ Failed to book appointment. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Book Your Appointment</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md bg-gray-100 p-6 rounded shadow">
        <select name="reason" value={formData.reason} onChange={handleChange} required className="border p-2 w-full rounded">
          <option value="">Select Reason</option>
          {Object.keys(doctorSuggestions).map((reason) => (
            <option key={reason} value={reason}>{reason}</option>
          ))}
        </select>

        {doctorOptions.length > 0 && (
          <select name="doctor" value={formData.doctor} onChange={handleChange} required className="border p-2 w-full rounded">
            <option value="">Select Doctor</option>
            {doctorOptions.map((doc) => (
              <option key={doc} value={doc}>{doc}</option>
            ))}
          </select>
        )}

        <input name="date" type="date" value={formData.date} onChange={handleChange} required className="border p-2 w-full rounded" />

        {showTimeSlots && (
          <select name="time" value={formData.time} onChange={handleChange} required className="border p-2 w-full rounded">
            <option value="">Select Time Slot</option>
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        )}

        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="border p-2 w-full rounded"
        >
          <option value="">Select Location</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
        </select>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="border p-2 w-full rounded"
        />

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full">
          Confirm Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
