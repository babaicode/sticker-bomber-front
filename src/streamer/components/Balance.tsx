import { useAlert } from '@/alert/AlertContext';
import { Environment } from '@/environment';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

export const BalanceComponent: React.FC = () => {
  const streamerId = localStorage.getItem('streamerId');
  const API_URL = Environment.StickerBomberBackApiURL;

  const { showAlert } = useAlert();
  const [streamerBalance, setStreamerBalance] = useState<number>();

  const getStreamerBalance = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/streamer/balance/${streamerId}`);
      setStreamerBalance(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showAlert(`Error: ${error.response?.data.message || 'An error while getting streamer balance'}`, 'error');
      } else {
        showAlert('An unexpected error while getting streamer balance', 'error');
      }
    }
  }, [API_URL, streamerId, showAlert]);

  useEffect(() => {
    getStreamerBalance();

    const interval = setInterval(() => {
      getStreamerBalance();
    }, 3000);

    return () => clearInterval(interval);
  }, [getStreamerBalance]);

  return (
    <div>
      <h1>Streamer balance</h1>
      <p>
        Your balance is: {streamerBalance}
      </p>
    </div>
  );
};
