export interface AllRulesInterface {
  id: number;
  rule: string;
}

export interface AdminRuleDialogProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  rules: AdminRuleInterface[] | null;
  allRules: AllRulesInterface[] | null;
  adminId: number;
}

export interface AdminRuleInterface {
  ruleId: number;
  ruleText: string;
}