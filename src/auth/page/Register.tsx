import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Auth.css'
import axios from 'axios'
import { register } from '../service/authService'

const Register: React.FC = () => {
  const [fullname, setFullname] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const data = await register(fullname, email, password)
      setMessage(`Registration successful: ${data.token}`)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessage(
          `Error: ${error.response?.data.message || 'An error occurred'}`
        )
      } else {
        setMessage('An unexpected error occurred')
      }
    }
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
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
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
      {message && <p>{message}</p>}
    </div>
  )
}

export default Register
