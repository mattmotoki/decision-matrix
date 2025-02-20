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
        <span className="text-sm text-gray-600">Show weighted scores</span>
        <input
          type="checkbox"
          checked={showWeightedScores}
          onChange={(e) => onToggleWeightedScores(e.target.checked)}
          className="form-checkbox h-4 w-4 text-blue-500"
        />
      </label>
    </div>
  );
} 