import { MoreVertical } from "lucide-react";
import { useContext, createContext, useState, ReactNode, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiX, FiMenu } from "react-icons/fi";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/slices/adminSlices/adminSlice";
import { adminLogout } from "../../../api/admin/adminAuth";

interface SidebarContextType {
  expanded: boolean;
  isMobile: boolean;
}

const SidebarContext = createContext<SidebarContextType>({ expanded: true, isMobile: false });

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setExpanded(!mobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Question",
      text: "Are you sure you want to Logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      const logoutResponse = await adminLogout();
      console.log('logoutResponse', logoutResponse);
      dispatch(logout());
      navigate('/admin');
      toast.success('Logout Successful!');
    }
  };

  return (
    <>
      {isMobile && expanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setExpanded(false)} />
      )}
      <aside className={`h-screen ${isMobile ? 'fixed' : 'relative'} z-50 transition-all duration-300 ${expanded ? 'w-64' : 'w-16'} ${isMobile && !expanded ? '-translate-x-full' : 'translate-x-0'}`}>
        <nav className="h-full flex flex-col bg-white border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <div className={`text-2xl font-bold overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`}>
              Skywards
            </div>
            {!isMobile && (
              <button
                onClick={() => setExpanded((curr) => !curr)}
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                {expanded ? <FiX size={20} /> : <FiMenu size={20} />}
              </button>
            )}
          </div>

          <SidebarContext.Provider value={{ expanded, isMobile }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
              <button onClick={handleLogout} className="px-4 py-2 rounded-md border border-neutral-300 bg-neutral-100 text-neutral-500 text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-md">
                Logout
              </button>
              <MoreVertical size={20} />
            </div>
          </div>
        </nav>
      </aside>
      {isMobile && (
        <button
          onClick={() => setExpanded((curr) => !curr)}
          className="fixed top-4 right-4 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 z-50"
        >
          {expanded ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      )}
    </>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
  to?: string;
}

export function SidebarItem({ icon, text, active = false, alert = false, to }: SidebarItemProps) {
  const { expanded, isMobile } = useContext(SidebarContext);

  const content = (
    <>
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
        {text}
      </span>
      {alert && (
        <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />
      )}
      {!expanded && !isMobile && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6 
            bg-indigo-100 text-gray-800 text-sm
            invisible opacity-0 -translate-x-3 transition-all 
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </>
  );

  const commonClasses = `
    relative flex items-center py-2 px-3 my-1
    font-medium rounded-md cursor-pointer
    transition-colors group
  `;

  const activeClasses = "bg-gradient-to-tr from-gray-700 to-black text-white";
  const inactiveClasses = "hover:bg-gray-100 text-gray-600";

  return (
    <li>
      {to ? (
        <NavLink
          to={to}
          className={({ isActive }) =>
            `${commonClasses} ${isActive ? activeClasses : inactiveClasses}`
          }
        >
          {content}
        </NavLink>
      ) : (
        <div className={`${commonClasses} ${active ? activeClasses : inactiveClasses}`}>
          {content}
        </div>
      )}
    </li>
  );
}