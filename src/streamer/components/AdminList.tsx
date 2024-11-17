import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { Environment } from '@/environment';
import { useAlert } from "@/alert/AlertContext";
import { getAuthorAvatar } from "@/auth/service/authService";
import '../styles/AdminListComponent.css';

export interface Admin {
  adminId: number;
  userId: number;
  userName: string;
}

export const AdminList = () => {
  const { showAlert } = useAlert();
  const [adminArray, setAdminArray] = useState<{
    adminId: number;
    userId: number;
    userName: string;
    avatarUrl?: string;
  }[]>([]);
  const API_URL = Environment.StickerBomberBackApiURL;
  const streamerId: string | null = localStorage.getItem('streamerId');

  const getAdmins = useCallback(async () => {
    if (!streamerId) {
      showAlert('streamer ID not found', 'error');
      return;
    }
  
    try {
      const response = await axios.get(`${API_URL}/admin/admins-by-streamer/${streamerId}`);
      const adminsWithAvatars = await Promise.all(
        response.data.map(async (admin: Admin) => {
          const avatarUrl = await getAuthorAvatar(admin.adminId);

          return { ...admin, avatarUrl };
        })
      );
      setAdminArray(adminsWithAvatars);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showAlert(`Error: ${error.response?.data.message || 'An error occurred'}`, 'error');
      } else {
        showAlert('An unexpected error occurred', 'error');
      }
    }
  }, [streamerId, API_URL, showAlert]);  

  useEffect(() => {
    getAdmins();
  }, [getAdmins]);

  return (
    <div className="container">
      {adminArray.length > 0 ? (
        adminArray.map((admin) => (
          <div
            key={admin.adminId}
            className="admin-block"
            style={{
              backgroundImage: admin.avatarUrl ? `url(${admin.avatarUrl})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '150px',
              width: '150px',
              borderRadius: '8px',
              margin: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              textShadow: '0 0 5px rgba(0, 0, 0, 0.8)',
              backgroundColor: admin.avatarUrl ? 'transparent' : '#ccc',
            }}
          >
            {admin.userName}
          </div>
        ))
      ) : (
        <p>No admins found</p>
      )}
    </div>
  );  
};
