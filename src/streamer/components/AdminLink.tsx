import { useAlert } from "@/alert/AlertContext";
import axios from 'axios';
import { Environment } from '@/environment';
import { useCallback, useEffect, useState } from "react";


export const AdminLink = () => {
  const API_URL = Environment.StickerBomberBackApiURL;
  const userId = localStorage.getItem('userId');

  const { showAlert } = useAlert();
  const [adminLink, setAdminLink] = useState<string | null>(null);

  const getAdminLink = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/streamer/get-admin-link/${userId}`);
      setAdminLink(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showAlert(`Error: ${error.response?.data.message || 'An error occurred'}`, 'error');
      } else {
        showAlert('An unexpected error occurred', 'error');
      }
    }
  }, [API_URL, userId, showAlert]);

  const generateAdminLink = async () => {
    try {
      const response = await axios.get(`${API_URL}/streamer/generate-admin-link/${userId}`);
      setAdminLink(response.data);
      showAlert('Admin link generated successfully!', 'success');
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
      getAdminLink();
    }
  }, [userId, getAdminLink]);
 
  return (
    <div className="admin-link-container">
      <p>Admin Link</p>
      {adminLink ? <p>{adminLink}</p> : <p>Loading...</p>}
      <button onClick={generateAdminLink}>Generate new link</button>
    </div>
  );
}