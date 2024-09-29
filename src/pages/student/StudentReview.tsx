import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import StudentSidebar from '../../components/student/studentSidebar/StudentSidebar';
import { ReviewForm } from '../../components/main/review/ReviewForm';

const StudentReview: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <StudentSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
                    <div className="max-w-3xl mx-auto">
                        <Header toggleSidebar={toggleSidebar} />
                        <div className="bg-white shadow rounded-lg p-6 text-center">
                            <h3 className="text-2xl font-semibold mb-4">About Skyward College</h3>
                            <p className="mb-6">
                                Skyward College is a premier institution committed to excellence in education, 
                                fostering innovation, and preparing students for success in a rapidly evolving world. 
                                Our diverse programs and dedicated faculty ensure a rich, collaborative learning environment.
                            </p>
                            <p className="mb-6">We value your feedback as it helps us continually improve and provide the best educational experience possible.</p>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                            >
                                Add Your Valuable Feedback
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">Submit Your Review</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                                <FaTimes />
                            </button>
                        </div>
                        <ReviewForm onClose={() => setIsModalOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

interface HeaderProps {
    toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => (
    <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
            <button onClick={toggleSidebar} className="mr-4 md:hidden">
                <FaBars className="w-6 h-6" />
            </button>
        </div>
    </div>
);

export default StudentReview;