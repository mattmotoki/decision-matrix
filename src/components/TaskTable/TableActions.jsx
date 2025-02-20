import React from 'react';

export function TableActions({
  showWeightedScores,
  onToggleWeightedScores,
}) {
  return (
    <div className="flex items-center">
      <label className="inline-flex items-center gap-2">
        <span className="text-sm text-gray-600">Show Weighted Scores</span>
        <style>
          {`
            .custom-checkbox {
              accent-color: #2dd4bf;
            }
            .custom-checkbox:hover {
              accent-color: #0d9488;
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