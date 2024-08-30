import React from 'react';
import './styles/Alert.css';
import { useAlert } from './AlertContext';

const Alert: React.FC = () => {
  const { alerts, removeAlert } = useAlert();

  return (
    <div className="alert-container">
      {alerts.map((alert, index) => (
        <div key={index} className={`alert alert-${alert.type}`}>
          <span>{alert.message}</span>
          <button className="close-btn" onClick={() => removeAlert(index)}>
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default Alert;
