import React from 'react';
import { LoadingSpinner, SuccessCheckmark } from './icons';

const menuItemBaseClass = "w-full text-left px-4 py-3 text-base text-teal-300 hover:bg-slate-800 hover:text-teal-200";

export const SaveMenuItem = ({ onClick, isSaving, showSuccess, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`${menuItemBaseClass} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between`}
    role="menuitem"
    title="Save the current state of your tasks and settings"
  >
    <span>{isSaving ? 'Saving...' : 'Save'}</span>
    {isSaving && <LoadingSpinner />}
    {showSuccess && <SuccessCheckmark />}
  </button>
);

export const ExportMenuItem = ({ onClick }) => (
  <button
    onClick={onClick}
    className={menuItemBaseClass}
    role="menuitem"
    title="Export all tasks and settings as a JSON file"
  >
    Export
  </button>
);

export const ImportMenuItem = ({ isImporting, showSuccess, fileInputRef, onChange }) => (
  <label
    className={`${menuItemBaseClass} cursor-pointer block flex items-center justify-between`}
    role="menuitem"
    title="Import tasks and settings from a JSON file"
  >
    <span>{isImporting ? 'Importing...' : 'Import'}</span>
    {isImporting && <LoadingSpinner />}
    {showSuccess && <SuccessCheckmark />}
    <input
      ref={fileInputRef}
      type="file"
      accept=".json"
      onChange={onChange}
      className="hidden"
    />
  </label>
); 