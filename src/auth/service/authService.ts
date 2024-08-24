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
export const register = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/user/signup`, {
      fullName,
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
