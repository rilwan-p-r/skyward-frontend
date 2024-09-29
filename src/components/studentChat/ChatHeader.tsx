import React from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaUsers, FaTrash, FaTimes, } from 'react-icons/fa';

interface ChatHeaderProps {
  toggleSidebar: () => void;
  toggleRightSidebar: () => void;
  selectedMessagesSize: number;
  handleDeleteSelected: () => void;
  clearSelection: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  toggleSidebar,
  toggleRightSidebar,
  selectedMessagesSize,
  handleDeleteSelected,
  clearSelection,
}) => {
  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSidebar}
        className="text-black md:hidden"
      >
        <FaBars className="w-6 h-6" />
      </motion.button>
      <h1 className="text-2xl font-bold text-black">Batch Chat</h1>
      {selectedMessagesSize > 0 ? (
        <div className="flex items-center space-x-4">
          <span>{selectedMessagesSize} selected</span>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleDeleteSelected}
            className="text-red-500"
          >
            <FaTrash className="w-6 h-6" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={clearSelection}
            className="text-gray-500"
          >
            <FaTimes className="w-6 h-6" />
          </motion.button>
        </div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleRightSidebar}
          className="text-black"
        >
          <FaUsers className="w-6 h-6" />
        </motion.button>
      )}
        
    </header>
  );
};

export default ChatHeader;