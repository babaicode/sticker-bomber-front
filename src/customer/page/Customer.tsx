import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StreamerData } from '../interfaces/CustomerInterface';
import { Environment } from '@/environment';
import { Sticker } from '@/sticker/interfaces/StickerInterface';

const Customer: React.FC = () => {
  const { customerParam } = useParams<{ customerParam: string }>();
  const [streamerData, setStreamerData] = useState<StreamerData | null>(null);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const API_URL = Environment.StickerBomberBackApiURL;

  if (!customerParam) {
    return <div>Invalid customer</div>;
  }

  const getStreamerData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/streamer/data-for-customer/${customerParam}`);
      if (response.data) {
        setStreamerData(response.data);
        processStickers(response.data.stickers);
      }
    } catch (error) {
      console.error('Error fetching streamer data:', error);
    }
  }, [customerParam, API_URL]);

  const processStickers = (stickers: Sticker[]) => {
    const processedStickers = stickers.map(sticker => ({
      ...sticker,
      url: processStickerUrl(sticker.url)
    }));
    setStickers(processedStickers);
  };

  const processStickerUrl = (url: string): string => {
    try {
      const byteCharacters = atob(url);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error processing sticker URL:', error);
      return '';
    }
  };

  useEffect(() => {
    getStreamerData();
  }, [getStreamerData]);

  return (
    <div className='container'>
      <h2>{streamerData?.streamerName}</h2>
      <div className="sticker-list">
        {stickers.map((sticker) => (
          <div key={sticker.stickerId} className="sticker-card">
            <img src={sticker.url} alt={sticker.stickerName} />
            <p>{sticker.stickerName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customer;
