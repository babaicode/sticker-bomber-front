import { FC, useEffect, useState } from "react";
import '../styles/AdminRuleDialog.css'; 
import { AdminRuleDialogProps } from "../interfaces/RulesInterface";
import axios from "axios";
import { Environment } from '@/environment';

export const AdminRuleDialog: FC<AdminRuleDialogProps> = ({ visible, onClose, title, rules, allRules, adminId }) => {
  const [ruleStates, setRuleStates] = useState<{ [key: number]: boolean }>({});
  const API_URL = Environment.StickerBomberBackApiURL;

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

    try {
      if (checked) {
        await axios.post(`${API_URL}/admin-ruls/${adminId}/${ruleId}`);
      } else {
        await axios.delete(`${API_URL}/admin-ruls/${adminId}/${ruleId}`);
      }
    } catch (error) {
      console.error("Error updating rule:", error);
    }
  };

  if (!visible) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-container">
        <div className="dialog-header">
          <h3>{title}</h3>
          <button className="dialog-close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="dialog-box">
          <div>
            <ul>
              {allRules?.map((rule) => (
                <li key={rule.id}>
                  {rule.rule}
                  <input
                    type="checkbox"
                    checked={!!ruleStates[rule.id]}
                    onChange={(e) => handleCheckboxChange(rule.id, e.target.checked)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
