import React from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/home" className="nav-link">Home</Link>
      <Link to="/streamer" className="nav-link">Streamer</Link>
      <Link to="/logout" className="nav-link">Logout</Link>
    </nav>
  );
};

export default NavBar;
