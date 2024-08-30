import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Auth.css'
import axios from 'axios'
import { register } from '../service/authService'
import { useAlert } from '@/alert/AlertContext'


const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const { showAlert } = useAlert()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const savedNewUser = await register(username, email, password);

      if (savedNewUser) {
        showAlert('Registration successful', 'success')
        clearInputs();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showAlert('An error occurred', 'error')
      } else {
        showAlert('An unexpected error occurred', 'error')
      }
    }
  }

  function clearInputs() {
    setUsername('');
    setEmail('');
    setPassword('');
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>

        <div>
          <label htmlFor="username">Username:</label>
          <input
            className='input'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
          <button className="register-button" type="submit">Register</button>
          <Link className='go-to-login' to="/login">I do have account</Link>
        </div>
      </form>
    </div>
  )
}

export default Register
