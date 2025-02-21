import React, { useState } from 'react';
import { Download, Upload } from 'lucide-react';
import { validateImportData } from '../../utils/validation';

export function DataControls({ onExport, onImport }) {
  const fileInputRef = React.useRef(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setIsImporting(true);
      const text = await file.text();
      const data = JSON.parse(text);
      
      if (validateImportData(data)) {
        await onImport(data);
      }
    } catch (error) {
      console.error('Import error:', error);
      alert(`Import failed: ${error.message}`);
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onExport}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-teal-700 bg-teal-100 hover:bg-teal-200 rounded-md transition-colors"
        title="Export your data as JSON"
      >
        <Download size={16} />
        Export Template
      </button>
      <button
        onClick={handleImportClick}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-teal-700 bg-teal-100 hover:bg-teal-200 rounded-md transition-colors"
        title="Import previously exported data"
        disabled={isImporting}
      >
        <Upload size={16} />
        {isImporting ? 'Importing...' : 'Import Template'}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImport}
        className="hidden"
        accept=".json"
      />
    </div>
  );
} 