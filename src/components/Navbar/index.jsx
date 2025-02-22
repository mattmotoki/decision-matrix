import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../Logo';
import { validateImportData } from '../../utils/validation';
import { MenuIcon, TutorialIcon, HelpIcon } from '../../shared/components/icons';
import { Toast } from '../../shared/components/Toast';
import { GettingStartedDropdown } from './GettingStartedDropdown';
import { HelpDropdown } from './HelpDropdown';
import { ProfileDropdown } from './ProfileDropdown';
import { UserCircle } from 'lucide-react';

export function Navbar({ onSave, onImport }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);
  const navRef = useRef(null);

  const showToast = (message) => setToast(message);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close menu if click is outside the entire navbar
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
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

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <>
      <nav ref={navRef} className="bg-slate-900 shadow-md">
        <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo and title */}
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center pl-0 gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
            >
              <Logo className="h-7 w-7 sm:h-8 sm:w-8" />
              <h1 className="text-xl sm:text-2xl font-bold text-teal-300 truncate">
                Todotable – Task Prioritizer
              </h1>
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <div className="relative group">
                <button 
                  onClick={() => toggleDropdown('getting-started')}
                  className="text-teal-300 hover:text-teal-200 flex items-center gap-1 px-3 py-2 rounded-md transition-colors"
                >
                  <TutorialIcon className="w-5 h-5" />
                  Getting Started
                </button>
                {activeDropdown === 'getting-started' && <GettingStartedDropdown />}
              </div>

              <div className="relative group">
                <button 
                  onClick={() => toggleDropdown('help')}
                  className="text-teal-300 hover:text-teal-200 flex items-center gap-1 px-3 py-2 rounded-md transition-colors"
                >
                  <HelpIcon className="w-5 h-5" />
                  Help
                </button>
                {activeDropdown === 'help' && <HelpDropdown />}
              </div>

              {/* Profile Section */}
              <div className="relative group">
                <button 
                  onClick={() => toggleDropdown('profile')}
                  className="text-teal-300 hover:text-teal-200 flex items-center gap-1 px-3 py-2 rounded-md transition-colors"
                >
                  <UserCircle className="w-8 h-8" />
                </button>
                {activeDropdown === 'profile' && <ProfileDropdown onSave={handleSave} />}
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center pr-0">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 sm:p-3 rounded-md text-teal-300 hover:text-teal-200 hover:bg-slate-800 focus:outline-none"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon />
              </button>
            </div>
          </div>
        </div>
      </nav>
      {toast && <Toast message={toast} onHide={() => setToast(null)} />}
    </>
  );
} 