import { useAlert } from "@/alert/AlertContext";
import axios from 'axios';
import { Environment } from '@/environment';
import { useCallback, useEffect, useState } from "react";


export const UserLink = () => {
  const API_URL = Environment.StickerBomberBackApiURL;
  const userId = localStorage.getItem('userId');

  const { showAlert } = useAlert();
  const [userLink, setUserLink] = useState<string | null>(null);

  const getUserLink = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/streamer/get-user-link/${userId}`);
      setUserLink(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showAlert(`Error: ${error.response?.data.message || 'An error occurred'}`, 'error');
      } else {
        showAlert('An unexpected error occurred', 'error');
      }
    }
  }, [API_URL, userId, showAlert]);

  const generateUserLink = async () => {
    try {
      const response = await axios.get(`${API_URL}/streamer/generate-user-link/${userId}`);
      setUserLink(response.data);
      showAlert('User link generated successfully!', 'success');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showAlert(`Error: ${error.response?.data.message || 'An error occurred'}`, 'error');
      } else {
        showAlert('An unexpected error occurred', 'error');
      }
    }
  };

  useEffect(() => {
    if (userId) {
      getUserLink();
    }
  }, [userId, getUserLink]);
 
  return (
    <div className="user-link-container">
      <p>User Link</p>
      {userLink ? <p>{userLink}</p> : <p>Loading...</p>}
      <button onClick={generateUserLink}>Generate new link</button>
    </div>
  );
}