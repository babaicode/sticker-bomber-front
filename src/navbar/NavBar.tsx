import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.css';
import { getAuthorAvatar } from '@/auth/service/authService';

const NavBar: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvatar = async () => {
      const adminId = localStorage.getItem('adminId');
      if (adminId && adminId !== 'undefined') {
        const avatarUrl = await getAuthorAvatar(Number(adminId));
        if (avatarUrl) {
          setAvatar(avatarUrl);
        }
      }
    };

    fetchAvatar();
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/streamer" className="nav-link">Streamer</Link>
      <Link to="/logout" className="nav-link">Logout</Link>
      {avatar && <img src={avatar} alt="User Avatar" className="avatar" />}
    </nav>
  );
};

export default NavBar;
