import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Slider } from '../../shared/components/Slider';

export function TaskValueSlider({
  name,
  label,
  description,
  value,
  weight,
  onChange
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2">
      {/* Label with tooltip */}
      <label 
        htmlFor={name} 
        className="w-full md:w-40 flex justify-between items-center"
        title={description}
      >
        <span className="font-sm text-gray-900">{label}</span>
        <span className="text-sm text-gray-500">(×{weight})</span>
      </label>
      <div className="flex-1 flex items-center gap-2">
        <Slider
          name={`${name}-task-value-slider`}
          value={value}
          onChange={onChange}
          min={0}
          max={5}
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
            onClick={() => value < 5 && onChange(value + 1)}
            className="p-0.5 text-gray-500 hover:bg-teal-50 hover:text-teal-600 rounded transition-colors"
            aria-label="Increase value"
          >
            <ChevronUp size={16} />
          </button>
          <button
            type="button"
            onClick={() => value > 0 && onChange(value - 1)}
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