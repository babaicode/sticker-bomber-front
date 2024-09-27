import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { Environment } from '@/environment';
import { useAlert } from "@/alert/AlertContext";

export const AdminList = () => {
  const { showAlert } = useAlert();
  const [adminArray, setAdminArray] = useState<{
    adminId: number;
    userId: number;
    userName: string;
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
      setAdminArray(response.data);
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
    <div className="admin-link-container">
      {adminArray.length > 0 ? (
        adminArray.map((admin) => (
          <div key={admin.adminId}>
            <p>Admin ID: {admin.adminId}</p>
            <p>User Name: {admin.userName}</p>
          </div>
        ))
      ) : (
        <p>No admins found</p>
      )}
    </div>
  );
};
