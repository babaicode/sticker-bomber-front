import { useAlert } from "@/alert/AlertContext";
import axios from 'axios';
import { Environment } from '@/environment';
import { useCallback, useEffect, useState } from "react";
import '../styles/AdminLinkComponent.css';

export const AdminLink = () => {
  const API_URL = Environment.StickerBomberBackApiURL;
  const userId = localStorage.getItem('userId');

  const { showAlert } = useAlert();
  const [adminLink, setAdminLink] = useState<string | null>(null);
  const [shouldShow, setShouldShow] = useState(false);

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
    <div>
      { shouldShow ? (
      <div>
        <h3 style={{ textAlign: "center" }}>Admin Link</h3>
        <div className="admin-link-container">
          {adminLink ? <p>{adminLink}</p> : <p>Loading...</p>}
          <div className="button-box">
            <button className="button-1 small" role="button" onClick={generateAdminLink}>Generate new link</button>
            <button className="button-1 mega-small" role="button" onClick={() => setShouldShow(false)}>x</button>
          </div>
        </div>
      </div>
      ) : (
        <div className="show-admin-link-button-container">
          <button className="button-1" role="button" onClick={() => setShouldShow(true)}>
            Show Admin Link
          </button>
        </div> 
      )}
    </div>
  );
}