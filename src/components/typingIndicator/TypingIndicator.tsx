import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TypingIndicator: React.FC<{ typingUsers: string[] }> = ({ typingUsers }) => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: [0, -5, 0] },
  };

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  return (
    <AnimatePresence>
      {typingUsers.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="mb-2 flex justify-start"
        >
          <div className="bg-gray-100 text-gray-700 px-2 py-2 rounded-full shadow-md flex items-center space-x-2">
            <span className="text-sm">
              {typingUsers.length === 1
                ? `${typingUsers[0]} is typing`
                : `${typingUsers.join(', ')} are typing`}
            </span>
            <div className="flex space-x-1">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  variants={dotVariants}
                  animate="animate"
                  transition={{
                    repeat: Infinity,
                    duration: 0.6,
                    delay: index * 0.2,
                  }}
                  className="w-1.5 h-1.5 bg-gray-500 rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TypingIndicator;