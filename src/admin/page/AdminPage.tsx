import React from 'react';
import '../styles/AdminPage.module.css';
import UploadAvatarComponent from '../components/UploadAvatarComponent';

const AdminPage: React.FC = () => {
  return (
    <div className='admin-page-container'>
      <UploadAvatarComponent />
    </div>
  );
}

export default AdminPage;