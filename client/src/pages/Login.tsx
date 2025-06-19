import React, { useState } from 'react';
import axios from 'axios';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const { data }: { data: { token?: string; message?: string } } = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password }
      );
      if (data.token) {
        localStorage.setItem('token', data.token);
        alert(`Login successful!\nToken: ${data.token}`);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" value={password}
        onChange={(e) => setPassword(e.target.value)} /><br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
