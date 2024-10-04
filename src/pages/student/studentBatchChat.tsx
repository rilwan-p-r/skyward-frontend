import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { motion, } from 'framer-motion';
import {FaTimesCircle, FaVideo } from 'react-icons/fa';
import StudentSidebar from '../../components/student/studentSidebar/StudentSidebar';
import { StudentInterface } from '../../interfaces/studentInterface';
import { MessageInterface } from '../../interfaces/messageInterface';
import { RootState } from '../../redux/store/store';
import LoadingAnimation from '../../components/loading/Loading';
import { getBatchAndCourseByBatchId } from '../../api/student/getBatchAndCourseByBatchId';
import { BatchInterface } from '../../interfaces/BatchInterface';
import { getStudentsByBatchId } from '../../api/student/getStudentsByBatchId';
import { groupMessagesByDate } from '../../util/dateUtil';
import TypingIndicator from '../../components/typingIndicator/TypingIndicator';
import DeleteConfirmationModal from '../../components/student/DeleteConfirmationModal/DeleteConfirmationModal';
import { RightSidebar } from '../../components/studentChat/RightSidebar';
import ChatHeader from '../../components/studentChat/ChatHeader';
import SendMessageForm from '../../components/studentChat/SendMessageForm';
import MessageItem from '../../components/studentChat/MessageItem';
import { useSocket } from '../../context/useSocket';
declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

