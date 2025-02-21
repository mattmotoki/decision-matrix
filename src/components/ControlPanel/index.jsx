import React from 'react';
import { Manager } from './Manager';


export function ControlPanel({
  dimensions,
  onDimensionsChange,
  onExport,
  onImport,
  onSave
}) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Control Panel</h2>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <Manager
          dimensions={dimensions}
          onDimensionsChange={onDimensionsChange}
          onExport={onExport}
          onImport={onImport}
          onSave={onSave}
        />
      </div>
    </div>
  );
} 