export interface AdminRuleDialogProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  rules: AdminRuleInterface[] | null;
  allRules: AllRulesInterface[] | null;
}

export interface AdminRuleInterface {
  id: number;
  adminId: number;
  ruleId: number;
  rule: string;
}

export interface AllRulesInterface {
  id: number;
  rule: string;
  isActive: boolean;
}