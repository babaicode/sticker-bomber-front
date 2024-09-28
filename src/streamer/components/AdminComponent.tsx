import { useCallback, useEffect, useState } from "react";
import { AdminComponentProps } from "../interfaces/StreamerInterface";
import '../styles/AdminComponent.css';
import { Environment } from "@/environment";
import { useAlert } from "@/alert/AlertContext";
import { AdminRuleInterface } from "../interfaces/AdminInterface";
import axios from "axios";

export const AdminComponent: React.FC<AdminComponentProps> = ({ adminName, adminId }) => {
  const API_URL = Environment.StickerBomberBackApiURL;
  const { showAlert } = useAlert();
  const [rules, setRules] = useState<AdminRuleInterface[] | null>(null);

  const getRulesByAdminId = useCallback(async (adminId: number) => {
    try {
      console.log(adminId, 'adminId');
      const response = await axios.get(`${API_URL}/admin-ruls/by-adminId/${adminId}`);
      setRules(response.data);
    } catch (error) {
      showAlert('An unexpected error occurred', 'error');
    }
  }, [API_URL, showAlert]);

  useEffect(() => {
    if (adminId) {
      getRulesByAdminId(adminId);
    }
  }, [adminId, getRulesByAdminId]);

  return (
    <div className="admin-list-container">
      <p>{adminName}</p>
    </div>
  );
};
