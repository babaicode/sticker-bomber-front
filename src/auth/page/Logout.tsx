import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '@/alert/AlertContext';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    if (!hasLoggedOut.current) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');
      localStorage.removeItem('isStreamer');
      showAlert('Logout successful', 'warning');
      navigate('/login');
      hasLoggedOut.current = true;
    }
  }, [navigate, showAlert]);

  return null;
};

export default Logout;