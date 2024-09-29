import React from 'react';
import { motion } from 'framer-motion';
import { MessageInterface } from '../../interfaces/messageInterface';
import FilePreview from '../../components/FilePreview/FilePreview';
import { formatMessageTime } from '../../util/dateUtil';

interface MessageItemProps {
  message: MessageInterface;
  showImage: boolean;
  currentUserId: string;
  onMessageSelect: (messageId: string) => void;
  isSelected: boolean;
  isMobile: boolean;
  connectedUsers: string[];
}

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  showImage,
  currentUserId,
  onMessageSelect,
  isSelected,
  isMobile,
  connectedUsers
}) => {
  const sender = message.studentId || message.teacherId;
  const isCurrentUser = (message.studentId && message.studentId._id === currentUserId) ||
    (message.teacherId && message.teacherId._id === currentUserId);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isCurrentUser) {
      onMessageSelect(message._id);
    }
  };

  const handleTouchStart = () => {
    if (isMobile && isCurrentUser) {
      const timer = setTimeout(() => {
        onMessageSelect(message._id);
      }, 1000);
      return () => clearTimeout(timer);
    }
  };

  const renderOnlineIndicator = (userId: string) => {
    const isOnline = connectedUsers.includes(userId);
    return (
      <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-300'} absolute bottom-0 right-0 border-2 border-white`}></div>
    );
  };

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      className={`flex items-start space-x-3 ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}
      onContextMenu={handleContextMenu}
      onTouchStart={handleTouchStart}
    >
      {showImage && sender && (
        <div className="relative">
          <img
            src={sender.imageUrl}
            alt={`${sender.firstName} ${sender.lastName}`}
            className="w-10 h-10 rounded-full"
          />
          {renderOnlineIndicator(sender._id)}
        </div>
      )}
      {!showImage && <div className="w-10" />}
      <div
        className={`p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg shadow-md ${isCurrentUser ? 'bg-blue-200 text-black' : 'bg-gray-100 text-black'}
          ${isSelected ? 'border-2 border-blue-500' : ''}`}
      >
        {sender && showImage && (
          <p className="font-bold text-sm mb-1">{`${sender.firstName} ${sender.lastName}`}</p>
        )}
        {message.text && <p>{message.text}</p>}
        {message.fileUrls && message.fileUrls.length > 0 && (
          <div className="mt-2">
            {message.fileUrls.map((url: string, index: number) => (
              <FilePreview key={index} url={url} />
            ))}
          </div>
        )}
        <p className="text-xs text-gray-500 mt-1">
          {formatMessageTime(new Date(message.createdAt))}
        </p>
      </div>
    </motion.div>
  );
};

export default MessageItem;