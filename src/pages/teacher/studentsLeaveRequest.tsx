import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaCheck, FaTimes } from "react-icons/fa";
import { RootState } from "../../redux/store/store";
import { LocalTeacherInterface } from "../../interfaces/localTeacherInterface";
import { BatchWithCourseInterface } from "../../interfaces/BatchWithCourse";
import { LeaveStudentInterface } from "../../interfaces/leaveStudentInterface";
import { getBatchesAndCoursesByTeacherId } from "../../api/teacher/fetchBatchesByTeacherId";
import { getAppliedLeavesByBatchId, handleStudentLeaveApplication } from "../../api/teacher/studentsLeaveApplication";
import TeacherSidebar from "../../components/teacher/teacherSidebar/TeacherSidebar";

const StudentsLeaveRequest: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [batches, setBatches] = useState<BatchWithCourseInterface[]>([]);
    const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
    const [leaveApplications, setLeaveApplications] = useState<LeaveStudentInterface[]>([]);
    const teacher = useSelector((state: RootState) => state.teacherInfo.teacherInfo) as LocalTeacherInterface;

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        if (teacher._id) {
            fetchBatchesAndCourses(teacher._id);
        }
    }, [teacher._id]);

    useEffect(() => {
        if (selectedBatch) {
            fetchLeaveApplications(selectedBatch);
        }
    }, [selectedBatch]);

    const fetchBatchesAndCourses = async (teacherId: string) => {
        try {
            const response = await getBatchesAndCoursesByTeacherId(teacherId);
            if (response && response.data) {
                setBatches(response.data);
            }
        } catch (error) {
            console.error('Error fetching batches and courses:', error);
        }
    };

    const fetchLeaveApplications = async (batchId: string) => {
        try {
            const applications = await getAppliedLeavesByBatchId(batchId);
            console.log('applications',applications);
            
            setLeaveApplications(applications);
        } catch (error) {
            console.error('Error fetching leave applications:', error);
        }
    };

    const handleLeaveAction = async (leaveId: string, action: 'approve' | 'reject') => {
        try {
            const response = await handleStudentLeaveApplication(leaveId, action);
            console.log(response);
            
            if (selectedBatch) {
                fetchLeaveApplications(selectedBatch);
            }
        } catch (error) {
            console.error('Error handling leave application:', error);
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <TeacherSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900">Students Leave Requests</h1>
                        <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden">
                            <FaBars className="h-6 w-6" />
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto focus:outline-none">
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <div className="mb-4">
                                <select 
                                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                    value={selectedBatch || ""}
                                    onChange={(e) => setSelectedBatch(e.target.value)}
                                >
                                    <option value="">Select a batch</option>
                                    {batches.map((batch) => (
                                        <option key={batch._id} value={batch._id}>{batch.batch} {batch.course.course}</option>
                                    ))}
                                </select>
                            </div>

                            <AnimatePresence>
                                {selectedBatch && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-4"
                                    >
                                        {leaveApplications.length === 0 ? (
                                            <p className="text-center text-gray-500 py-8">No leave applications found for this batch.</p>
                                        ) : (
                                            leaveApplications.map((application) => (
                                                <motion.div 
                                                    key={application._id} 
                                                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                                                    layout
                                                >
                                                    <h3 className="font-semibold text-lg text-gray-800">{application.studentId.firstName} {application.studentId.lastName}</h3>
                                                    <p className="text-sm text-gray-600 mt-1">{application.reason}</p>
                                                    <p className="text-md text-gray-800 font-medium mt-2">
                                                        {new Date(application.startDate).toLocaleDateString()} to {new Date(application.endDate).toLocaleDateString()}
                                                    </p>
                                                    <div className="mt-4 flex justify-between items-center">
                                                        {application.status === 'pending' ? (
                                                            <>
                                                                <motion.button 
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => handleLeaveAction(application._id, 'approve')}
                                                                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
                                                                >
                                                                    <FaCheck className="mr-2" />
                                                                    Approve
                                                                </motion.button>
                                                                <motion.button 
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => handleLeaveAction(application._id, 'reject')}
                                                                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                                                                >
                                                                    <FaTimes className="mr-2" />
                                                                    Reject
                                                                </motion.button>
                                                            </>
                                                        ) : (
                                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                                                application.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                            }`}>
                                                                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default StudentsLeaveRequest;