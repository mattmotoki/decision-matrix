import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';


export function DimensionManager({ dimensions, onDimensionsChange }) {
  const [newDimensionName, setNewDimensionName] = useState('');
  const [newDimensionWeight, setNewDimensionWeight] = useState(1);

  const handleAddDimension = () => {
    if (newDimensionName.trim() === '') {
      alert('Please enter a dimension name.');
      return;
    }

    const dimensionKey = newDimensionName.toLowerCase().replace(/\s+/g, '');

    if (dimensions.some(dim => dim.name === dimensionKey)) {
      alert('A dimension with this name already exists.');
      return;
    }

    const newDimension = {
      name: dimensionKey,
      label: newDimensionName.trim(),
      weight: Number(newDimensionWeight)
    };

    onDimensionsChange([...dimensions, newDimension]);
    setNewDimensionName('');
    setNewDimensionWeight(1);
  };

  const handleRemoveDimension = (dimensionName) => {
    onDimensionsChange(dimensions.filter(dim => dim.name !== dimensionName));
  };

  const handleWeightChange = (dimensionName, newWeight) => {
    onDimensionsChange(
      dimensions.map(dim =>
        dim.name === dimensionName
          ? { ...dim, weight: Number(newWeight) }
          : dim
      )
    );
  };

  return (
    <div className="mb-6 bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Manage Dimensions</h2>

      <div className="space-y-4">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Dimension Name</label>
            <input
              type="text"
              value={newDimensionName}
              onChange={(e) => setNewDimensionName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter dimension name"
            />
          </div>
          <div className="w-32">
            <label className="block text-sm font-medium mb-1">Weight</label>
            <input
              type="number"
              min="1"
              max="10"
              value={newDimensionWeight}
              onChange={(e) => setNewDimensionWeight(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            onClick={handleAddDimension}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
          >
            <Plus size={16} />
            Add
          </button>
        </div>

        <div className="space-y-2">
          {dimensions.map(dim => (
            <div key={dim.name} className="flex items-center gap-4 py-2 border-b">
              <div className="flex-1 font-medium">{dim.label}</div>
              <div className="w-32 flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={dim.weight}
                  onChange={(e) => handleWeightChange(dim.name, e.target.value)}
                  className="w-20 px-2 py-1 border rounded-md"
                />
                <span className="text-sm text-gray-500">×</span>
              </div>
              <button
                onClick={() => handleRemoveDimension(dim.name)}
                className="p-1 text-gray-500 hover:text-red-500 rounded-full hover:bg-red-50"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}