import React from 'react';
import { ExportMenu } from './ExportMenu';

export function TableActions({
  showWeightedScores,
  onToggleWeightedScores,
  tasks,
  dimensions
}) {
  return (
    <div className="flex items-center gap-3">
      <ExportMenu tasks={tasks} dimensions={dimensions} />
      <label className="inline-flex items-center gap-2">
        <span className="text-sm text-gray-600">Show Weighted Scores</span>
        <style>
          {`
            .custom-checkbox {
              accent-color: #5eead4;
            }
            .custom-checkbox:hover {
              accent-color: #2dd4bf;
            }
          `}
        </style>
        <input
          type="checkbox"
          checked={showWeightedScores}
          onChange={(e) => onToggleWeightedScores(e.target.checked)}
          className="w-4 h-4 rounded cursor-pointer custom-checkbox"
        />
      </label>
    </div>
  );
} 