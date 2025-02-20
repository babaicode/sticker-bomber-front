import React, { useCallback, useEffect, useState } from 'react';
import '../styles/StickerListComponent.css';
import { useAlert } from '@/alert/AlertContext';
import axios from 'axios';
import { Environment } from '@/environment';
import StickerCard from './StickerCard';
import CreateStickerComponent from './CreateStickerComponent';

export interface Sticker {
  stickerId: number;
  stickerUrl: string;
  stickerName: string;
}

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
      
      if (response.data && Object.keys(response.data).length > 0) {
        const { stickerName, stickerId, file } = response.data;

        const byteCharacters = atob(file);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        const stickerUrl = URL.createObjectURL(blob);
      
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
              stickerUrl,
              stickerName: stickerNameStr
            }
          ];
        });        
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

  return (
    <div className='sticker-list-container'>
      <CreateStickerComponent />
      { stickers &&
        stickers.map((sticker) => (
          <StickerCard
            key={sticker.stickerId}
            stickerId={sticker.stickerId}
            stickerUrl={sticker.stickerUrl}
            stickerName={sticker.stickerName}
          />
        ))}
    </div>
  );
}

export default StickerListComponent;