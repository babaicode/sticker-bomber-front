import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StreamerData } from '../interfaces/CustomerInterface';
import { Environment } from '@/environment';
import { StickerForSettingLocation } from '@/sticker/interfaces/StickerInterface';
import StickerCard from '@/sticker/components/StickerCard';
import '../styles/CustomerPage.css';
import CustomerNavbar from '../components/CustomerNavbar';

const Customer: React.FC = () => {
  const { customerParam } = useParams<{ customerParam: string }>();
  const [streamerData, setStreamerData] = useState<StreamerData | null>(null);
  const [stickers, setStickers] = useState<StickerForSettingLocation[]>([]);
  const API_URL = Environment.StickerBomberBackApiURL;
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1440);
  const navigate = useNavigate();

  if (!customerParam) {
    return <div>Invalid streamer link</div>;
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

  const processStickers = (stickers: StickerForSettingLocation[]) => {
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
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1440);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getStreamerData]);

  const handleStickerClick = (sticker: StickerForSettingLocation) => {
    navigate(`/sp`, {
      state: {
        streamerData,
        sticker,
      },
    });
  };

  return (
    <div>
      <CustomerNavbar />
      <div className={`customer-container ${isMobile ? "mobile" : "desktop"}`}>
        <h1>{streamerData?.streamerName}</h1>
        <div className={`sticker-list ${isMobile ? "sticker-list-mobile" : ""}`}>
          {stickers &&
            stickers.map((sticker) => (
              <StickerCard
              key={sticker.stickerId}
              stickerId={sticker.stickerId}
              stickerUrl={sticker.url}
              stickerName={sticker.stickerName}
              onClick={() => handleStickerClick(sticker)}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Customer;
