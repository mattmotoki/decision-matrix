import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

export function TaskManager({ dimensions, onDimensionsChange }) {
  const [newDimensionName, setNewDimensionName] = useState('');
  const [newDimensionWeight, setNewDimensionWeight] = useState(1);
  const [newDimensionDescription, setNewDimensionDescription] = useState('');

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
      weight: Number(newDimensionWeight),
      description: newDimensionDescription.trim() || 'No description.'
    };

    onDimensionsChange([...dimensions, newDimension]);
    setNewDimensionName('');
    setNewDimensionWeight(1);
    setNewDimensionDescription('');
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

  const handleDescriptionChange = (dimensionName, newDescription) => {
    onDimensionsChange(
      dimensions.map(dim =>
        dim.name === dimensionName
          ? { ...dim, description: newDescription }
          : dim
      )
    );
  };

  return (
    <div className="mb-6 bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4">Manage Dimensions</h2>

      <div className="space-y-4">
        {/* Add New Dimension Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Dimension Name</label>
            <input
              type="text"
              value={newDimensionName}
              onChange={(e) => setNewDimensionName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter dimension name"
            />
          </div>
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <input
                type="text"
                value={newDimensionDescription}
                onChange={(e) => setNewDimensionDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter dimension description"
              />
            </div>
            <div>
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
          </div>
          <div>
            <button
              onClick={handleAddDimension}
              className="w-full md:w-auto px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 flex items-center gap-2 justify-center"
            >
              <Plus size={16} />
              Add Dimension
            </button>
          </div>
        </div>

        {/* Existing Dimensions */}
        <div className="space-y-4 mt-8">
          <h3 className="text-lg font-semibold">Existing Dimensions</h3>
          {dimensions.map(dim => (
            <div key={dim.name} className="flex flex-col gap-2 py-3 border-b">
              <div className="flex items-center justify-between">
                <div className="font-medium">{dim.label}</div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm">Weight:</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={dim.weight}
                      onChange={(e) => handleWeightChange(dim.name, e.target.value)}
                      className="w-16 px-2 py-1 border rounded"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveDimension(dim.name)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Delete dimension"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
              <input
                type="text"
                value={dim.description || ''}
                onChange={(e) => handleDescriptionChange(dim.name, e.target.value)}
                className="w-full px-3 py-2 text-sm bg-gray-50 border rounded-md"
                placeholder="Enter dimension description"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 