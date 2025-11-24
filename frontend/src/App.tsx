// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppointmentForm from './pages/Appointment';
import Profile from './pages/Profile';
import Home from './pages/Home'; // ✅ import this
import ViewAppointments from './pages/ViewAppointments'; // ✅ import this
import FileUpload from './pages/FileUpload'; // ✅ import this
import ViewFiles from './pages/ViewFiles'; // ✅ import this
import { Toaster } from 'react-hot-toast';




export default function App() {
  return (
    <BrowserRouter>
    {/* ✅ Add this to show the Toaster notifications */}
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} /> {/* 👈 Now default is Home */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/appointment" element={<AppointmentForm />} />\
        <Route path="/view-appointments" element={<ViewAppointments />} />
        <Route path= "/upload" element={<FileUpload />} />
        <Route path="/view-files" element={<ViewFiles />} />


  
      </Routes>
    </BrowserRouter>
  );
}