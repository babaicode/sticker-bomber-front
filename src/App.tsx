import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './home/page/Dashboard';
import Register from './auth/page/Register';
import Login from './auth/page/Login';
import { AlertProvider } from './alert/AlertContext';
import Alert from './alert/Alert';

const App: React.FC = () => {
  return (
    <AlertProvider>
      <Alert />
      <Router>
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

export default App;
