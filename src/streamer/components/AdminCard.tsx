import { useCallback, useEffect, useState } from "react";
import styles from "../styles/AdminListComponent.module.css";
import { AdminRuleDialog } from "./AdminRuleDialog";
import axios from "axios";
import { AdminRuleInterface, AllRulesInterface } from "../interfaces/RulesInterface";
import { Environment } from "@/environment";
import { useAlert } from "@/alert/AlertContext";
import { AdminCardProps } from "../interfaces/AdminsInterfaces";

export const AdminCard: React.FC<AdminCardProps> = ({ userName, avatarUrl, adminId }) => {
  const API_URL = Environment.StickerBomberBackApiURL;
  const { showAlert } = useAlert();
  const [rules, setRules] = useState<AdminRuleInterface[] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [allRules, setAllRules] = useState<AllRulesInterface[] | null>(null);

  const getRulesByAdminId = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/admin-ruls/by-adminId/${adminId}`);
      setRules(response.data);
    } catch (error) {
      showAlert("Failed to fetch admin rules", "error");
    }
  }, [API_URL, adminId, showAlert]);

  const getAllRules = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/rule/all`);
      setAllRules(response.data);
    } catch (error) {
      showAlert("Failed to fetch all rules", "error");
    }
  }, [API_URL, showAlert]);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  useEffect(() => {
    if (adminId) {
      getRulesByAdminId();
      getAllRules();
    }
  }, [adminId, getRulesByAdminId, getAllRules]);

  return (
    <div className={styles.adminCardContainer}>
      <div
        className={styles.adminCard}
        style={{
          backgroundImage: avatarUrl ? `url(${avatarUrl})` : undefined,
        }}
        onClick={openDialog}
      >
        <span className={styles.adminName}>{userName}</span>
      </div>
      <AdminRuleDialog
        visible={isDialogOpen}
        onClose={closeDialog}
        rules={rules}
        title={`Rules for ${userName}`}
        allRules={allRules}
        adminId={adminId}
      />
    </div>
  );
};
