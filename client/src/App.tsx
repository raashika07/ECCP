import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async (url: 'login' | 'register') => {
    try {
      const { data }: { data: { token?: string; message?: string } } = await axios.post(
        `http://localhost:5000/api/auth/${url}`,
        { email, password }
      );

      if (url === 'login' && data.token) {
        localStorage.setItem('token', data.token);
        alert(`Login successful!\nToken: ${data.token}`);
      } else {
        alert(data.message || 'Registration successful');
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>ECCP Login & Registration</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', display: 'block' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', display: 'block' }}
      />
      <button onClick={() => handleAuth('register')} style={{ marginRight: '1rem' }}>
        Register
      </button>
      <button onClick={() => handleAuth('login')}>Login</button>
    </div>
  );
};

export default App;

