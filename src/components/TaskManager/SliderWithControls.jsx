import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export function DimensionSlider({
  name,
  label,
  description,
  value,
  weight,
  onChange,
  min = 0,
  max = 5
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2">
      {/* Label with tooltip */}
      <label 
        htmlFor={name} 
        className="w-full md:w-50 flex justify-between items-center"
        title={description}
      >
        <span className="font-medium text-gray-900">{label}</span>
        <span className="text-sm text-gray-500 ml-2">(×{weight})</span>
      </label>
      <div className="flex-1 flex items-center gap-2">
        {/* Slider input with teal accent color */}
        <style>
          {`
            input[type="range"]#${name} {
              -webkit-appearance: none;
              appearance: none;
              height: 4px;
              border-radius: 2px;
              background: linear-gradient(to right, #14b8a6 ${(value / max) * 100}%, #f3f4f6 ${(value / max) * 100}%);
            }
            input[type="range"]#${name}::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: #14b8a6;
              cursor: pointer;
            }
            input[type="range"]#${name}::-moz-range-thumb {
              width: 16px;
              height: 16px;
              border: none;
              border-radius: 50%;
              background: #14b8a6;
              cursor: pointer;
            }
            input[type="range"]#${name}:focus {
              outline: none;
            }
          `}
        </style>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          id={name}
          className="w-full"
        />
        {/* Score display */}
        <span
          className="w-12 text-center tabular-nums text-gray-600"
          title={`Score: ${value * weight} = ${value}×${weight}`}
        >
          {value}
        </span>
        {/* Value controls */}
        <div className="flex flex-col">
          <button
            type="button"
            onClick={() => value < max && onChange(value + 1)}
            className="p-0.5 text-gray-500 hover:bg-teal-50 hover:text-teal-600 rounded transition-colors"
            aria-label="Increase value"
          >
            <ChevronUp size={16} />
          </button>
          <button
            type="button"
            onClick={() => value > min && onChange(value - 1)}
            className="p-0.5 text-gray-500 hover:bg-teal-50 hover:text-teal-600 rounded transition-colors"
            aria-label="Decrease value"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
} 