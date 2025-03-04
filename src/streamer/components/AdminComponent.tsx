import { useCallback, useEffect, useState } from "react";
import { AdminComponentProps } from "../interfaces/StreamerInterface";
import '../styles/AdminComponent.module.css';
import { Environment } from "@/environment";
import { useAlert } from "@/alert/AlertContext";
import axios from "axios";
import { AdminRuleDialog } from "./AdminRuleDialog";
import { AdminRuleInterface, AllRulesInterface } from "../interfaces/RulesInterface";
import { useTranslation } from "react-i18next";

export const AdminComponent: React.FC<AdminComponentProps> = ({ adminName, adminId }) => {
  const API_URL = Environment.StickerBomberBackApiURL;

  const [rules, setRules] = useState<AdminRuleInterface[] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [allRules, setAllRules] = useState<AllRulesInterface[] | null>(null);

  const { showAlert } = useAlert();
  const { t } = useTranslation();

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
      <button onClick={openDialog}>{t("show-admin-rules")}</button>

      <AdminRuleDialog 
        visible={isDialogOpen} 
        onClose={closeDialog} 
        rules={rules}
        title="Admin Rules"
        allRules={allRules}
        adminId={adminId} 
      />
    </div>
  );
};
