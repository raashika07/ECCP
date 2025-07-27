import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('elderly');

  const handleLogin = async () => {
    try {
      const response = await axios.post<{ message?: string; token?: string; role?: string }>(
        'http://localhost:5000/api/auth/login',
        { email, password, role } // ✅ Include role in login request
      );

      alert(response.data.message || 'Login successful!');

      // ✅ Store token & role
      localStorage.setItem('token', response.data.token || '');
      localStorage.setItem('role', response.data.role || role); // fallback in case backend doesn't send role

      console.log('🔑 Token stored:', response.data.token);
      console.log('🧑‍💻 Role stored:', response.data.role || role);

      // ✅ Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Login failed.';
      alert(msg);
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

        {/* ✅ Role selector */}
        <select
          className="login-input"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="elderly">Elderly</option>
          <option value="caregiver">Caregiver</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>

        <p className="login-forgot-password">
          Forgot your password? <a href="/reset-password">Reset it</a>
        </p>
        <p className="login-register">
          Don't have an account? <a href="/register">Register</a>
        </p>

        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;


