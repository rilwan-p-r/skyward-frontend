import { Home } from "lucide-react";
import { GiTeacher } from "react-icons/gi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

import Sidebar, { SidebarItem } from "../Sidebar";

const AdminSidebar = () => {
  return (
    <>
      <Sidebar>
        <SidebarItem icon={<Home size={20} />} text="Home" active
          to="/admin/adminhome" alert />
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
      </Sidebar>
    </>
  );
};

export default AdminSidebar;