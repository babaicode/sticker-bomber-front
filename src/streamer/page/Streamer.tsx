import React, { useEffect } from 'react';
import { AdminLink } from '../components/AdminLink';
import { useNavigate } from 'react-router-dom';
import { UserLink } from '../components/UserLink';
import { AdminList } from '../components/AdminList';

const Streamer: React.FC = () => {
  const navigate = useNavigate();
  const isStreamer = localStorage.getItem('isStreamer');
  
  useEffect(() => {
    if (isStreamer === 'false') {
      navigate('/wonna-be-streamer');
    }
  }, [isStreamer, navigate]);

  return (
    <div>
      <AdminLink />
      <UserLink />
      <AdminList />
    </div>
  );
}

export default Streamer;