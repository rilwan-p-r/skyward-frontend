import React from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaUsers, FaUserFriends, FaTimes, FaTrash, FaVideo } from 'react-icons/fa';
import { BatchWithCourseInterface } from '../../interfaces/BatchWithCourse';

interface ChatHeaderProps {
    selectedBatch: BatchWithCourseInterface | null;
    selectedMessages: Set<string>;
    isVideoCallActive: boolean;
    isMobile: boolean;
    toggleSidebar: () => void;
    toggleBatchList: () => void;
    handleDeleteSelected: () => void;
    clearSelection: () => void;
    handleVideoCallToggle: () => void;
    toggleRightSidebar: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
    selectedBatch,
    selectedMessages,
    isVideoCallActive,
    isMobile,
    toggleSidebar,
    toggleBatchList,
    handleDeleteSelected,
    clearSelection,
    handleVideoCallToggle,
    toggleRightSidebar
}) => {
    return (
        <header className="bg-gray-100 p-3 flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleSidebar}
                        className="text-black md:hidden mr-4"
                    >
                        <FaBars className="w-6 h-6" />
                    </motion.button>
                    {isMobile && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleBatchList}
                            className="text-black mr-4"
                        >
                            <FaUsers className="w-6 h-6" />
                        </motion.button>
                    )}
                    <motion.h1
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="text-xl md:text-2xl font-bold text-black truncate"
                    >
                        {selectedBatch ? `${selectedBatch.course.course} - ${selectedBatch.batch}` : 'Select a Batch'}
                    </motion.h1>
                </div>
                {selectedMessages.size > 0 ? (
                    <div className="flex items-center space-x-4">
                        <span>{selectedMessages.size} selected</span>
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
                ) : selectedBatch && (
                    <div className="flex items-center space-x-4">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleVideoCallToggle}
                            className={`text-black ${isVideoCallActive ? 'text-green-500' : ''}`}
                        >
                            <FaVideo className="w-6 h-6" />
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleRightSidebar}
                            className="text-black"
                        >
                            <FaUserFriends className="w-6 h-6" />
                        </motion.button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default ChatHeader;