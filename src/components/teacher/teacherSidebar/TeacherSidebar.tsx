import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaClipboardList, FaTasks, FaGraduationCap, FaCalendarAlt, FaComments } from 'react-icons/fa';
import { RiHomeSmile2Line } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { LocalTeacherInterface } from '../../../interfaces/localTeacherInterface';

interface TeacherSidebarProps {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}



const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
    const teacher = useSelector((state: RootState) => state.teacherInfo.teacherInfo) as LocalTeacherInterface;

    return (
        <div className={`bg-black text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform 
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}>
            {/* Close button inside the sidebar */}
            <button onClick={toggleSidebar} className="absolute top-1 right-1 md:hidden">
                <FaTimes className="w-8 h-8" />
            </button>
            <div className="flex flex-col items-center mb-8">
                <img src={teacher.imageUrl} alt="Profile" className="w-24 h-24 rounded-full mb-2" />
                <h2 className="text-xl font-bold">{`${teacher.firstName} ${teacher.lastName}`}</h2>
                <p className="text-sm text-gray-400">{teacher.email}</p>
            </div>
            <nav>
                <SidebarLink icon={<RiHomeSmile2Line />} text="Home" to="/teacher/" />
                <SidebarLink icon={<FaClipboardList />} text="Take Attendance" to="/teacher/takeAttendance" />
                <SidebarLink icon={<FaTasks />} text="Assign Tasks" to="#" />
                <SidebarLink icon={<FaGraduationCap />} text="Update Marksheets" to="#" />
                <SidebarLink icon={<FaCalendarAlt />} text="Apply for Leave" to="#" />
                <SidebarLink icon={<FaComments />} text="Class Group Chats" to="#" />
            </nav>
        </div>
    );
};

interface SidebarLinkProps {
    icon: React.ReactNode;
    text: string;
    to: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ icon, text, to }) => (
    <Link to={to} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-white hover:text-black">
        {React.cloneElement(icon as React.ReactElement, { className: "inline-block mr-2" })} {text}
    </Link>
);

export default TeacherSidebar;
