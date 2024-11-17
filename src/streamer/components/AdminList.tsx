import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { Environment } from '@/environment';
import { useAlert } from "@/alert/AlertContext";
import { getAuthorAvatar } from "@/auth/service/authService";
import '../styles/AdminListComponent.css';
import { AdminCard } from "./AdminCard";

export interface Admin {
  adminId: number;
  userId: number;
  userName: string;
  avatarUrl?: string;
}

export const AdminList = () => {
  const { showAlert } = useAlert();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const API_URL = Environment.StickerBomberBackApiURL;
  const streamerId = localStorage.getItem("streamerId");

  const fetchAdmins = useCallback(async () => {
    if (!streamerId) {
      showAlert("Streamer ID not found", "error");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/admin/admins-by-streamer/${streamerId}`);
      const adminsWithAvatars = await Promise.all(
        response.data.map(async (admin: Admin) => {
          try {
            const avatarUrl = await getAuthorAvatar(admin.adminId);
            return { ...admin, avatarUrl };
          } catch {
            return { ...admin, avatarUrl: null };
          }
        })
      );
      setAdmins(adminsWithAvatars);
    } catch (error) {
      const errorMessage =
        axios.isAxiosError(error) && error.response?.data.message
          ? error.response.data.message
          : "An unexpected error occurred";
      showAlert(`Error: ${errorMessage}`, "error");
    }
  }, [streamerId, API_URL, showAlert]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  return (
    <div className="admin-list-container">
      {admins.length > 0 ? (
        admins.map((admin) => (
          <AdminCard
            key={admin.adminId}
            userName={admin.userName}
            avatarUrl={admin.avatarUrl}
          />
        ))
      ) : (
        <p>No admins found</p>
      )}
    </div>
  );
};
