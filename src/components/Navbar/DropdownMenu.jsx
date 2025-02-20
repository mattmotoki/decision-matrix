import React from 'react';
import { SaveMenuItem, ExportMenuItem, ImportMenuItem } from './MenuItems';

export const DropdownMenu = ({
  isOpen,
  menuRef,
  onSave,
  onExport,
  onImport,
  isSaving,
  showSaveSuccess,
  isImporting,
  showImportSuccess,
  fileInputRef
}) => (
  <div
    ref={menuRef}
    className={`
      ${isOpen ? 'block' : 'hidden'}
      absolute right-2 top-20 mt-2 w-48
      rounded-md shadow-lg bg-slate-900 ring-1 ring-black ring-opacity-5
      z-50
    `}
  >
    <div className="py-1" role="menu" aria-orientation="vertical">
      <SaveMenuItem
        onClick={onSave}
        isSaving={isSaving}
        showSuccess={showSaveSuccess}
        disabled={isSaving}
      />
      <ExportMenuItem onClick={onExport} />
      <ImportMenuItem
        isImporting={isImporting}
        showSuccess={showImportSuccess}
        fileInputRef={fileInputRef}
        onChange={onImport}
      />
    </div>
  </div>
); 