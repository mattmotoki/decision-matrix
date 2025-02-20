import React, { useState, useRef, useEffect } from 'react';
import { Logo } from '../Logo';
import { validateImportData } from '../../utils/validation';
import { MenuIcon } from './icons';
import { Toast } from './Toast';
import { DropdownMenu } from './DropdownMenu';

export const Navbar = ({ onSave, onImport, tasks, completedTasks, dimensions, showWeightedScores }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [showImportSuccess, setShowImportSuccess] = useState(false);
  const [toast, setToast] = useState(null);
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  const showToast = (message) => setToast(message);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setShowSaveSuccess(false);
    
    try {
      const savePromise = onSave();
      const timerPromise = new Promise(resolve => setTimeout(resolve, 1000));
      await Promise.all([savePromise, timerPromise]);
      
      setShowSaveSuccess(true);
      showToast('Changes saved successfully');
      
      setTimeout(() => {
        setShowSaveSuccess(false);
        closeMenu();
      }, 1500);
    } finally {
      setIsSaving(false);
    }
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

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = `dotable-export-${timestamp}.json`;
      document.body.appendChild(a);
      a.click();
    } finally {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      closeMenu();
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsImporting(true);
      setShowImportSuccess(false);
      
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (validateImportData(data)) {
        const importPromise = onImport(data);
        const timerPromise = new Promise(resolve => setTimeout(resolve, 1000));
        await Promise.all([importPromise, timerPromise]);
        
        setShowImportSuccess(true);
        showToast('Data imported successfully');
        
        setTimeout(() => {
          setShowImportSuccess(false);
          closeMenu();
        }, 1500);
      }
    } catch (error) {
      alert(`Import failed: ${error.message}`);
    } finally {
      setIsImporting(false);
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
            {/* Logo and title */}
            <div className="flex-shrink-0 flex items-center pl-0 gap-2 sm:gap-3">
              <Logo className="h-7 w-7 sm:h-8 sm:w-8" />
              <h1 className="text-xl sm:text-2xl font-bold text-teal-300 truncate">
                Dotable – Task Prioritizer
              </h1>
            </div>
            
            {/* Menu button and dropdown */}
            <div className="flex items-center pr-0">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 sm:p-3 rounded-md text-teal-300 hover:text-teal-200 hover:bg-slate-800 focus:outline-none"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon />
              </button>

              <DropdownMenu
                isOpen={isMenuOpen}
                menuRef={menuRef}
                onSave={handleSave}
                onExport={handleExport}
                onImport={handleImport}
                isSaving={isSaving}
                showSaveSuccess={showSaveSuccess}
                isImporting={isImporting}
                showImportSuccess={showImportSuccess}
                fileInputRef={fileInputRef}
              />
            </div>
          </div>
        </div>
      </nav>
      {toast && <Toast message={toast} onHide={() => setToast(null)} />}
    </>
  );
}; 