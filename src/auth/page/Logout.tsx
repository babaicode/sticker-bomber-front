import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '@/alert/AlertContext';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('isStreamer');
    showAlert('Logout', 'warning');
    navigate('/login');
  }, [navigate, showAlert]);

  return null;
};

export default Logout;