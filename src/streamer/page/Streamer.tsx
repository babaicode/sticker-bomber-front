import React, { useEffect } from 'react';
import { AdminLink } from '../components/AdminLink';
import { useNavigate } from 'react-router-dom';
import { UserLink } from '../components/UserLink';
import { AdminList } from '../components/AdminList';
import styles from '../styles/StreamerPage.module.css';
import StickerListComponent from '@/sticker/components/StickerListComponent';
import { BalanceComponent } from '../components/Balance';
import StreamLink from '../components/StreamLink';

const Streamer: React.FC = () => {
  const navigate = useNavigate();
  const isStreamer = localStorage.getItem('isStreamer');
  
  useEffect(() => {
    if (isStreamer === 'false') {
      navigate('/wonna-be-streamer');
    }
  }, [isStreamer, navigate]);

  return (
    <div className={styles.stremaerContainer}>
      <div className={styles.linkButtons}>
        <StreamLink />
        <AdminLink />
        <UserLink />
      </div>
      <BalanceComponent />
      <AdminList />
      <StickerListComponent />
    </div>
  );
}

export default Streamer;