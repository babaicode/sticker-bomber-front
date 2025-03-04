import { FC, useEffect, useState } from "react";
import styles from "../styles/AdminRuleDialog.module.css";
import { AdminRuleDialogProps } from "../interfaces/RulesInterface";
import axios from "axios";
import { Environment } from "@/environment";
import { useTranslation } from "react-i18next";

export const AdminRuleDialog: FC<AdminRuleDialogProps> = ({
  visible,
  onClose,
  title,
  rules,
  allRules,
  adminId
}) => {
  const [ruleStates, setRuleStates] = useState<{ [key: number]: boolean }>({});
  const [isUpdating, setIsUpdating] = useState(false);

  const API_URL = Environment.StickerBomberBackApiURL;

  const { t } = useTranslation();

  useEffect(() => {
    if (allRules && rules) {
      const initialState: { [key: number]: boolean } = {};
      allRules.forEach((rule) => {
        const isAdminRule = rules.some((adminRule) => adminRule.ruleId === rule.id);
        initialState[rule.id] = isAdminRule;
      });
      setRuleStates(initialState);
    }
  }, [allRules, rules]);

  const handleCheckboxChange = async (ruleId: number, checked: boolean) => {
    setRuleStates((prevState) => ({
      ...prevState,
      [ruleId]: checked,
    }));

    setIsUpdating(true);
    try {
      if (checked) {
        await axios.post(`${API_URL}/admin-ruls/${adminId}/${ruleId}`);
      } else {
        await axios.delete(`${API_URL}/admin-ruls/${adminId}/${ruleId}`);
      }
    } catch (error) {
      console.error("Error updating rule:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (!visible) return null;

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContainer}>
        <div className={styles.dialogHeader}>
          <h3>{title}</h3>
          <button className={styles.dialogCloseButton} onClick={onClose}>
            &times;
          </button>
        </div>
        <div className={styles.dialogBox}>
          {isUpdating && <p className={styles.loadingText}>{t("updating...")}</p>}
          <ul className={styles.ruleList}>
            {allRules?.map((rule) => (
              <li key={rule.id} className={styles.ruleItem}>
                <span>{rule.rule}</span>
                <input
                  type={styles.checkbox}
                  checked={!!ruleStates[rule.id]}
                  onChange={(e) => handleCheckboxChange(rule.id, e.target.checked)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
