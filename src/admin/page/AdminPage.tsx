import React from 'react';
import '../styles/AdminPage.css';
import UploadAvatarComponent from '../components/UploadAvatarComponent';

const AdminPage: React.FC = () => {
  return (
    <div className='container'>
      <UploadAvatarComponent />
    </div>
  );
}

export default AdminPage;