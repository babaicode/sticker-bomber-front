import React from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/register" className="nav-link">Register</Link>
      <Link to="/login" className="nav-link">Login</Link>
      <Link to="/home" className="nav-link">Home</Link>
      <Link to="/streamer" className="nav-link">Streamer</Link>
    </nav>
  );
};

export default NavBar;
