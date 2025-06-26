import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

interface RegisterResponse {
  message: string;
}

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post<RegisterResponse>(
        'http://localhost:5000/api/auth/register',
        { email, password }
      );

      console.log('⚙️ Registration Response:', response.data);

      alert(response.data.message || 'Registered successfully!');
      window.location.href = '/login'; // Redirect to login page after success
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

        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;

