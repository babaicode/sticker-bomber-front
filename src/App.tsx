import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './home/page/Dashboard';
import Register from './auth/page/Register';
import Login from './auth/page/Login';
import { AlertProvider } from './alert/AlertContext';
import Alert from './alert/Alert';
import NavBar from './navbar/NavBar';
import Streamer from './streamer/page/Streamer';
import './styles.css';

const App: React.FC = () => {
  return (
    <div id="root">
      <AlertProvider>
        <Alert />
        <Router>
          <ConditionalNavBar />
          <div className="app-container">
            <Routes>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Dashboard />} />
              <Route path="/streamer" element={<Streamer />} />
            </Routes>
          </div>
        </Router>
      </AlertProvider>
    </div>
  );
};

const ConditionalNavBar: React.FC = () => {
  const location = useLocation();
  const hideNavBar = location.pathname === '/register' || location.pathname === '/login';

  return !hideNavBar ? <NavBar /> : null;
};

export default App;
