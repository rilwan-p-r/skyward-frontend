import { Award, Home, MicVocal } from "lucide-react";
import { GiTeacher } from "react-icons/gi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaUserGraduate, FaUsers, FaBook } from "react-icons/fa";
import { MdOutlineClass } from "react-icons/md"; 
import Sidebar, { SidebarItem } from "./Sidebar";


const AdminSidebar = () => {
  return (
    <>
      <Sidebar>
        <SidebarItem 
          icon={<Home size={20} />} 
          text="Home" 
          active
          to="/admin/adminhome" 
          alert 
        />
        <SidebarItem
          icon={<GiTeacher size={20} />}
          text="Add Teacher"
          active
          to="/admin/addteacher"
        />
        <SidebarItem
          icon={<LiaChalkboardTeacherSolid size={20} />}
          text="Teachers List"
          active
          to="/admin/teacherslist"
          alert
        />
        <SidebarItem
          icon={<FaUserGraduate size={20} />}
          text="Add Student"
          active
          to="/admin/addstudent"
        />
        <SidebarItem
          icon={<FaUsers size={20} />}
          text="Students List"
          active
          to="/admin/studentslist"
        />
        <SidebarItem
          icon={<MdOutlineClass size={20} />}
          text="Batches"
          active
          to="/admin/batches"
        />
        <SidebarItem
          icon={<FaBook size={20} />}
          text="Courses"
          active
          to="/admin/courses"
        />
        <SidebarItem
          icon={<Award size={20} />}
          text="MCQ Competition"
          active
          to="/admin/AdminMCQCompetitionList"
        />
        <SidebarItem
          icon={<MicVocal size={20} />}
          text="Announcement"
          active
          to="/admin/AdminAnnouncement"
        />
      </Sidebar>
    </>
  );
};

export default AdminSidebar;