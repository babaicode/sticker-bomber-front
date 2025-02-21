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
import { WonnaBeStreamer } from './streamer/components/WonnaBeStreamer';
import Logout from './auth/page/Logout';
import PrivateRoute from './PrivateRoute';
import AdminPage from './admin/page/AdminPage';
import Customer from './customer/page/Customer';

const App: React.FC = () => {
  return (
    <div id="root">
      <AlertProvider>
        <Alert />
        <Router>
          <ConditionalNavBar />
          <div className="app-container">
            <Routes>
              <Route path="/register/:dynamicParam?" element={<Register />} />
              <Route path="/c/:customerParam?" element={<Customer />} />
              <Route path="/login" element={<Login />} />

              <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
              <Route path="logout" element={<PrivateRoute element={<Logout />} />} />
              <Route path="streamer" element={<PrivateRoute element={<Streamer />} />} />
              <Route path="admin" element={<PrivateRoute element={<AdminPage />} />} />
              <Route path="wonna-be-streamer" element={<PrivateRoute element={<WonnaBeStreamer />} />} />
            </Routes>
          </div>
        </Router>
      </AlertProvider>
    </div>
  );
};

const ConditionalNavBar: React.FC = () => {
  const location = useLocation();
  const pathnameArray = location.pathname.split('/');
  const hideNavBar = pathnameArray.includes('register') || pathnameArray.includes('login');

  return !hideNavBar ? <NavBar /> : null;
};

export default App;