const StudentBatchChat: React.FC = () => {
  const studentInfo = useSelector((state: RootState) => state.studentInfo.studentInfo);
  const studentId = studentInfo?._id;
  const batchId = studentInfo?.batchId;
  const studentName = `${studentInfo?.firstName} ${studentInfo?.lastName}`;
  const {
    messages,
    batchDetails,
    sendMessage,
    sendTypingStatus,
    deleteMessages,
    typingUsers,
    connectedUsers,
    isVideoCallActive,
    videoCallInitiator,
    jitsiLink
  } = useSocket();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<StudentInterface[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [batchAndCourseDetails, setBatchAndCourseDetails] = useState<BatchInterface | null>(null);
  const [isDataReady, setIsDataReady] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<Set<string>>(new Set());
  const [isInCall, setIsInCall] = useState(false);
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<any>(null);

  useEffect(() => {
    console.log('Video call status changed:', isVideoCallActive, videoCallInitiator, jitsiLink);
    if (!isVideoCallActive && isInCall) {
      setIsInCall(false);
    }
  }, [isVideoCallActive, videoCallInitiator, jitsiLink, isInCall]);

  const initJitsi = useCallback(() => {
    if (typeof window !== 'undefined' && window.JitsiMeetExternalAPI && jitsiContainerRef.current && jitsiLink) {
      const domain = 'meet.jit.si';
      const options = {
        roomName: jitsiLink.split('/').pop(),
        width: '100%',
        height: '100%',
        parentNode: jitsiContainerRef.current,
        userInfo: {
          displayName: studentName
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'profile', 'chat', 'recording',
            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
            'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
            'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
            'security'
          ],
        },
      };

      jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);
    }
  }, [jitsiLink, studentName]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = initJitsi;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [initJitsi]);

  useEffect(() => {
    if (isVideoCallActive && isInCall) {
      initJitsi();
    }
  }, [isVideoCallActive, isInCall, initJitsi]);



  const handleJoinVideoCall = () => {
    setIsInCall(true);
  };

  const handleLeaveVideoCall = () => {
    setIsInCall(false);
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand('hangup');
      jitsiApiRef.current.dispose();
      jitsiApiRef.current = null;
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (batchDetails !== null && studentInfo) {
      setIsLoading(false);
      setIsDataReady(true);
    }
  }, [batchDetails, studentInfo]);


  useEffect(() => {
    const fetchStudents = async () => {
      try {
        if (batchId) {
          const response = await getStudentsByBatchId(batchId);
          setStudents(response.data);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, [batchId]);

  useEffect(() => {
    const fetchBatchAndCourse = async () => {
      try {
        if (batchId) {
          const response = await getBatchAndCourseByBatchId(batchId);
          setBatchAndCourseDetails(response?.data);
        }
      } catch (error) {
        console.error('Error fetching batch and course details:', error);
      }
    };
    fetchBatchAndCourse();
  }, [batchId]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    const userMessages = Array.from(selectedMessages).filter(messageId => {
      const message = messages.find(m => m._id === messageId);
      return message && (message.studentId?._id === studentId || message.teacherId?._id === studentId);
    });

    if (userMessages.length === 0) {
      alert("You can only delete your own messages.");
      setDeleteModalOpen(false);
      setSelectedMessages(new Set());
      return;
    }

    deleteMessages(userMessages);
    setDeleteModalOpen(false);
    setSelectedMessages(new Set());
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  const clearSelection = () => {
    setSelectedMessages(new Set());
  };

  const handleSendMessage = (message: string, images: File[]) => {
    if (message.trim() || images.length > 0) {
      sendMessage(message.trim(), images);
      sendTypingStatus(false);
    }
  };



  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleRightSidebar = () => setRightSidebarOpen(!rightSidebarOpen);

  if (!isDataReady) {
    return <LoadingAnimation />;
  }

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="flex h-screen bg-white text-black">
      <StudentSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col w-full">
        <ChatHeader
          toggleSidebar={toggleSidebar}
          toggleRightSidebar={toggleRightSidebar}
          selectedMessagesSize={selectedMessages.size}
          handleDeleteSelected={handleDeleteSelected}
          clearSelection={clearSelection}
        />

        <main className="flex-1 overflow-hidden bg-white flex flex-col">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <LoadingAnimation />
            </div>
          ) : (
            <>
              {isVideoCallActive && !isInCall && (
                <div className="bg-yellow-100 p-4 mb-4">
                  <p className="text-yellow-800">
                    {videoCallInitiator} has started a video call.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleJoinVideoCall}
                    className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center mt-2"
                  >
                    <FaVideo className="mr-2" />
                    Join Video Call
                  </motion.button>
                </div>
              )}
              
              {isInCall && (
                <div className="relative w-full h-full flex-grow">
                  <div ref={jitsiContainerRef} className="w-full h-full"></div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLeaveVideoCall}
                    className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-md flex items-center"
                  >
                    <FaTimesCircle className="mr-2" />
                    Leave Call
                  </motion.button>
                </div>
              )}

              <div className={`flex-1 overflow-y-auto ${isInCall ? 'h-1/3' : ''}`}>
                {Object.keys(groupedMessages).length === 0 ? (
                  <div className="flex justify-center items-center h-full text-gray-500">
                    No messages yet. Start the conversation!
                  </div>
                ) : (
                  <div className="max-w-full mx-auto space-y-8 p-4">
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
                          return (
                            <MessageItem
                              key={message._id}
                              message={message}
                              showImage={showImage}
                              currentUserId={studentId}
                              onMessageSelect={handleMessageSelection}
                              isSelected={selectedMessages.has(message._id)}
                              isMobile={isMobile}
                              connectedUsers={connectedUsers}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
                <div ref={messagesEndRef} />
                <div className="sticky bottom-0 left-0 w-full pb-4">
                  <TypingIndicator typingUsers={typingUsers} />
                </div>
              </div>
            </>
          )}
        </main>

        <SendMessageForm
          onSendMessage={handleSendMessage}
          onTypingStatus={sendTypingStatus}
        />
      </div>

      <RightSidebar
        isOpen={rightSidebarOpen}
        onClose={() => setRightSidebarOpen(false)}
        batchAndCourseDetails={batchAndCourseDetails}
        students={students}
        connectedUsers={connectedUsers}
        isMobile={isMobile}
      />

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        messageCount={selectedMessages.size}
      />
    </div>
  );
};
export default StudentBatchChat;