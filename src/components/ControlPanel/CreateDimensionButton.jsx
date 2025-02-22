import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Modal } from '../Modal';
import { ControlItem } from './ControlItem';
import { DimensionWeightSlider } from './DimensionWeightSlider';

export function CreateDimensionButton({ dimensions, onDimensionsChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [label, setLabel] = useState('');
  const [weight, setWeight] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && label) {
      onDimensionsChange([
        ...dimensions,
        {
          name: name.toLowerCase().replace(/\s+/g, '_'),
          label,
          weight: Number(weight)
        }
      ]);
      setName('');
      setLabel('');
      setWeight(1);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <ControlItem
        icon={Plus}
        label="Create New Dimension"
        description="Add a new dimension to your decision matrix"
        onClick={() => setIsModalOpen(true)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Dimension"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dimension Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter dimension name..."
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <DimensionWeightSlider
              name="newDimensionWeight"
              label="Dimension Weight"
              value={weight}
              onChange={setWeight}
              layout="horizontal"
              showDelete={false}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 rounded-lg transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
} 