import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export function SliderWithControls({ 
  name,
  label, 
  value, 
  onChange,
  min = 0,
  max = 10
}) {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    setCurrentValue(newValue);
    onChange(newValue);
  };

  const incrementValue = () => {
    if (currentValue < max) {
      const newValue = currentValue + 1;
      setCurrentValue(newValue);
      onChange(newValue);
    }
  };

  const decrementValue = () => {
    if (currentValue > min) {
      const newValue = currentValue - 1;
      setCurrentValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor={name} className="w-52">
        {label}:
      </label>
      <div className="flex-1 flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          value={currentValue}
          onChange={handleSliderChange}
          id={name}
          className="flex-1"
        />
        <span className="min-w-8 text-center">{currentValue}</span>
        <div className="flex flex-col">
          <button
            onClick={incrementValue}
            className="p-0.5 hover:bg-gray-100 rounded"
            aria-label="Increase value"
          >
            <ChevronUp size={16} />
          </button>
          <button
            onClick={decrementValue}
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