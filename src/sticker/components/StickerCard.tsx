import React from 'react';
import '../styles/StickerCard.module.css';

export interface StickerCardProps {
  stickerId: number;
  stickerUrl: string;
  stickerName: string;
  onClick?: () => void;
}

const StickerCard: React.FC<StickerCardProps> = ({ stickerUrl, stickerName, onClick }) => {

  return (
    <div className="sticker-card-container" onClick={onClick}>
      <div
        className='sticker-card'
        style={{
          backgroundImage: stickerUrl ? `url(${stickerUrl})` : undefined,
        }}
      >
        <span className="sticker-name">{stickerName}</span>
      </div>
    </div>
  );
};

export default StickerCard;