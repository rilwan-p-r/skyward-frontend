import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import HomeScreen from "../pages/HomeScreen";

import Navbar from "../components/user/Navbar";
import AdminSidebar from "../components/admin/AdminSidebarItems";
import AddTeacher from "../pages/admin/AddTeacher";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomeScreen />}></Route>
      </Route>


{/* admin routes */}

      <Route path="/adminhome" element={<AdminSidebar />}>
        <Route path="addteacher" element={<AddTeacher />}></Route>
      </Route>
    </>
  )
);
