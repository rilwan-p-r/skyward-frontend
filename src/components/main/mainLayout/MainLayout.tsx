import React from "react";
import MainNavbar from "../mainNavbar/MainNavbar";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <>
      <MainNavbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
