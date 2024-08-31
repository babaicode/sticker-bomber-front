import React, { useEffect } from 'react';
import { AdminLink } from '../components/AdminLink';
import { useNavigate } from 'react-router-dom';

const Streamer: React.FC = () => {
  const navigate = useNavigate();
  const isStreamer = localStorage.getItem('isStreamer');
  
  useEffect(() => {
    console.log(isStreamer, 'isStreamer');
    if (isStreamer === 'false') {
      console.log('redirecting');
      navigate('/wonna-be-streamer');
    }
  }, [isStreamer, navigate]);

  return (
    <div>
      <AdminLink />
    </div>
  );
}

export default Streamer;