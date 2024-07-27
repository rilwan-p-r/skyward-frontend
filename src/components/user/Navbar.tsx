import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <div className="text-3xl font-bold">Skywards</div>
          <nav className="hidden md:flex space-x-4">
            <a href="#" className="hover:text-gray-700">Home</a>
            <a href="#" className="hover:text-gray-700">About</a>
            <a href="#" className="hover:text-gray-700">Contact Us</a>
            <a href="#" className="hover:text-gray-700">Events</a>
          </nav>
        </div>
        <div className="hidden md:block">
          <button className="bg-black text-white px-4 py-2 rounded-md focus:outline-none">Portal</button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden" id="menu">
          <a href="#" className="block px-4 py-2 hover:bg-gray-200">Home</a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-200">About</a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-200">Contact Us</a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-200">Events</a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-200">Portal</a>
        </div>
      )}
    </header>
    <Outlet></Outlet>
    </>
  );
};

export default Navbar;
