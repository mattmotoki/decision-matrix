import React from 'react';
import { Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { Slider } from '../../shared/components/Slider';

export function DimensionWeightSlider({
  name,
  label,
  value,
  onChange,
  onDelete,
  showDelete = true,
  layout = 'vertical'
}) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete the "${label}" dimension? This action cannot be undone.`)) {
      onDelete();
    }
  };

  const containerClasses = layout === 'vertical' 
    ? 'flex flex-col gap-2' 
    : 'flex flex-row md:items-center gap-2';

  const labelClasses = layout === 'vertical'
    ? 'flex justify-between items-center'
    : 'w-full md:w-40 flex justify-between items-center';

  return (
    <div className={containerClasses}>
      {/* Label with weight */}
      <label 
        htmlFor={name} 
        className={labelClasses}
      >
        <span className="font-sm text-gray-900">{label}</span>
      </label>
      <div className="flex-1 flex items-center gap-2">
        <Slider
          name={`${name}-dimension-weight-slider`}
          value={value}
          onChange={onChange}
          min={1}
          max={5}
        />
        {/* Score display */}
        <span
          className="w-12 text-center tabular-nums text-gray-600"
        >
          {value}
        </span>
        {/* Value controls or delete button */}
        <div className="flex flex-col">
          {showDelete ? (
            <button
              onClick={handleDelete}
              className="p-1 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
              aria-label={`Delete ${label} dimension`}
            >
              <Trash2 size={16} />
            </button>
          ) : (
            <>
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
                onClick={() => value > 1 && onChange(value - 1)}
                className="p-0.5 text-gray-500 hover:bg-teal-50 hover:text-teal-600 rounded transition-colors"
                aria-label="Decrease value"
              >
                <ChevronDown size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 