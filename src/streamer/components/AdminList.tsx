import { useEffect, useState, useCallback } from "react";
import axios from 'axios';
import { Environment } from '@/environment';
import { useAlert } from "@/alert/AlertContext";
import { getAuthorAvatar } from "@/auth/service/authService";
import '../styles/AdminListComponent.module.css';
import { AdminCard } from "./AdminCard";
import { Admin } from "../interfaces/AdminsInterfaces";
import { useTranslation } from "react-i18next";

export const AdminList = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const streamerId = localStorage.getItem("streamerId");

  const API_URL = Environment.StickerBomberBackApiURL;

  const { showAlert } = useAlert();
  const { t } = useTranslation();

  const fetchAdmins = useCallback(async () => {
    if (!streamerId) {
      showAlert("Streamer ID not found", "error");
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/admin/admins-by-streamer/${streamerId}`);

      if (!Array.isArray(response.data) ||
        !response.data.every(item => 
          typeof item.adminId === 'number' && 
          typeof item.userId === 'number' && 
          typeof item.userName === 'string'
      )) {
        showAlert(`Do not have admins`, "warning");
      }

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
            adminId={admin.adminId}
          />
        ))
      ) : (
        <p>{t("no-admins-found")}</p>
      )}
    </div>
  );
};
