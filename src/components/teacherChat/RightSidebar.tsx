import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import { BatchWithCourseInterface } from '../../interfaces/BatchWithCourse';
import { StudentInterface } from '../../interfaces/studentInterface';
import { TeacherInterface } from '../../interfaces/teacherInterface';


interface RightSidebarProps {
    rightSidebarOpen: boolean;
    setRightSidebarOpen: (open: boolean) => void;
    selectedBatch: BatchWithCourseInterface | null;
    students: StudentInterface[];
    teacherInfo: TeacherInterface | null;
    isMobile: boolean;
    setSelectedProfile: (profile: StudentInterface | TeacherInterface | null) => void;
    renderOnlineIndicator: (userId: string) => JSX.Element;
}

const RightSidebar: React.FC<RightSidebarProps> = ({
    rightSidebarOpen,
    setRightSidebarOpen,
    selectedBatch,
    students,
    teacherInfo,
    isMobile,
    setSelectedProfile,
    renderOnlineIndicator
}) => {
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

    return (
        <AnimatePresence>
            {rightSidebarOpen && selectedBatch && (
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
                        onClick={() => setRightSidebarOpen(false)}
                        className="absolute top-4 right-4 text-black"
                    >
                        <FaTimes className="w-6 h-6" />
                    </motion.button>
                    <h2 className="text-2xl font-bold mb-6 text-black">Batch Details</h2>
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Course Information</h3>
                        <p><strong>Course:</strong> {selectedBatch.course.course}</p>
                        <p><strong>Batch:</strong> {selectedBatch.batch}</p>
                        <p><strong>Division:</strong> {selectedBatch.division}</p>
                        <p><strong>No.Students:</strong> {students.length}</p>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Teacher</h3>
                    <motion.div
                        variants={profileVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        className="bg-white p-4 rounded-lg shadow-md cursor-pointer overflow-hidden relative"
                        onClick={() => setSelectedProfile(teacherInfo)}
                    >
                        <motion.img
                            src={teacherInfo?.imageUrl}
                            alt={`${teacherInfo?.firstName} ${teacherInfo?.lastName}`}
                            className="w-16 h-16 rounded-full mb-2 mx-auto border-2 border-gray-300 object-cover"
                            whileHover={{ scale: 1.1 }}
                        />
                        {renderOnlineIndicator(teacherInfo?._id || '')}
                        <p className="font-semibold text-center">{`${teacherInfo?.firstName} ${teacherInfo?.lastName}`}</p>
                        <p className="text-sm text-gray-600 text-center">{teacherInfo?.subject}</p>
                    </motion.div>
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
                                {renderOnlineIndicator(student._id)}
                                <div>
                                    <p className="font-semibold truncate">{`${student.firstName} ${student.lastName}`}</p>
                                    <p className="text-sm text-gray-600 truncate">{student.email}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RightSidebar;