import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/Auth.css';
import axios from 'axios';
import { login } from '../service/authService';
import { useAlert } from '@/alert/AlertContext';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { showAlert } = useAlert();

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await login(email, password);
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userId', data.user.userId);
        localStorage.setItem('isStreamer', data.user.isStreamer);
        localStorage.setItem('streamerId', data.user.streamerId);
        localStorage.setItem('adminId', data.user.adminId);

        showAlert('Login successful', 'success');
        navigate('/dashboard');
        clearInputs();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showAlert(`Error: ${error.response?.data.message || 'An error occurred'}`, 'error');
      } else {
        showAlert('An unexpected error occurred', 'error');
      }
    }
  }

  function clearInputs() {
    setEmail('');
    setPassword('');
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='buttons-box'>
          <button className="register-button" type="submit">Login</button>
          <Link className='go-to-login' to="/register">Do you need to register?</Link>
        </div>
      </form>
    </div>
  )
}

export default Login
