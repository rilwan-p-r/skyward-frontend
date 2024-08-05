import { Home } from "lucide-react";
import { GiTeacher } from "react-icons/gi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaUserGraduate, FaUsers } from "react-icons/fa"; // Import a student icon

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
      </Sidebar>
    </>
  );
};

export default AdminSidebar;