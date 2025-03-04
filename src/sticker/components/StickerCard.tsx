import React from 'react';
import styles from '../styles/StickerCard.module.css';
import { StickerCardProps } from '../interfaces/StickerInterface';

const StickerCard: React.FC<StickerCardProps> = ({ stickerUrl, stickerName, onClick }) => {

  return (
    <div className={styles.stickerCardContainer} onClick={onClick}>
      <div
        className={styles.stickerCard}
        style={{
          backgroundImage: stickerUrl ? `url(${stickerUrl})` : undefined,
        }}
      >
        <span className={styles.stickerName}>{stickerName}</span>
      </div>
    </div>
  );
};

export default StickerCard;