import {
//   LayoutDashboard,
  Home,
//   StickyNote,
//   Layers,
//   Flag,
//   Calendar,
//   LifeBuoy,
//   Settings,
//   Users2Icon,

} from "lucide-react";
import { GiTeacher } from "react-icons/gi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";


import Sidebar, { SidebarItem } from "../Sidebar";

const AdminSidebar = () => {
  return (
    <>
      <Sidebar>
      <SidebarItem icon={<Home size={20} />} text="Home" alert />
      <SidebarItem icon={<GiTeacher size={20} />} text="Add Teacher" active />
      <SidebarItem icon={<LiaChalkboardTeacherSolid size={20} />} text="Teachers List" alert />
    </Sidebar>
         
       </>
  );
};

export default AdminSidebar;
