import { useCallback, useEffect, useState } from "react";
import { AdminComponentProps } from "../interfaces/StreamerInterface";
import '../styles/AdminComponent.css';
import { Environment } from "@/environment";
import { useAlert } from "@/alert/AlertContext";
import axios from "axios";
import { AdminRuleDialog } from "./AdminRuleDialog";
import { AdminRuleInterface, AllRulesInterface } from "../interfaces/RulesInterface";

export const AdminComponent: React.FC<AdminComponentProps> = ({ adminName, adminId }) => {
  const API_URL = Environment.StickerBomberBackApiURL;
  const { showAlert } = useAlert();
  const [rules, setRules] = useState<AdminRuleInterface[] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [allRules, setAllRules] = useState<AllRulesInterface[] | null>(null);

  const getRulesByAdminId = useCallback(async (adminId: number) => {
    try {
      const response = await axios.get(`${API_URL}/admin-ruls/by-adminId/${adminId}`);
      setRules(response.data);
    } catch (error) {
      showAlert('An unexpected error occurred', 'error');
    }
  }, [API_URL, showAlert]);

  const getAllRules = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/rule/all`);
      setAllRules(response.data);
    } catch (error) {
      showAlert('An unexpected error occurred', 'error');
    }
  }, [API_URL, showAlert]);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (adminId) {
      getRulesByAdminId(adminId);
      getAllRules();
    }
  }, [adminId, getRulesByAdminId, getAllRules]);

  return (
    <div className="admin-list-container">
      <p>{adminName}</p>
      <button onClick={openDialog}>Show Admin Rules</button>

      <AdminRuleDialog visible={isDialogOpen} onClose={closeDialog} rules={rules} title="Admin Rules" allRules={allRules} />
    </div>
  );
};
