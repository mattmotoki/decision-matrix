// components/TaskInputForm.jsx
import React from 'react';
import { Settings } from 'lucide-react';
import { DimensionSlider } from './DimensionManager';

export function TaskInputForm({
  taskName,
  onTaskNameChange,
  dimensions,
  formValues,
  onFormValueChange,
  onSettingsOpen,
  onSubmit,
  editingTaskId,
  previewScore,
  formulaString
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Add New Task</h2>
        <button
          type="button"
          onClick={onSettingsOpen}
          className="p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"
          title="Manage Task Dimensions & Weights"
        >
          <Settings size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
          <input
            type="text"
            value={taskName}
            onChange={(e) => onTaskNameChange(e.target.value)}
            placeholder="Enter task name..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-4 mb-6">
          {dimensions.map(dim => (
            <DimensionSlider
              key={dim.name}
              name={dim.name}
              label={dim.label}
              description={dim.description}
              value={formValues[dim.name]}
              weight={dim.weight}
              onChange={(value) => onFormValueChange({ ...formValues, [dim.name]: value })}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-slate-600 text-base">
            <span className="font-medium">Score Preview: {previewScore}</span>
            <span className="text-base ml-1 text-slate-500"> ({formulaString})</span>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
          >
            {editingTaskId ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
}