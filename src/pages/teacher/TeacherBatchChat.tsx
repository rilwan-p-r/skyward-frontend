import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TeacherSidebar from '../../components/teacher/teacherSidebar/TeacherSidebar';
import { useSocketIO } from '../../hooks/useSocketIO';
import { MessageInterface } from '../../interfaces/messageInterface';
import { RootState } from '../../redux/store/store';
import LoadingAnimation from '../../components/loading/Loading';
import { getBatchesAndCoursesByTeacherId } from '../../api/teacher/fetchBatchesByTeacherId';
import { getStudentsByBatchId } from '../../api/teacher/getStudentsByBatchId';
import { BatchWithCourseInterface } from '../../interfaces/BatchWithCourse';
import { StudentInterface } from '../../interfaces/studentInterface';
import {groupMessagesByDate } from '../../util/dateUtil';
import TypingIndicator from '../../components/typingIndicator/TypingIndicator';
import DeleteConfirmationModal from '../../components/student/DeleteConfirmationModal/DeleteConfirmationModal';
import { JitsiMeeting } from '@jitsi/react-sdk'
import { TeacherInterface } from '../../interfaces/teacherInterface';
import MessageComponent from '../../components/teacherChat/MessageComponent';
import BatchList from '../../components/teacherChat/BatchList';
import ChatHeader from '../../components/teacherChat/ChatHeader';
import MessageInput from '../../components/teacherChat/MessageInput';
import RightSidebar from '../../components/teacherChat/RightSidebar';
import ProfileModal from '../../components/teacherChat/ProfileModal';
import { message } from 'antd';

