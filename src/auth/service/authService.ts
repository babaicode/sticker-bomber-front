import { Environment } from '@/environment';
import axios from 'axios'

const API_URL = Environment.StickerBomberBackApiURL;

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, { email, password })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}

export const registerAdmin = async (
  username: string,
  email: string,
  password: string,
  streamerId: number
) => {
  try {
    const response = await axios.post(`${API_URL}/streamer/register-admin`, {
      username,
      email,
      password,
      streamerId,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}

export const register = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/user/signup`, {
      username,
      email,
      password,
    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'An error occurred')
    } else {
      throw new Error('An unexpected error occurred')
    }
  }
}

export async function getAuthorAvatar(adminId: number) {
  try {
    const response = await fetch(`http://localhost:3000/admin/avatar/${adminId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      console.error('Failed to fetch avatar:', response.statusText);
      return;
    }

    const blob = await response.blob();
    const avatarUrl = URL.createObjectURL(blob);
    return avatarUrl;
  } catch (error) {
    console.error('Error fetching avatar:', error);
  }
}
