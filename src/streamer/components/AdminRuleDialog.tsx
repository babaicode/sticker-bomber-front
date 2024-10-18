import { FC } from "react";
import '../styles/AdminRuleDialog.css'; 
import { AdminRuleDialogProps } from "../interfaces/RulesInterface";

export const AdminRuleDialog: FC<AdminRuleDialogProps> = ({ visible, onClose, title, rules, allRules }) => {
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
            <h4>Admin Rules</h4>
            <ul>
              {rules?.map((rule) => (
                <li key={rule.id}>{rule.ruleText}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>All Rules</h4>
            <ul>
              {allRules?.map((rule) => (
                <li key={rule.id}>{rule.rule}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
