import React from 'react';

export function WeightedScoresToggle({
  showWeightedScores,
  onToggleWeightedScores,
}) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <span className="text-sm text-gray-600">Show Weighted Scores</span>
      <div className="relative">
        <input
          type="checkbox"
          checked={showWeightedScores}
          onChange={(e) => onToggleWeightedScores(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-500 peer-hover:bg-gray-300 peer-checked:peer-hover:bg-teal-600"></div>
      </div>
    </label>
  );
} 
