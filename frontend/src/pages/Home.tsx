// src/pages/Home.tsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-6">
      
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-8">
        Elderly Care Coordination Platform
      </h1>

      {/* Search + Buttons in One Line */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl mx-auto mb-12 w-full">
        
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search services or information..."
          className="border border-gray-300 rounded px-4 py-2 shadow-sm w-full md:w-1/2"
        />

        {/* Buttons aligned to the right on medium+ screens */}
        <div className="flex gap-4">
          <Link
            to="/profile"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow"
          >
            View Profile
          </Link>
          </div>
          <div className="flex gap-4">
          <Link
            to="/appointment"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded shadow"
          >
            Book Appointment
          </Link>
          </div>
          <div className="flex gap-4">
          <Link
            to="/view-appointments"
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded shadow"
            >
            View Appointments
          </Link>
          </div>
          <div className="flex gap-4">
          <Link
            to="/upload"
            className="bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded shadow" 
          >
            Upload Your Medical Files
          </Link>
        </div>
        <div className="flex gap-4">
          <Link
            to="/view-files"
            className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded shadow"
          >
            View Your Medical Files
          </Link>
          </div>
      </div>
    </div>
  );
}