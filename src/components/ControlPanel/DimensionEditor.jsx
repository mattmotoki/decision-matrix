import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DimensionWeightSlider } from './DimensionWeightSlider';
import { Modal } from '../Modal';

export function EditDimensionsModal({ 
  isOpen, 
  onClose, 
  dimensions, 
  onDimensionsChange 
}) {
  const [newName, setNewName] = useState('');
  const [newWeight, setNewWeight] = useState(1);

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

  const handleCreateDimension = (e) => {
    e.preventDefault();
    if (newName) {
      onDimensionsChange([
        ...dimensions,
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Dimensions"
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
          {dimensions.map(dim => (
            <div key={dim.name} className="flex-1">
              <DimensionWeightSlider
                name={`${dim.name}-edit-dimension-weight`}
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
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
} 