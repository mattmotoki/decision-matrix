import React from 'react';

export function Slider({
  name,
  value,
  onChange,
  min = 0,
  max = 5,
  trackColor = '#14b8a6'
}) {
  // Calculate the percentage for the colored portion
  const coloredPercentage = value === min ? 0 : ((value - min) / (max - min)) * 100;

  return (
    <div className="flex-1 flex items-center gap-2">
      <style>
        {`
          input[type="range"]#${name} {
            -webkit-appearance: none;
            appearance: none;
            height: 4px;
            border-radius: 2px;
            background: linear-gradient(to right, ${trackColor} ${coloredPercentage}%, #f3f4f6 ${coloredPercentage}%);
          }
          input[type="range"]#${name}::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: ${trackColor};
            cursor: pointer;
          }
          input[type="range"]#${name}::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border: none;
            border-radius: 50%;
            background: ${trackColor};
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
    </div>
  );
} 