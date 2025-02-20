import React, { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo';

const Navbar = ({ onSave }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = () => {
    onSave();
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-slate-900 shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center pl-0 gap-3">
            <Logo className="h-8 w-8" />
            <h1 className="text-2xl font-bold text-teal-300">Dotable – Task Prioritizer</h1>
          </div>
          
          {/* Menu button and dropdown */}
          <div className="flex items-center pr-0" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-3 rounded-md text-teal-300 hover:text-teal-200 hover:bg-slate-800 focus:outline-none ml-2"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>

            {/* Dropdown menu */}
            <div className={`
              ${isMenuOpen ? 'block' : 'hidden'}
              absolute right-2 top-20 mt-2 w-48
              rounded-md shadow-lg bg-slate-900 ring-1 ring-black ring-opacity-5
              z-50
            `}>
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  onClick={handleSave}
                  className="w-full text-left px-4 py-3 text-base text-teal-300 hover:bg-slate-800 hover:text-teal-200"
                  role="menuitem"
                >
                  Save
                </button>
                <button
                  className="w-full text-left px-4 py-3 text-base text-teal-300 hover:bg-slate-800 hover:text-teal-200"
                  role="menuitem"
                >
                  Export
                </button>
                <button
                  className="w-full text-left px-4 py-3 text-base text-teal-300 hover:bg-slate-800 hover:text-teal-200"
                  role="menuitem"
                >
                  Import
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 