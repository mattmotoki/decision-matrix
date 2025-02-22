import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { DimensionWeightSlider } from './DimensionWeightSlider';
import { Modal } from '../Modal';

export function EditDimensionsModal({ 
  isOpen, 
  onClose, 
  dimensions, 
  onDimensionsChange 
}) {
  const [localDimensions, setLocalDimensions] = useState(
    dimensions.map(dim => ({
      name: dim.name.toLowerCase().replace(/\s+/g, '_'),
      label: dim.label || dim.name,
      weight: dim.weight
    }))
  );
  const [newName, setNewName] = useState('');
  const [newWeight, setNewWeight] = useState(1);

  // Update local dimensions when props change
  useEffect(() => {
    setLocalDimensions(dimensions.map(dim => ({
      name: dim.name.toLowerCase().replace(/\s+/g, '_'),
      label: dim.label || dim.name,
      weight: dim.weight
    })));
  }, [dimensions]);

  const handleRemoveDimension = (dimensionName) => {
    setLocalDimensions(localDimensions.filter(dim => dim.name !== dimensionName));
  };

  const handleWeightChange = (dimensionName, newWeight) => {
    setLocalDimensions(
      localDimensions.map(dim =>
        dim.name === dimensionName
          ? { ...dim, weight: Number(newWeight) }
          : dim
      )
    );
  };

  const handleCreateDimension = (e) => {
    e.preventDefault();
    if (newName) {
      setLocalDimensions([
        ...localDimensions,
        {
          name: newName.toLowerCase().replace(/\s+/g, '_'),
          label: newName,
          weight: Number(newWeight)
        }
      ]);
      setNewName('');
      setNewWeight(1);
    }
  };

  const handleDone = () => {
    onDimensionsChange(localDimensions);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Template Dimensions"
    >
      <div className="space-y-8">
        {/* New Dimension Section */}
        <div className="space-y-4 pb-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Dimension</h3>
          <form onSubmit={handleCreateDimension} className="space-y-4">
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter dimension name..."
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
              >
                <Plus size={20} />
                Add Dimension
              </button>
            </div>
            <DimensionWeightSlider
              name="newDimensionWeight"
              label="Dimension Weight"
              value={newWeight}
              onChange={setNewWeight}
              layout="horizontal"
              showDelete={false}
            />
          </form>
        </div>

        {/* Existing Dimensions Section */}
        <div className="space-y-4 pb-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Manage Existing Dimensions</h3>
          {localDimensions.map(dim => (
            <div key={dim.name} className="flex-1">
              <DimensionWeightSlider
                name={dim.name}
                label={dim.label}
                value={dim.weight}
                onChange={(value) => handleWeightChange(dim.name, value)}
                onDelete={() => handleRemoveDimension(dim.name)}
                layout="vertical"
                showDelete={true}
              />
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDone}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </Modal>
  );
} 