import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export function SliderWithControls({ 
  name,
  label, 
  value,
  weight,
  onChange,
  min = 0,
  max = 10
}) {
  const weightedScore = value * weight;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2">
      <label htmlFor={name} className="w-full md:w-60 flex justify-between items-center">
        <span className="font-medium">{label}</span>
        <span className="text-sm text-gray-500 ml-2">(×{weight})</span>
      </label>
      <div className="flex-1 flex items-center gap-2">
        <div className="flex-1 relative pt-6">
          {/* Value label */}
          <div 
            className="absolute top-0 text-sm text-gray-600 transform -translate-x-1/2 tabular-nums"
            style={{ left: `${percentage}%` }}
          >
            {value}
          </div>

          {/* Slider input */}
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            id={name}
            className="w-full"
          />
        </div>

        {/* Score display */}
        <span className="w-12 text-center tabular-nums text-gray-600">
          {weightedScore}
        </span>

        {/* Value controls */}
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => value < max && onChange(value + 1)}
            className="p-0.5 hover:bg-gray-100 rounded"
            aria-label="Increase value"
          >
            <ChevronUp size={16} />
          </button>
          <button
            type="button"
            onClick={() => value > min && onChange(value - 1)}
            className="p-0.5 hover:bg-gray-100 rounded"
            aria-label="Decrease value"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SliderWithControls;