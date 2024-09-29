import React, { useEffect, useState } from 'react';
import { FaBell, FaBars } from 'react-icons/fa';
import TeacherSidebar from '../../components/teacher/teacherSidebar/TeacherSidebar';
import { Announcement } from '../../interfaces/Announcements';
import { getAnnouncements } from '../../api/teacher/getAnnouncements';

const TeacherHome: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);

    const fetchAnnouncement = async () => {
        try {
            const response = await getAnnouncements();
            setAnnouncements(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAnnouncement();
    }, []);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <TeacherSidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
                    <div className="max-w-7xl mx-auto">
                        <Header toggleSidebar={toggleSidebar} notificationCount={announcements.length} />
                        <div className="bg-white shadow rounded-lg divide-y">
                            <h3 className="text-xl font-semibold p-4 border-b">Recent Announcements</h3>
                            {announcements.map((announcement) => (
                                <div key={announcement._id} className="p-4 hover:bg-gray-50">
                                    <h4 className="font-semibold">{announcement.title}</h4>
                                    <p className="mt-2">{announcement.content}</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Announced: {new Date(announcement.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

interface HeaderProps {
    toggleSidebar: () => void;
    notificationCount: number;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, notificationCount }) => (
    <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
            <button onClick={toggleSidebar} className="mr-4 md:hidden">
                <FaBars className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-semibold">Teacher Dashboard</h2>
        </div>
        <div className="relative">
            <FaBell className="w-6 h-6 text-gray-600 cursor-pointer" />
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {notificationCount}
            </span>
        </div>
    </div>
);

export default TeacherHome;