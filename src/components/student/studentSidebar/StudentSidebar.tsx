import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaClipboardList, FaTasks, FaGraduationCap, FaCalendarAlt, FaComments } from 'react-icons/fa';
import { RiHomeSmile2Line } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store/store';
import { LocalStudentInterface } from '../../../interfaces/LocalStudentInterface';

interface StudentSidebarProps {
    sidebarOpen: boolean;
    toggleSidebar: () => void;
}

const StudentSidebar: React.FC<StudentSidebarProps> = ({ sidebarOpen, toggleSidebar }) => {
    const student = useSelector((state: RootState) => state.studentInfo.studentInfo) as LocalStudentInterface;

    return (
        <div className={`bg-black text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform 
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}>
            {/* Close button inside the sidebar */}
            <button onClick={toggleSidebar} className="absolute top-1 right-1 md:hidden">
                <FaTimes className="w-8 h-8" />
            </button>
            <div className="flex flex-col items-center mb-8">
                <img src={student.imageUrl} alt="Profile" className="w-24 h-24 rounded-full mb-2" />
                <h2 className="text-xl font-bold">{`${student.firstName} ${student.lastName}`}</h2>
                <p className="text-sm text-gray-400">{student.email}</p>
            </div>
            <nav>
                <SidebarLink icon={<RiHomeSmile2Line />} text="Home" to="/student/" />
                <SidebarLink icon={<FaClipboardList />} text="Attendance" to="/student/viewMyAttendance" />
                <SidebarLink icon={<FaTasks />} text="Marklist" to="/student/marklist" />
                <SidebarLink icon={<FaGraduationCap />} text="MCQ Competition" to="/student/mcq" />
                <SidebarLink icon={<FaCalendarAlt />} text="Apply Leave" to="/student/leave" />
                <SidebarLink icon={<FaComments />} text="Class Group Chat" to="/student/chat" />
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

export default StudentSidebar;
