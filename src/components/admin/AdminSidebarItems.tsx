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
import { Outlet } from "react-router-dom";


import Sidebar, { SidebarItem } from "../Sidebar";

const AdminSidebar = () => {
  return (
    <>
      <div className="flex">
        <Sidebar>
          <SidebarItem icon={<Home size={20} />} text="Home" alert />
          <SidebarItem
            icon={<GiTeacher size={20} />}
            text="Add Teacher"
            active
          />
          <SidebarItem icon={<LiaChalkboardTeacherSolid size={20} />} text="Teachers List" alert />
          {/* <SidebarItem icon={<Calendar size={20} />} text="Calendar" />
          <SidebarItem icon={<Layers size={20} />} text="Tasks" />
          <SidebarItem icon={<Flag size={20} />} text="Reporting" />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" /> */}
        </Sidebar>
        <main>
        <Outlet></Outlet>
        </main>
      </div>
         
       </>
  );
};

export default AdminSidebar;
