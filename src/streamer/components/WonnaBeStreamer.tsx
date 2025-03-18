import { useAlert } from '@/alert/AlertContext';
import { Environment } from '@/environment';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const WonnaBeStreamer: React.FC = () => {
  const userId = localStorage.getItem('userId');
  const API_URL = Environment.StickerBomberBackApiURL;
  const { t } = useTranslation();

  const { showAlert } = useAlert();
  const [isStreamer, setIsStreamer] = useState<boolean>(false);
  const navigate = useNavigate();

  const checkIfUserAlreadyStreamer = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/user/check-if-user-streamer/${userId}`);
      setIsStreamer(response.data);
      if (isStreamer) {
        localStorage.setItem('isStreamer', 'true');
        showAlert('You are already a streamer', 'success');
        navigate('/streamer');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showAlert(`Error: ${error.response?.data.message || 'An error occurred'}`, 'error');
      } else {
        showAlert('An unexpected error occurred', 'error');
      }
    }
  }, [API_URL, userId, showAlert, isStreamer, navigate]);

  const becomeAStreamer = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/make-user-streamer/${userId}`);
      setIsStreamer(response.data);
      localStorage.setItem('isStreamer', 'true');
      showAlert('You are now a streamer', 'success');
      navigate('/streamer');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showAlert(`Error: ${error.response?.data.message || 'An error occurred'}`, 'error');
      } else {
        showAlert('An unexpected error occurred', 'error');
      }
    }
  }

  useEffect(() => {
    if (userId) {
      checkIfUserAlreadyStreamer();
    }
  }, [userId, checkIfUserAlreadyStreamer]);

  return (
    <div style={{ margin: '2rem'}}>
      <h1>{t("wonna-be-a-streamer?")}</h1>
      <p>
        {t("you-are-not-a-streamer-yet....")}
      </p>
      <button
        onClick={becomeAStreamer}  
      >{t("become-a-streamer")}</button>
    </div>
  );
};
