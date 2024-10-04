import React, { createContext, useState, ReactNode } from 'react';

type Notification = {
  img: string|undefined;
  name: string|undefined;
  message: string;
};

type NotificationContextType = {
  notification: Notification | null;
  showNotification: (notification: Notification) => void;
  hideNotification: () => void;
};

export const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (newNotification: Notification) => {
    setNotification(newNotification);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};