import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post<{ message?: string }>(
        'http://localhost:5000/api/auth/register',
        { email, password }
      );
      const { message } = response.data;
      alert(message || 'Registered successfully!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
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
        />
        <button className="register-button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
