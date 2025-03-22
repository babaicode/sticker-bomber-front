import React, { useEffect, useState } from "react";
import styles from "./styles/Alert.module.css";
import { useAlert } from "./AlertContext";
import clsx from "clsx";

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
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alerts, currentAlert, removeAlert]);

  return (
    <div className={styles.alertContainer}>
      {currentAlert !== null && alerts[currentAlert] && (
        <div className={clsx(styles.alert, styles[`alert-${alerts[currentAlert].type}`])}>
          <div className={styles.alertMessageBox}>
            <span className={styles.alertMessage}>{alerts[currentAlert].message}</span>
            <button className={styles.closeButton} onClick={() => removeAlert(currentAlert)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alert;
