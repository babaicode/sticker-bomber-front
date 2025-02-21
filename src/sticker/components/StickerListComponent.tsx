import React, { useCallback, useEffect, useState } from 'react';
import '../styles/StickerListComponent.css';
import { useAlert } from '@/alert/AlertContext';
import axios from 'axios';
import { Environment } from '@/environment';
import StickerCard from './StickerCard';
import CreateStickerComponent from './CreateStickerComponent';
import { Sticker } from '../interfaces/StickerInterface';

const StickerListComponent: React.FC = () => {
  const { showAlert } = useAlert();
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const API_URL = Environment.StickerBomberBackApiURL;
  const streamerId: number | undefined = Number(localStorage.getItem("streamerId"));
  const adminId: number | undefined = Number(localStorage.getItem("adminId"));
  
  const fetchStickers = useCallback(async () => {
    try {
      const id = streamerId ? streamerId : adminId;
      const streamerOrAdmin = streamerId ? "streamer" : "admin"; 
      const response = await axios.get(`${API_URL}/sticker/${streamerOrAdmin}/${id}`);
      
      if (response.data && Object.keys(response.data.stickers).length > 0) {
        for (let sticker of response.data.stickers) {  
          processSticker(sticker); 
        }  
      } else if (!response.data || Object.keys(response.data).length === 0) {
        // No stickers found
      } else {
        showAlert('No stickers found', 'warning');
      }  
    } catch (error) {
      showAlert('Error fetching sticker', 'error');
    }
  }, [streamerId, adminId, API_URL, showAlert]);
  
  useEffect(() => {
    fetchStickers();
  }, []);

  const processSticker = (
    sticker: {
      stickerName: string,
      stickerId: number,
      stickerUrl: string
  }) => {
    const { stickerName, stickerId, stickerUrl } = sticker;

    const stickerUrlObject = processStickerUrl(stickerUrl);
    const stickerIdNum = Number(stickerId);
    const stickerNameStr = String(stickerName);

    setStickers((prevStickers) => {
      if (prevStickers.some((s) => s.stickerId === stickerIdNum)) {
        return prevStickers;
      }
      return [
        ...prevStickers,
        {
          stickerId: stickerIdNum,
          url: stickerUrlObject,
          stickerName: stickerNameStr
        }
      ];
    }); 
  }

  const processStickerUrl = (url: string): string => {
    const byteCharacters = atob(url);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    const stickerUrlObject = URL.createObjectURL(blob);

    return stickerUrlObject;
  }

  return (
    <div className='sticker-list-container'>
      <CreateStickerComponent />
      { stickers &&
        stickers.map((sticker) => (
          <StickerCard
            key={sticker.stickerId}
            stickerId={sticker.stickerId}
            stickerUrl={sticker.url}
            stickerName={sticker.stickerName}
          />
        ))}
    </div>
  );
}

export default StickerListComponent;