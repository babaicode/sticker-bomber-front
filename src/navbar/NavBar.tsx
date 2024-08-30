import React from 'react';
import { Link } from 'react-router-dom';
import './styles/navbar.css';

const NavBar: React.FC = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Register</Link>
      <Link to="/login" className="nav-link">Login</Link>
      <Link to="/dashboard" className="nav-link">Dashboard</Link>
    </nav>
  );
};

export default NavBar;
