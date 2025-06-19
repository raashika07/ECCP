import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post<{ token: string }>(
        'http://localhost:5000/api/auth/login',
        { email, password }
      );
      const { token } = res.data;
      if (token) {
        localStorage.setItem('token', token);
        alert('✅ Login successful!');
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">🔐 Welcome Back</h2>
        <p className="login-subtitle">Login to your ECCP account</p>
        <input
          type="email"
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="🔑 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
