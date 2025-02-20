import React, { useState, useRef, useEffect } from 'react';

const Navbar = () => {
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

  return (
    <nav className="bg-slate-800 shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center pl-0">
            <h1 className="text-xl font-bold text-teal-400">Dotable – Task Prioritizer</h1>
          </div>
          
          {/* Menu button and dropdown */}
          <div className="flex items-center pr-0" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-teal-400 hover:text-teal-300 hover:bg-slate-700 focus:outline-none ml-2"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
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
              absolute right-2 top-16 mt-2 w-48
              rounded-md shadow-lg bg-slate-800 ring-1 ring-black ring-opacity-5
              z-50
            `}>
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-teal-400 hover:bg-slate-700 hover:text-teal-300"
                  role="menuitem"
                >
                  Save
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-teal-400 hover:bg-slate-700 hover:text-teal-300"
                  role="menuitem"
                >
                  Export
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-teal-400 hover:bg-slate-700 hover:text-teal-300"
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