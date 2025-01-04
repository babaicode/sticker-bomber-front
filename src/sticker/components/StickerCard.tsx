import React from 'react';
import '../styles/StickerCard.css';

export interface StickerCardProps {
  stickerId: number;
  stickerUrl: string;
  stickerName: string;
}

const StickerCard: React.FC<StickerCardProps> = ({ stickerUrl, stickerName }) => {

  return (
    <div className="sticker-card-container">
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