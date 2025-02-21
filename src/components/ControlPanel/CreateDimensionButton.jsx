import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Modal } from '../Modal';
import { ControlItem } from './ControlItem';

export function CreateDimensionButton({ dimensions, onDimensionsChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [label, setLabel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && label) {
      onDimensionsChange([
        ...dimensions,
        {
          name: name.toLowerCase().replace(/\s+/g, '_'),
          label,
          weight: 1
        }
      ]);
      setName('');
      setLabel('');
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <ControlItem
        icon={Plus}
        label="Create Dimension"
        description="Add a new dimension to your decision matrix"
        onClick={() => setIsModalOpen(true)}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Dimension"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              placeholder="e.g. cost_effectiveness"
              required
            />
          </div>
          <div>
            <label htmlFor="label" className="block text-sm font-medium text-gray-700">
              Label
            </label>
            <input
              type="text"
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              placeholder="e.g. Cost Effectiveness"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
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