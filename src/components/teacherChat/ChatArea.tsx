import React, { useRef, useEffect } from 'react';
import { motion, } from 'framer-motion';
import { FaTrash, FaTimes, FaVideo } from 'react-icons/fa';
import { MessageInterface } from '../../interfaces/messageInterface';
import { formatMessageTime, groupMessagesByDate } from '../../util/dateUtil';
import TypingIndicator from '../typingIndicator/TypingIndicator';
import FilePreview from '../FilePreview/FilePreview';
import { JitsiMeeting } from '@jitsi/react-sdk';

interface ChatAreaProps {
    selectedBatch: any;
    messages: MessageInterface[];
    typingUsers: string[];
    selectedMessages: Set<string>;
    isVideoCallActive: boolean;
    teacherId: string;
    teacherName: string;
    teacherEmail: string;
    handleMessageSelection: (messageId: string) => void;
    handleDeleteSelected: () => void;
    clearSelection: () => void;
    handleVideoCallToggle: () => void;
    connectedUsers: string[];
}

const ChatArea: React.FC<ChatAreaProps> = ({
    selectedBatch,
    messages,
    typingUsers,
    selectedMessages,
    isVideoCallActive,
    teacherId,
    teacherName,
    teacherEmail,
    handleMessageSelection,
    handleDeleteSelected,
    clearSelection,
    handleVideoCallToggle,
    connectedUsers
}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const messageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
    };

    const groupedMessages = groupMessagesByDate(messages);

    const renderOnlineIndicator = (userId: string) => {
        const isOnline = connectedUsers.includes(userId);
        return (
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-300'} absolute bottom-0 right-0 border-2 border-white`}></div>
        );
    };

    const renderMessage = (message: MessageInterface, showImage: boolean) => {
        const sender = message.studentId || message.teacherId;
        const isTeacher = message.teacherId && message.teacherId._id === teacherId;

        return (
            <motion.div
                key={message._id}
                variants={messageVariants}
                initial="hidden"
                animate="visible"
                className={`flex items-start space-x-3 ${isTeacher ? 'flex-row-reverse space-x-reverse' : ''}`}
                onContextMenu={(e) => {
                    e.preventDefault();
                    if (isTeacher) {
                        handleMessageSelection(message._id);
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

    const handleJitsiIFrameRef = (iframeRef: HTMLDivElement) => {
        iframeRef.style.height = '100%';
        iframeRef.style.width = '100%';
    };

    return (
        <main className="flex-1 overflow-y-auto p-4 bg-white">
            <header className="bg-gray-100 p-3 flex justify-between items-center mb-4">
                <h1 className="text-xl md:text-2xl font-bold text-black truncate">
                    {selectedBatch ? `${selectedBatch.course.course} - ${selectedBatch.batch}` : 'Select a Batch'}
                </h1>
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
                ) : (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleVideoCallToggle}
                        className={`text-black ${isVideoCallActive ? 'text-green-500' : ''}`}
                    >
                        <FaVideo className="w-6 h-6" />
                    </motion.button>
                )}
            </header>

            {isVideoCallActive ? (
                <div className="h-full">
                    <JitsiMeeting
                        domain="meet.jit.si"
                        roomName={`TeacherBatchMeeting-${selectedBatch._id}`}
                        configOverwrite={{
                            startWithAudioMuted: false,
                            disableModeratorIndicator: true,
                            startScreenSharing: true,
                            enableEmailInStats: false
                        }}
                        interfaceConfigOverwrite={{
                            TOOLBAR_BUTTONS: [
                                'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                                'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
                                'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                                'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                                'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
                                'security'
                            ],
                        }}
                        userInfo={{
                            displayName: teacherName,
                            email: teacherEmail
                        }}
                        getIFrameRef={handleJitsiIFrameRef}
                    />
                </div>
            ) : (
                <div className="space-y-8">
                    {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                        <div key={date} className="space-y-4">
                            <div className="text-center my-4">
                                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                                    {date}
                                </span>
                            </div>
                            {dateMessages.map((message: MessageInterface, index: number) => {
                                const showImage = index === 0 ||
                                    (dateMessages[index - 1].studentId?._id || dateMessages[index - 1].teacherId?._id) !==
                                    (message.studentId?._id || message.teacherId?._id);
                                return renderMessage(message, showImage);
                            })}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                    <div className="sticky bottom-0 left-0 w-full pb-4">
                        <TypingIndicator typingUsers={typingUsers} />
                    </div>
                </div>
            )}
        </main>
    );
};

export default ChatArea;