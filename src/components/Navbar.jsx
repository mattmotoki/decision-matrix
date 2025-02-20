import React, { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo';

const Navbar = ({ onSave, tasks, completedTasks, dimensions }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
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

  const handleSave = async () => {
    setIsSaving(true);
    setShowSuccess(false);
    
    // Ensure minimum 1 second display of loading state
    const savePromise = onSave();
    const timerPromise = new Promise(resolve => setTimeout(resolve, 1000));
    await Promise.all([savePromise, timerPromise]);
    
    setIsSaving(false);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsMenuOpen(false);
    }, 1500);
  };

  const handleExport = () => {
    const data = {
      metadata: {
        exportDate: new Date().toISOString(),
        totalActiveTasks: tasks.length,
        totalCompletedTasks: completedTasks.length
      },
      dimensions: dimensions.map(dim => ({
        name: dim.name,
        label: dim.label,
        weight: dim.weight,
        description: dim.description
      })),
      activeTasks: tasks.map(task => ({
        id: task.id,
        name: task.name,
        createdAt: task.createdAt,
        scores: Object.fromEntries(
          dimensions.map(dim => [dim.name, task[dim.name]])
        ),
        totalScore: dimensions.reduce((sum, dim) => sum + (task[dim.name] * dim.weight), 0)
      })),
      completedTasks: completedTasks.map(task => ({
        id: task.id,
        name: task.name,
        createdAt: task.createdAt,
        completedAt: task.completedAt,
        scores: Object.fromEntries(
          dimensions.map(dim => [dim.name, task[dim.name]])
        ),
        totalScore: dimensions.reduce((sum, dim) => sum + (task[dim.name] * dim.weight), 0)
      }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const dateStr = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `dotable-export-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-slate-900 shadow-md">
      <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex-shrink-0 flex items-center pl-0 gap-2 sm:gap-3">
            <Logo className="h-7 w-7 sm:h-8 sm:w-8" />
            <h1 className="text-xl sm:text-2xl font-bold text-teal-300 truncate">
              Dotable – Task Prioritizer
            </h1>
          </div>
          
          {/* Menu button and dropdown */}
          <div className="flex items-center pr-0" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 sm:p-3 rounded-md text-teal-300 hover:text-teal-200 hover:bg-slate-800 focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6 sm:h-7 sm:w-7"
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
                  disabled={isSaving}
                  className="w-full text-left px-4 py-3 text-base text-teal-300 hover:bg-slate-800 hover:text-teal-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between"
                  role="menuitem"
                  title="Save the current state of your tasks and settings"
                >
                  <span>{isSaving ? 'Saving...' : 'Save'}</span>
                  {isSaving && (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {showSuccess && (
                    <svg className="h-4 w-4 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={handleExport}
                  className="w-full text-left px-4 py-3 text-base text-teal-300 hover:bg-slate-800 hover:text-teal-200"
                  role="menuitem"
                  title="Export all tasks and settings as a JSON file"
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