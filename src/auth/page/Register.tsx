import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../styles/Auth.css'
import axios from 'axios'
import { register, registerAdmin } from '../service/authService'
import { useAlert } from '@/alert/AlertContext'
import { Environment } from '@/environment'

const API_URL = Environment.StickerBomberBackApiURL;

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [streamerId, setStreamerId] = useState<number | null>(null)
  const { showAlert } = useAlert()
  const { dynamicParam } = useParams<{ dynamicParam: string }>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const showldSaveAdmin: boolean = await checkIfAdminLinkIsValid();

      let savedNewUser = null;
      if (showldSaveAdmin) {
        if (!streamerId) {
          throw new Error('Streamer id is missing');
        }
        savedNewUser = await registerAdmin(username, email, password, streamerId);
      }
      savedNewUser = await register(username, email, password);

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

  async function checkIfAdminLinkIsValid(): Promise<boolean> {
    let adminLinks: {streamerId: number, link: string}[] = [];

    if (!dynamicParam) 
      throw new Error('Dynamic param is missing');

    try {
      const adminLinksResponse = await axios.get(`${API_URL}/streamer/streamers-admin-links`)
      adminLinks = adminLinksResponse.data;
      
    } catch (error) {
      console.error(error);
    }

    const streamerId = adminLinks.find(link => link.link === dynamicParam)?.streamerId;

    if (!streamerId) {
      // show dialog
      return false;
    }

    setStreamerId(streamerId);

    return true;
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
