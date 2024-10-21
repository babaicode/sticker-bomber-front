import { FC, useEffect, useState } from "react";
import '../../styles/AdminRuleDialog.css'; 
import { AdminRuleDialogProps, AdminRuleInterface, AllRulesInterface } from "@/streamer/interfaces/RulesInterface";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Типы для drag-and-drop
const ItemTypes = {
  RULE: 'rule',
};

// Компонент для перетаскиваемого элемента правила
const DraggableRule: FC<{ rule: AdminRuleInterface | AllRulesInterface, type: string, onDrop: (rule: AdminRuleInterface | AllRulesInterface) => void }> = ({ rule, type, onDrop }) => {
  const [, drag] = useDrag({
    type: ItemTypes.RULE,
    item: { rule, type },
  });

  const [, drop] = useDrop({
    accept: ItemTypes.RULE,
    drop: (item: { rule: AdminRuleInterface | AllRulesInterface, type: string }) => {
      if (item.type !== type) {
        onDrop(item.rule);
      }
    },
  });

  return (
    <li ref={(node) => drag(drop(node))}>
      {('ruleText' in rule ? rule.ruleText : rule.rule) as string} {/* Приведение к строке */}
    </li>
  );
};

export const AdminRuleDialog: FC<AdminRuleDialogProps> = ({ visible, onClose, title, rules, allRules }) => {
  const [adminRules, setAdminRules] = useState<AdminRuleInterface[]>([]);
  const [allRuleList, setAllRuleList] = useState<AllRulesInterface[]>([]);

  const dragRule = async (rule: AdminRuleInterface | AllRulesInterface) => {
    // Если это AdminRuleInterface, переносим правило из одного списка в другой
    if ('adminId' in rule) {
      setAdminRules((prevRules) => prevRules.filter((r) => r.id !== rule.id));
      setAllRuleList((prevRules) => [...prevRules, { id: rule.id, rule: rule.rule, isActive: false }]);
    } else if ('isActive' in rule) {
      setAllRuleList((prevRules) => prevRules.filter((r) => r.id !== rule.id));
      setAdminRules((prevRules) => [...prevRules, { id: rule.id, adminId: 1, ruleId: rule.id, rule: rule.rule }]);  // Пример adminId и ruleId
    }
  };

  useEffect(() => {
    // Проверяем, что правила пришли и только тогда обновляем состояние
    if (rules) {
      setAdminRules(rules);
    }
  
    if (allRules) {
      setAllRuleList(allRules);
    }
  
    // Фильтруем правила и обновляем состояния
    const updatedAllRules = allRules?.filter((rule) => !rules?.some((adminRule) => adminRule.ruleId === rule.id)) || [];
  
    // Устанавливаем новые состояния
    setAllRuleList(updatedAllRules);
    
    // Обновление происходит только при изменении исходных данных: rules или allRules
  }, [rules, allRules]);
  

  if (!visible) return null;

  return (
    <DndProvider backend={HTML5Backend}>
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
                {adminRules?.map((rule) => (
                  <DraggableRule
                    key={`admin-${rule.id}`}  // Уникальный ключ с префиксом для admin rules
                    rule={rule}
                    type="admin"
                    onDrop={dragRule}  // Передаем логику перетаскивания
                  />
                ))}
              </ul>
            </div>
            <div>
              <h4>All Rules</h4>
              <ul>
                {allRuleList?.map((rule) => (
                  <DraggableRule
                    key={`all-${rule.id}`}  // Уникальный ключ с префиксом для all rules
                    rule={rule}
                    type="all"
                    onDrop={dragRule}  // Передаем логику перетаскивания
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};
