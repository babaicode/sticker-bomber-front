import React, { createContext, useContext, useState } from 'react';

type AlertType = 'success' | 'warning' | 'error';

interface Alert {
  type: AlertType;
  message: string;
}

interface AlertContextType {
  showAlert: (message: string, type: AlertType) => void;
  alerts: Alert[];
  removeAlert: (index: number) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }

  return context;
};

export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = (message: string, type: AlertType) => {
    setAlerts((prevAlerts) => [...prevAlerts, { message, type }]);

    // Remove alert after 3 seconds
    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.slice(1));
    }, 1000);
  };

  const removeAlert = (index: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((_, i) => i !== index));
  };

  return (
    <AlertContext.Provider value={{ showAlert, alerts, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};
