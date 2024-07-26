import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Skywards. All rights reserved.
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 text-center space-y-2 md:space-y-0">
            <a href="/privacy-policy" className="text-gray-200 hover:text-white">Privacy Policy</a>
            <a href="/terms-of-service" className="text-gray-200 hover:text-white">Terms of Service</a>
            <a href="/contact-us" className="text-gray-200 hover:text-white">Contact Us</a>
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-white">
            <FaFacebookF size="1.5em" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-white">
            <FaTwitter size="1.5em" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-white">
            <FaInstagram size="1.5em" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-100 hover:text-white">
            <FaLinkedinIn size="1.5em" />
          </a>
        </div>
      </div>
    </footer>
  );
}
