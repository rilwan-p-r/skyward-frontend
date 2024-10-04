import React, { createContext, useEffect} from 'react';
import { useSocketIO } from '../hooks/useSocketIO';
import { SocketContextType } from '../interfaces/SocketContextType';
import { useNotification } from './useNotification';
import { useLocation } from 'react-router-dom';
import { MessageInterface } from '../interfaces/messageInterface';



interface SocketProviderProps {
    children: React.ReactNode;
    batchId: string;
    role: 'student' | 'teacher';
    userId: string;
    userName: string;
}

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children, batchId, role, userId, userName }) => {
  const socketData = useSocketIO(batchId, role, userId, userName);
  const { showNotification } = useNotification();
  const location = useLocation();

  useEffect(() => {
    const handleNewMessage = (message: MessageInterface) => {
      if (location.pathname !== '/BatchChat' && message.studentId?._id !== userId) {
        const senderImage = message?.studentId?.imageUrl || message?.teacherId?.imageUrl 
        const senderName = message?.studentId?.firstName || message?.teacherId?.lastName
        showNotification({
          img: senderImage ,
          name: senderName,
          message: message.text
        });
      }
    };

    socketData.socket?.on('message', handleNewMessage);

    return () => {
      socketData.socket?.off('message', handleNewMessage);
    };
  }, [socketData.socket, location.pathname, userId, showNotification]);

  return (
    <SocketContext.Provider value={socketData}>
      {children}
    </SocketContext.Provider>
  );
};
