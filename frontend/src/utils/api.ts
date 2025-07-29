// src/utils/api.ts

import axios from 'axios';

// ✅ Create a reusable axios instance
const api = axios.create({ baseURL: 'http://localhost:5000' });

// ✅ Dummy token setup (for future JWT implementation)
api.interceptors.request.use((config) => {
  config.headers = {
    ...config.headers,
    Authorization: 'Bearer dummy', // TODO: Replace with real token
  };
  return config;
});

// ✅ Create appointment
export const createAppointment = async (appointmentData: {
  name: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  location: string;
  email: string;
}) => {
  const response = await api.post('/api/appointments', appointmentData);
  return response.data;
};

// ✅ Get all appointments
export const getAppointments = async () => {
  const response = await api.get('/api/appointments');
  return response.data;
};

export default api;
