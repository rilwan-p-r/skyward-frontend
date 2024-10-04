import { useState, useEffect, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import { MessageInterface } from '../interfaces/messageInterface';
import { BatchInterface } from '../interfaces/BatchInterface';

const SOCKET_SERVER_URL = import.meta.env.VITE_SOCKET_SERVER_URL;

export const useSocketIO = (batchId: string, role: 'student' | 'teacher', userId: string, userName: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [batchDetails, setBatchDetails] = useState<BatchInterface | null>(null);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [isVideoCallActive, setIsVideoCallActive] = useState<boolean>(false);
  const [videoCallInitiator, setVideoCallInitiator] = useState<string | null>(null);
  const [jitsiLink, setJitsiLink] = useState<string | null>(null);



  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL, {
      query: { batchId, role, userId }
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to socket server');
      newSocket.emit('joinBatchChat', { batchId, userId });
    });

    newSocket.on('batchDetails', (details: BatchInterface) => {
      setBatchDetails(details);
    });

    newSocket.on('messageHistory', (historyMessages: MessageInterface[]) => {
      console.log('Received message history:', historyMessages);
      setMessages(historyMessages);
    });

    newSocket.on('message', (message: MessageInterface) => {
      console.log('Received new message:', message);
      setMessages(prevMessages => [...prevMessages, message]);
    });

    newSocket.on('typingUsers', (users: string[]) => {
      console.log('Typing users updated:', users);
      setTypingUsers(users.filter(user => user !== userName));
    });

    newSocket.on('error', (error: unknown) => {
      console.error('Socket error:', error);
    });

    newSocket.on('messagesDeleted', (deletedMessageIds: string[]) => {
      setMessages(prevMessages => prevMessages.filter(message => !deletedMessageIds.includes(message._id)));
    });

    newSocket.on('connectedUsers', (users: string[]) => {
      console.log('Connected users updated:', users);
      setConnectedUsers(users);
    });

    newSocket.on('disconnect', () => {
      console.log('Client disconnected from server');
    });

    newSocket.on('videoCallStarted', ({ initiatorName, jitsiLink }) => {
      console.log('Video call started:', initiatorName, jitsiLink);
      setIsVideoCallActive(true);
      setVideoCallInitiator(initiatorName);
      setJitsiLink(jitsiLink);
    });

    newSocket.on('videoCallEnded', () => {
      setIsVideoCallActive(false);
      setVideoCallInitiator(null);
      setJitsiLink(null);
    });

    newSocket.on('videoCallStatus', ({ isActive, initiatorName, jitsiLink }) => {
      console.log('Received video call status:', isActive, initiatorName, jitsiLink);
      setIsVideoCallActive(isActive);
      setVideoCallInitiator(initiatorName);
      setJitsiLink(jitsiLink);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [batchId, role, userId, userName]);

  const sendMessage = useCallback((text: string | null, images: File[]) => {
    if (socket) {
      const formDataObject: { text?: string | null; files?: File[]; batchId: string; role: string; userId: string } = {
        batchId,
        role,
        userId,
      };

      if (text) {
        formDataObject.text = text;
      }

      if (images.length > 0) {
        formDataObject.files = images;
      }

      socket.emit('sendMessageWithFiles', formDataObject);
    }
  }, [socket, batchId, role, userId]);

  const sendTypingStatus = useCallback((isTyping: boolean) => {
    if (socket) {
      socket.emit('typingStatus', { batchId, userId, userName, isTyping });
    }
  }, [socket, batchId, userId, userName]);

  const deleteMessages = useCallback((messageIds: string[]) => {
    if (socket) {
      socket.emit('deleteMessages', { messageIds, batchId, userId, role });
    }
  }, [socket, batchId, userId, role]);

  const startVideoCall = useCallback(() => {
    if (socket && role === 'teacher') {
      socket.emit('startVideoCall', { batchId, initiatorId: userId, initiatorName: userName });
    }
  }, [socket, batchId, userId, userName, role]);

  const endVideoCall = useCallback(() => {
    if (socket && role === 'teacher') {
      socket.emit('endVideoCall', { batchId });
    }
  }, [socket, batchId, role]);

  return { 
    socket, 
    messages, 
    batchDetails, 
    sendMessage, 
    sendTypingStatus, 
    deleteMessages, 
    typingUsers, 
    connectedUsers, 
    startVideoCall, 
    endVideoCall,
    jitsiLink, 
    isVideoCallActive, 
    videoCallInitiator,
  };
};