import React, { useState, useRef, useEffect } from 'react';
import { Logo } from './Logo';

const Toast = ({ message, onHide }) => {
  useEffect(() => {
    const timer = setTimeout(onHide, 2000);
    return () => clearTimeout(timer);
  }, [onHide]);

  return (
    <div className="fixed bottom-4 right-4 bg-slate-800 text-teal-300 px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
      {message}
    </div>
  );
};

const Navbar = ({ onSave, onImport, tasks, completedTasks, dimensions, showWeightedScores }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [toast, setToast] = useState(null);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

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

  const showToast = (message) => {
    setToast(message);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Ensure minimum 1 second display of loading state
    const savePromise = onSave();
    const timerPromise = new Promise(resolve => setTimeout(resolve, 1000));
    await Promise.all([savePromise, timerPromise]);
    
    setIsSaving(false);
    setIsMenuOpen(false);
    showToast('Changes saved successfully');
  };

  const handleExport = () => {
    const data = {
      metadata: {
        exportDate: new Date().toISOString(),
        totalActiveTasks: tasks.length,
        totalCompletedTasks: completedTasks.length
      },
      settings: {
        showWeightedScores
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
        )
      })),
      completedTasks: completedTasks.map(task => ({
        id: task.id,
        name: task.name,
        createdAt: task.createdAt,
        completedAt: task.completedAt,
        scores: Object.fromEntries(
          dimensions.map(dim => [dim.name, task[dim.name]])
        )
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

  const validateImportData = (data) => {
    // Check basic structure
    if (!data || typeof data !== 'object') throw new Error('Invalid file format');
    if (!data.dimensions || !Array.isArray(data.dimensions)) throw new Error('Missing or invalid dimensions');
    if (!data.activeTasks || !Array.isArray(data.activeTasks)) throw new Error('Missing or invalid active tasks');
    if (!data.completedTasks || !Array.isArray(data.completedTasks)) throw new Error('Missing or invalid completed tasks');
    if (!data.settings || typeof data.settings !== 'object') throw new Error('Missing or invalid settings');
    if (typeof data.settings.showWeightedScores !== 'boolean') throw new Error('Invalid showWeightedScores setting');

    // Validate dimensions
    const validDimension = (dim) => (
      dim.name && typeof dim.name === 'string' &&
      dim.label && typeof dim.label === 'string' &&
      dim.weight && typeof dim.weight === 'number' &&
      dim.description && typeof dim.description === 'string'
    );
    if (!data.dimensions.every(validDimension)) {
      throw new Error('Invalid dimension format');
    }

    // Validate tasks
    const validTask = (task) => (
      task.id && typeof task.id === 'number' &&
      task.name && typeof task.name === 'string' &&
      task.createdAt && typeof task.createdAt === 'string' &&
      task.scores && typeof task.scores === 'object'
    );
    
    const validCompletedTask = (task) => (
      validTask(task) &&
      task.completedAt && typeof task.completedAt === 'string'
    );

    if (!data.activeTasks.every(validTask)) {
      throw new Error('Invalid active task format');
    }
    if (!data.completedTasks.every(validCompletedTask)) {
      throw new Error('Invalid completed task format');
    }

    return true;
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsImporting(true);
      
      // Read and validate the file
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (validateImportData(data)) {
        // Ensure minimum 1 second loading state
        const importPromise = onImport(data);
        const timerPromise = new Promise(resolve => setTimeout(resolve, 1000));
        await Promise.all([importPromise, timerPromise]);
        
        setIsMenuOpen(false);
        showToast('Data imported successfully');
      }
    } catch (error) {
      alert(`Import failed: ${error.message}`);
    } finally {
      setIsImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
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
                  </button>
                  <button
                    onClick={handleExport}
                    className="w-full text-left px-4 py-3 text-base text-teal-300 hover:bg-slate-800 hover:text-teal-200"
                    role="menuitem"
                    title="Export all tasks and settings as a JSON file"
                  >
                    Export
                  </button>
                  <label
                    className="w-full text-left px-4 py-3 text-base text-teal-300 hover:bg-slate-800 hover:text-teal-200 cursor-pointer block flex items-center justify-between"
                    role="menuitem"
                    title="Import tasks and settings from a JSON file"
                  >
                    <span>{isImporting ? 'Importing...' : 'Import'}</span>
                    {isImporting && (
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {toast && <Toast message={toast} onHide={() => setToast(null)} />}
    </>
  );
};

export default Navbar; 