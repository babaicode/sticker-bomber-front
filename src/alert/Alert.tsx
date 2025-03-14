import React, { useEffect, useState } from "react";
import styles from "./styles/Alert.module.css";
import { useAlert } from "./AlertContext";

const Alert: React.FC = () => {
  const { alerts, removeAlert } = useAlert();
  const [currentAlert, setCurrentAlert] = useState<number | null>(null);

  useEffect(() => {
    if (alerts.length > 0 && currentAlert === null) {
      setCurrentAlert(0);
    }

    if (currentAlert !== null) {
      const timer = setTimeout(() => {
        removeAlert(currentAlert);
        setCurrentAlert((prev) => (prev !== null && prev < alerts.length - 1 ? prev + 1 : null));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [alerts, currentAlert, removeAlert]);

  return (
    <div className={styles.alertContainer}>
      {currentAlert !== null && alerts[currentAlert] && (
        <div className={`alert alert-${alerts[currentAlert].type}`}>
          <span>{alerts[currentAlert].message}</span>
          <button className={styles.closeButton} onClick={() => removeAlert(currentAlert)}>
            &times;
          </button>
        </div>
      )}
    </div>
  );
};

export default Alert;
