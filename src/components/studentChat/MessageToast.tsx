import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '../../context/useNotification';
import { Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const MessageToast: React.FC = () => {
  const { notification, hideNotification } = useNotification();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();
  const isOnBatchChat = location.pathname == '/student/BatchChat';

  useEffect(() => {
    const audio = new Audio('/sound/popsound.mp3');
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (notification && !isOnBatchChat) {
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [notification, isOnBatchChat]);

  if (isOnBatchChat) {
    return null;
  }

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.5 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col space-y-4 max-w-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {notification.img ? (
                <img src={notification.img} alt={notification.name} className="w-12 h-12 rounded-full object-cover border-2 border-blue-500" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <Bell className="text-white" size={24} />
                </div>
              )}
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-gray-900 dark:text-white">{notification.name}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
            </div>
            <button
              onClick={hideNotification}
              className="flex-shrink-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MessageToast;