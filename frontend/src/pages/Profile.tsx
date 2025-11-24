// src/pages/Profile.tsx
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  gender: string;
  age: number;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    age: ''
  });

  useEffect(() => {
    const storedProfile = localStorage.getItem('profile');
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile);
      setProfile(parsed);
      setEditMode(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem('profile', JSON.stringify(formData));
    setProfile({ ...formData , age: Number(formData.age), });
    setEditMode(false);
    toast.success('Profile saved successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6">
      <Toaster position="top-right" />
      <div className="card w-full max-w-lg bg-white shadow-xl p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">Your Profile</h2>
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile Avatar"
            className="w-28 h-28 rounded-full"
          />
        </div>

        {editMode ? (
          <form className="form-control gap-3">
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="select select-bordered"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              name="age"
              type="number"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
            <button type="button" onClick={handleSave} className="btn btn-primary mt-2">
              Save Profile
            </button>
          </form>
        ) : (
          <div className="space-y-2">
            <p><strong>Name:</strong> {profile?.name}</p>
            <p><strong>Email:</strong> {profile?.email}</p>
            <p><strong>Phone:</strong> {profile?.phone}</p>
            <p><strong>Gender:</strong> {profile?.gender}</p>
            <p><strong>Age:</strong> {profile?.age}</p>
            <button onClick={() => setEditMode(true)} className="btn btn-outline mt-3">
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
