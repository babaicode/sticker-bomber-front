import React from 'react';
import styles from './styles/Alert.module.css';
import { useAlert } from './AlertContext';

const Alert: React.FC = () => {
  const { alerts, removeAlert } = useAlert();

  return (
    <div className={styles.alertContainer}>
      {alerts.map((alert, index) => (
        <div key={index} className={`alert alert-${alert.type}`}>
          <span>{alert.message}</span>
          <button className={styles.closeButton} onClick={() => removeAlert(index)}>
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default Alert;