const TeacherBatchChat: React.FC = () => {
    const teacherInfo = useSelector((state: RootState) => state.teacherInfo.teacherInfo);
    const teacherId = teacherInfo?._id;
    const teacherName = `${teacherInfo?.firstName} ${teacherInfo?.lastName}`;
    const [selectedBatch, setSelectedBatch] = useState<BatchWithCourseInterface | null>(null);
    const [batches, setBatches] = useState<BatchWithCourseInterface[]>([]);
    const [students, setStudents] = useState<StudentInterface[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [batchListOpen, setBatchListOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState<StudentInterface | TeacherInterface | null>(null);
    const {
        messages,
        sendMessage,
        sendTypingStatus,
        deleteMessages,
        typingUsers,
        connectedUsers,
        startVideoCall,
        endVideoCall,
        isVideoCallActive
    } = useSocketIO(selectedBatch?._id || '', 'teacher', teacherId || '', teacherName);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const handleVideoCallToggle = () => {
        if (isVideoCallActive) {
            endVideoCall();
        } else {
            startVideoCall();
        }
    };

    const handleJitsiIFrameRef = (iframeRef: HTMLDivElement) => {
        iframeRef.style.height = '100%';
        iframeRef.style.width = '100%';
    };

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                if (teacherId) {
                    const response = await getBatchesAndCoursesByTeacherId(teacherId);
                    setBatches(response?.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        };
        fetchBatches();
    }, [teacherId]);

    useEffect(() => {
        const fetchStudents = async () => {
            if (selectedBatch) {
                try {
                    const response = await getStudentsByBatchId(selectedBatch._id);
                    setStudents(response.data);
                } catch (error) {
                    console.error('Error fetching students:', error);
                }
            }
        };
        fetchStudents();
    }, [selectedBatch]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = (message: string, images: File[]) => {
        if ((message || images.length > 0) && selectedBatch?._id) {
            sendMessage(message, images);
        }
    };
    const handleTyping = (isTyping: boolean) => {
        sendTypingStatus(isTyping);
    };

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const toggleRightSidebar = () => setRightSidebarOpen(!rightSidebarOpen);
    const toggleBatchList = () => setBatchListOpen(!batchListOpen);
    const groupedMessages = groupMessagesByDate(messages);
    const handleMessageSelection = (messageId: string) => {
        setSelectedMessages(prevSelected => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(messageId)) {
                newSelected.delete(messageId);
            } else {
                newSelected.add(messageId);
            }
            return newSelected;
        });
    };

    const handleDeleteSelected = () => {
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        const teacherMessages = Array.from(selectedMessages).filter(messageId => {
            const message = messages.find(m => m._id === messageId);
            return message && message.teacherId?._id === teacherId;
        });

        if (teacherMessages.length === 0) {
            message.info("You can only delete your own messages.");
            setDeleteModalOpen(false);
            setSelectedMessages(new Set());
            return;
        }

        deleteMessages(teacherMessages);
        setDeleteModalOpen(false);
        setSelectedMessages(new Set());
    };

    const handleDeleteCancel = () => {
        setDeleteModalOpen(false);
    };

    const clearSelection = () => {
        setSelectedMessages(new Set());
    };

    const renderOnlineIndicator = (userId: string) => {
        const isOnline = connectedUsers.includes(userId);
        return (
            <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-300'} absolute bottom-0 right-0 border-2 border-white`}></div>
        );
    };

    const renderMessage = (message: MessageInterface, showImage: boolean) => {
        const isTeacher = message.teacherId?._id === teacherId;
        return (
            <MessageComponent
                key={message._id}
                message={message}
                showImage={showImage}
                isTeacher={isTeacher}
                teacherId={teacherId || ''}
                handleMessageSelection={handleMessageSelection}
                selectedMessages={selectedMessages}
                isMobile={isMobile}
                connectedUsers={connectedUsers}
            />
        );
    };
    return (
        <div className="flex h-screen bg-white text-black">
            <TeacherSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            {/* Batch List Sidebar */}
            <BatchList
                batches={batches}
                selectedBatch={selectedBatch}
                setSelectedBatch={setSelectedBatch}
                batchListOpen={batchListOpen}
                toggleBatchList={toggleBatchList}
                isMobile={isMobile}
            />
            <div className="flex-1 flex flex-col w-full">
                {/* chatheader */}
                <ChatHeader
                    selectedBatch={selectedBatch}
                    selectedMessages={selectedMessages}
                    isVideoCallActive={isVideoCallActive}
                    isMobile={isMobile}
                    toggleSidebar={toggleSidebar}
                    toggleBatchList={toggleBatchList}
                    handleDeleteSelected={handleDeleteSelected}
                    clearSelection={clearSelection}
                    handleVideoCallToggle={handleVideoCallToggle}
                    toggleRightSidebar={toggleRightSidebar}
                />
                <main className="flex-1 overflow-y-auto p-4 bg-white">
                    {isLoading ? (
                        <div className="flex-1 flex items-center justify-center">
                            <LoadingAnimation />
                        </div>
                    ) : !selectedBatch ? (
                        <div className="flex justify-center items-center h-full text-gray-500">
                            {isMobile ? "Tap the user icon to select a batch." : "Please select a batch to start chatting."}
                        </div>
                    ) : isVideoCallActive ? (
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
                                    email: teacherInfo?.email
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
                {/* input */}
                <MessageInput onSendMessage={handleSendMessage} onTyping={handleTyping} />
            </div>
            {/* Right Sidebar for Batch Members */}
            <RightSidebar
            rightSidebarOpen={rightSidebarOpen}
            setRightSidebarOpen={setRightSidebarOpen}
            selectedBatch={selectedBatch}
            students={students}
            teacherInfo={teacherInfo}
            isMobile={isMobile}
            setSelectedProfile={setSelectedProfile}
            renderOnlineIndicator={renderOnlineIndicator}
        />
            {/* Profile Modal */}
            <ProfileModal
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
            renderOnlineIndicator={renderOnlineIndicator}
        />
        {/* deleteside */}
            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                messageCount={selectedMessages.size}
            />
        </div>
    );
};

export default TeacherBatchChat;