import React, { useState } from 'react';
import axios from 'axios';

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
    <div style={{ padding: '2rem' }}>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', marginBottom: '1rem', padding: '0.5rem' }}
      />
      <button onClick={handleRegister} style={{ padding: '0.5rem 1rem' }}>
        Register
      </button>
    </div>
  );
};

export default Register;
