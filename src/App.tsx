import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './home/page/Dashboard';
import Register from './auth/page/Register';
import Login from './auth/page/Login';
import { AlertProvider } from './alert/AlertContext';
import Alert from './alert/Alert';
import NavBar from './navbar/NavBar';

const App: React.FC = () => {
  return (
    <AlertProvider>
      <Alert />
      <Router>
      <ConditionalNavBar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </Router>
    </AlertProvider>
  );
};

const ConditionalNavBar: React.FC = () => {
  const location = useLocation();
  const hideNavBar = location.pathname === '/' || location.pathname === '/login';

  return !hideNavBar ? <NavBar /> : null;
};

export default App;
