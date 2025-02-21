import React from 'react';
import { X } from 'lucide-react';
import { Slider } from '../../shared/components/Slider';

export function DimensionWeightSlider({
  name,
  label,
  value,
  onChange,
  onDelete,
  showDelete = false
}) {
  return (
    <div className="flex flex-col items-start gap-2"> 
      <label 
        htmlFor={name} 
        className="w-32 font-sm text-gray-900"
      >
        {label}
      </label>
      <div className="flex items-center gap-2 w-full"> 
        <Slider
          name={`${name}-dimension-weight-slider`}
          value={value}
          onChange={onChange}
          min={1}
          max={5}
        />
        <span className="w-8 text-center text-gray-500">{value}</span>
        {showDelete && onDelete && (
          <button
            onClick={onDelete}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete dimension"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
} 