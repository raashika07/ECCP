import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import axios from "axios";

interface Appointment {
  id: number;
  name: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  notes?: string;
  location?: string;
  preparation?: string;
}

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "2:00 PM", "2:30 PM", "3:00 PM", "4:00 PM"
];

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

const ViewAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [editingNotes, setEditingNotes] = useState<Record<number, string>>({});
  const [filterReason, setFilterReason] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Partial<Appointment>>({});

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get<Appointment[]>("http://localhost:5000/api/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments", error);
    }
  };

  const formatDate = (date: Date) => {
    const istDate = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
    const year = istDate.getFullYear();
    const month = String(istDate.getMonth() + 1).padStart(2, '0');
    const day = String(istDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const parse12HourTime = (time: string) => {
    const [t, modifier] = time.split(" ");
    let [hours, minutes] = t.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return { hours, minutes };
  };

  const getISTDateTime = (date: string, time: string) => {
    const { hours, minutes } = parse12HourTime(time);
    const dt = new Date(`${date}T00:00:00`);
    dt.setHours(hours);
    dt.setMinutes(minutes);
    return new Date(dt.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  };

  const handleCancel = async (id: number) => {
    const confirm = window.confirm("Are you sure you want to cancel this appointment?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/appointments/${id}`);
      setAppointments(prev => prev.filter(a => a.id !== id));
      alert("Appointment canceled successfully.");
    } catch (err) {
      console.error("Error cancelling appointment", err);
      alert("Failed to cancel appointment.");
    }
  };

  const handleSaveNote = async (id: number) => {
    const note = editingNotes[id];
    const confirm = window.confirm("Save outcome note?");
    if (!confirm) return;

    try {
      await axios.patch(`http://localhost:5000/api/appointments/${id}`, { notes: note });
      setAppointments(prev => prev.map(a => a.id === id ? { ...a, notes: note } : a));
      setEditingNotes(prev => ({ ...prev, [id]: "" }));
      alert("Note saved successfully.");
    } catch (err) {
      console.error("Error saving note", err);
      alert("Failed to save note.");
    }
  };

  const handleEdit = (app: Appointment) => {
    setEditingId(app.id);
    setEditFormData({ ...app });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateAppointment = async () => {
    if (!editingId || !editFormData) return;
    try {
      await axios.patch(`http://localhost:5000/api/appointments/${editingId}`, editFormData);
      setAppointments(prev =>
        prev.map(app => (app.id === editingId ? { ...app, ...editFormData } : app))
      );
      setEditingId(null);
      setEditFormData({});
      alert("Appointment updated successfully.");
    } catch (err) {
      console.error("Error updating appointment", err);
      alert("Failed to update appointment.");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const allReasons = Array.from(new Set(appointments.map(a => a.reason)));

  const filteredAppointments = appointments
    .filter(a => a.date === formatDate(selectedDate))
    .filter(a => (filterReason ? a.reason === filterReason : true))
    .sort((a, b) => {
      const timeA = getISTDateTime(a.date, a.time);
      const timeB = getISTDateTime(b.date, b.time);
      return sortOrder === "asc" ? timeA.getTime() - timeB.getTime() : timeB.getTime() - timeA.getTime();
    });

  return (
    <div className="p-6 min-h-screen bg-gray-50 text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Appointments</h1>

      {/* Calendar */}
      <div className="flex flex-col items-center">
        <Calendar onChange={(value) => setSelectedDate(value as Date)} value={selectedDate} />
      </div>

      {/* Filter & Sort Controls */}
      <div className="flex justify-between items-center max-w-3xl mx-auto mt-6">
        <select
          value={filterReason}
          onChange={(e) => setFilterReason(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">All Reasons</option>
          {allReasons.map(reason => (
            <option key={reason} value={reason}>{reason}</option>
          ))}
        </select>

        <button
          onClick={() => setSortOrder(prev => prev === "asc" ? "desc" : "asc")}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sort Time: {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>

      {/* Appointment List */}
      <div className="mt-8 bg-white rounded shadow p-4 max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Appointments on {selectedDate.toDateString()}</h2>

        {filteredAppointments.length === 0 ? (
          <p>No appointments on this date.</p>
        ) : (
          <ul className="space-y-6">
            {filteredAppointments.map(app => {
              const appointmentDateTime = getISTDateTime(app.date, app.time);
              const currentIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
              const status = currentIST >= appointmentDateTime ? "Completed" : "Pending";

              return (
                <li key={app.id} className="border-b pb-4">
                  {editingId === app.id ? (
                    <>
                      <select name="doctor" value={editFormData.doctor || ""} onChange={handleEditChange} className="border p-2 w-full rounded mt-2" >
                        <option value="">Select Doctor</option>
                        {doctorSuggestions[app.reason]?.map(doc => (
                          <option key={doc} value={doc}>{doc}</option>
                        ))} 
                        </select>
                      <input name="date" type="date" value={editFormData.date || ""} onChange={handleEditChange} className="border p-2 w-full rounded mt-2" />
                      <select name="time" value={editFormData.time || ""} onChange={handleEditChange} className="border p-2 w-full rounded mt-2">
                        <option value="">Select Time</option>
                        {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                      </select>
                      <textarea name="notes" value={editFormData.notes || ""} onChange={handleEditChange} className="border p-2 w-full rounded mt-2" placeholder="Notes" />
                      <div className="flex gap-2 mt-2">
                        <button onClick={handleUpdateAppointment} className="bg-green-600 text-white px-4 py-1 rounded">Save</button>
                        <button onClick={handleCancelEdit} className="bg-gray-500 text-white px-4 py-1 rounded">Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p><strong>Patient:</strong> {app.name}</p>
                      <p><strong>Time:</strong> {app.time}</p>
                      <p><strong>Doctor:</strong> {app.doctor}</p>
                      <p><strong>Reason:</strong> {app.reason}</p>
                      <p><strong>Status:</strong> <span className={status === "Completed" ? "text-green-600" : "text-yellow-600"}>{status}</span></p>

                      <textarea
                        value={editingNotes[app.id] ?? app.notes ?? ""}
                        onChange={(e) => setEditingNotes({ ...editingNotes, [app.id]: e.target.value })}
                        className="border p-2 w-full rounded mt-2"
                        placeholder="Add or edit outcome notes"
                        disabled={status === "Completed"}
                      />

                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => handleSaveNote(app.id)}
                          className="bg-blue-500 text-white px-4 py-1 rounded"
                          disabled={status === "Completed"}
                        >
                          Save Note
                        </button>
                        <button
                          onClick={() => handleCancel(app.id)}
                          className="bg-red-500 text-white px-4 py-1 rounded"
                          disabled={status === "Completed"}
                        >
                          Cancel Appointment
                        </button>
                        {status === "Pending" && (
                          <button
                            onClick={() => handleEdit(app)}
                            className="bg-yellow-500 text-white px-4 py-1 rounded"
                          >
                            Edit
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewAppointments;
