// components/SettingsModal.jsx
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { ConfirmationModal } from './ConfirmationModal';

export function SettingsModal({ isOpen, onClose, dimensions, onDimensionsChange }) {
  const [newDimensionName, setNewDimensionName] = useState('');
  const [newDimensionWeight, setNewDimensionWeight] = useState(1);
  const [newDimensionDescription, setNewDimensionDescription] = useState('');
  const [deletingDimension, setDeletingDimension] = useState(null);

  if (!isOpen) return null;

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

  const handleConfirmDelete = () => {
    if (deletingDimension) {
      onDimensionsChange(dimensions.filter(dim => dim.name !== deletingDimension));
      setDeletingDimension(null);
    }
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
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="absolute inset-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl">
        <div className="relative bg-white rounded-lg shadow-lg flex flex-col max-h-[calc(100vh-2rem)]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Task Settings</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">New Dimension</h3>

              {/* Add New Dimension Form */}
              <div className="space-y-4 mb-8">
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
                    className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2 justify-center"
                  >
                    <Plus size={16} />
                    Add Dimension
                  </button>
                </div>
              </div>

              {/* Existing Dimensions */}
              <div className="space-y-1">
                <h3 className="text-lg font-semibold mb-4">Existing Dimensions</h3>
                <div className="space-y-6">
                  {dimensions.map(dim => (
                    <div key={dim.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{dim.label}</div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <label className="text-sm">Weight:</label>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={dim.weight}
                              onChange={(e) => handleWeightChange(dim.name, e.target.value)}
                              className="w-12 px-2 py-1 border-b border-gray-200 focus:border-b-gray-300 focus:outline-none transition-colors"
                            />
                          </div>
                          <button
                            onClick={() => setDeletingDimension(dim.name)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={dim.description || ''}
                          onChange={(e) => handleDescriptionChange(dim.name, e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-transparent border border-gray-200 rounded-md focus:border-gray-300 focus:outline-none transition-colors"
                          placeholder="Enter dimension description"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 p-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={deletingDimension !== null}
        onClose={() => setDeletingDimension(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Dimension"
        message="Are you sure you want to delete this dimension? This action cannot be undone and will affect all tasks in existing and completed tasks."
      />
    </div>
  );
}