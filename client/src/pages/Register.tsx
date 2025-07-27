import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

interface RegisterResponse {
  message: string;
}

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // ✅ STEP 1: Confirm password
  const [role, setRole] = useState('elderly');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = async () => {
    // ✅ Email format check
    if (!emailRegex.test(email)) {
      alert('❌ Invalid email format. Please enter a valid email address.');
      return;
    }

    // ✅ Confirm password check
    if (password !== confirmPassword) {
      alert('❌ Passwords do not match.');
      return;
    }

    // ✅ Password strength check
    const passwordStrengthRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordStrengthRegex.test(password)) {
      alert('❌ Password must be at least 8 characters and include a number and special character.');
      return;
    }

    try {
      const response = await axios.post<RegisterResponse>(
        'http://localhost:5000/api/auth/register',
        {
          email,
          password,
          role,
        }
      );

      console.log('⚙️ Registration Response:', response.data);
      alert(response.data.message || 'Registered successfully!');
      window.location.href = '/login';
    } catch (err: any) {
      console.error('❌ Registration Error:', err);
      alert(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register 📝</h2>
        <p className="register-Subtitle">Register your ECCP account</p>

        <input
          className="register-input"
          type="email"
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="register-input"
          type="password"
          placeholder="🔑 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          className="register-input"
          type="password"
          placeholder="🔁 Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <select
          className="register-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="elderly">Elderly</option>
          <option value="caregiver">Caregiver</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>

        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;


