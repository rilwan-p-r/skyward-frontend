import React from "react";
import Navbar from "../main/navbar/Navbar";
import { Outlet } from "react-router-dom";

const NavbarLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default NavbarLayout;
