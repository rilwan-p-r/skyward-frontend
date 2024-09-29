import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { StudentInterface } from '../../interfaces/studentInterface';
import { TeacherInterface } from '../../interfaces/teacherInterface';
import { BatchInterface } from '../../interfaces/BatchInterface';

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  batchAndCourseDetails: BatchInterface | null;
  students: StudentInterface[];
  connectedUsers: string[];
  isMobile: boolean;
}

const profileVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 20 }
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
    transition: { type: 'spring', stiffness: 400, damping: 10 }
  }
};

const renderOnlineIndicator = (userId: string, connectedUsers: string[]) => {
  const isOnline = connectedUsers.includes(userId);
  return (
    <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-300'} absolute bottom-0 right-0 border-2 border-white`}></div>
  );
};

export const RightSidebar: React.FC<RightSidebarProps> = ({ 
  isOpen, 
  onClose, 
  batchAndCourseDetails, 
  students, 
  connectedUsers,
  isMobile 
}) => {
  const [selectedProfile, setSelectedProfile] = useState<StudentInterface | TeacherInterface | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={`fixed inset-y-0 right-0 ${isMobile ? 'w-full' : 'w-80'} bg-gray-100 text-black p-6 shadow-lg z-20 overflow-y-auto`}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 text-black"
          >
            <FaTimes className="w-6 h-6" />
          </motion.button>
          <h2 className="text-2xl font-bold mb-6 text-black">Batch Details</h2>
          {batchAndCourseDetails && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Course Information</h3>
              <p><strong>Course:</strong> {batchAndCourseDetails.courseId.course}</p>
              <p><strong>Batch:</strong> {batchAndCourseDetails.batch}</p>
              <p><strong>Division:</strong> {batchAndCourseDetails.division}</p>
              <p><strong>No. of students:</strong> {students.length}</p>
            </div>
          )}
          <h3 className="text-lg font-semibold mb-2">Teacher</h3>
          {batchAndCourseDetails && batchAndCourseDetails.teacherId && (
            <motion.div
              variants={profileVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer overflow-hidden relative"
              onClick={() => setSelectedProfile(batchAndCourseDetails.teacherId)}
            >
              <motion.img
                src={batchAndCourseDetails.teacherId.imageUrl}
                alt={`${batchAndCourseDetails.teacherId.firstName} ${batchAndCourseDetails.teacherId.lastName}`}
                className="w-16 h-16 rounded-full mb-2 mx-auto border-2 border-gray-300 object-cover"
                whileHover={{ scale: 1.1 }}
              />
              {renderOnlineIndicator(batchAndCourseDetails.teacherId._id, connectedUsers)}
              <p className="font-semibold text-center">{`${batchAndCourseDetails.teacherId.firstName} ${batchAndCourseDetails.teacherId.lastName}`}</p>
              <p className="text-sm text-gray-600 text-center">{batchAndCourseDetails.teacherId.subject}</p>
            </motion.div>
          )}
          <h3 className="text-lg font-semibold my-4">Students</h3>
          <div className="space-y-2">
            {students.map((student) => (
              <motion.div
                key={student._id}
                variants={profileVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-white p-4 rounded-lg shadow-md cursor-pointer overflow-hidden flex items-center relative"
                onClick={() => setSelectedProfile(student)}
              >
                <motion.img
                  src={student.imageUrl}
                  alt={`${student.firstName} ${student.lastName}`}
                  className="w-12 h-12 rounded-full mr-4 border-2 border-gray-300 object-cover"
                  whileHover={{ scale: 1.1 }}
                />
                {renderOnlineIndicator(student._id, connectedUsers)}
                <div>
                  <p className="font-semibold truncate">{`${student.firstName} ${student.lastName}`}</p>
                  <p className="text-sm text-gray-600 truncate">{student.email}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <ProfileModal
            selectedProfile={selectedProfile}
            onClose={() => setSelectedProfile(null)}
            connectedUsers={connectedUsers}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ProfileModalProps {
  selectedProfile: StudentInterface | TeacherInterface | null;
  onClose: () => void;
  connectedUsers: string[];
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ selectedProfile, onClose, connectedUsers }) => {
  if (!selectedProfile) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <motion.img
            src={selectedProfile.imageUrl}
            alt={`${selectedProfile.firstName} ${selectedProfile.lastName}`}
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-300 object-cover"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
          {renderOnlineIndicator(selectedProfile._id, connectedUsers)}
          <h3 className="text-2xl font-bold text-center mb-2 text-black">{`${selectedProfile.firstName} ${selectedProfile.lastName}`}</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
            onClick={onClose}
          >
            Close
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};