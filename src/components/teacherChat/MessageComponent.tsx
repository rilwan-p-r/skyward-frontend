import React from 'react';
import { motion } from 'framer-motion';
import { MessageInterface } from '../../interfaces/messageInterface';
import FilePreview from '../FilePreview/FilePreview';
import { formatMessageTime } from '../../util/dateUtil';

interface MessageProps {
    message: MessageInterface;
    showImage: boolean;
    isTeacher: boolean;
    teacherId: string;
    handleMessageSelection: (messageId: string) => void;
    selectedMessages: Set<string>;
    isMobile: boolean;
    connectedUsers: string[];
}

const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const MessageComponent: React.FC<MessageProps> = ({
    message,
    showImage,
    isTeacher,
    teacherId,
    handleMessageSelection,
    selectedMessages,
    isMobile,
    connectedUsers
}) => {
    const sender = message.studentId || message.teacherId;

    const renderOnlineIndicator = (userId: string) => {
        const isOnline = connectedUsers.includes(userId);
        return (
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-300'} absolute bottom-0 right-0 border-2 border-white`}></div>
        );
    };

    return (
        <motion.div
            key={message._id}
            variants={messageVariants}
            initial="hidden"
            animate="visible"
            className={`flex items-start space-x-3 ${isTeacher ? 'flex-row-reverse space-x-reverse' : ''}`}
            onContextMenu={(e) => {
                e.preventDefault();
                if (message.teacherId?._id === teacherId) {
                    handleMessageSelection(message._id);
                }
            }}
            onTouchStart={() => {
                if (isMobile && message.teacherId?._id === teacherId) {
                    const timer = setTimeout(() => {
                        handleMessageSelection(message._id);
                    }, 1000);
                    return () => clearTimeout(timer);
                }
            }}
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
                className={`p-3 rounded-lg max-w-xs md:max-w-md lg:max-w-lg shadow-md ${isTeacher ? 'bg-blue-200 text-black' : 'bg-gray-100 text-black'}
                    ${selectedMessages.has(message._id) ? 'border-2 border-blue-500' : ''}`}
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

export default MessageComponent;