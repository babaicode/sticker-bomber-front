import { useAlert } from "@/alert/AlertContext";
import axios from 'axios';
import { Environment } from '@/environment';
import { useCallback, useEffect, useState } from "react";
import '../styles/UserLinkComponent.module.css';
import { useTranslation } from "react-i18next";

export const UserLink = () => {
  const API_URL = Environment.StickerBomberBackApiURL;
  const userId = localStorage.getItem('userId');
  const { showAlert } = useAlert();
  const { t } = useTranslation();

  const [userLink, setUserLink] = useState<string | null>(null);
  const [shouldShow, setShouldShow] = useState(false);

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
    <div>
      { shouldShow ? (
      <div>
        <h3 style={{ textAlign: "center" }}>{t("user-link")}</h3>
        <div className="admin-link-container">
          {userLink ? <p>{userLink}</p> : <p>{t("loading...")}</p>}
          <div className="button-box">
            <button className="button-1 small" role="button" onClick={generateUserLink}>{t("Generate new link")}</button>
            <button className="button-1 mega-small" role="button" onClick={() => setShouldShow(false)}>x</button>
          </div>
        </div>
      </div>
      ) : (
        <div className="show-user-link-button-container">
          <button className="button-1" role="button" onClick={() => setShouldShow(true)}>
            {t("show-user-link")}
          </button>
        </div> 
      )}
    </div>
  );
}