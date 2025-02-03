// components/TaskInputForm.jsx
import React from 'react';
import { Settings } from 'lucide-react';
import { SliderWithControls } from './SliderWithControls';

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
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-4 md:p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-start gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="taskName" className="block font-medium mb-1">
            Task Name:
          </label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => onTaskNameChange(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter task name"
          />
        </div>
        <button
          type="button"
          onClick={onSettingsOpen}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full self-start"
          title="Settings"
        >
          <Settings size={20} />
        </button>
      </div>

      <div className="space-y-4 mb-6">
        {dimensions.map(dim => (
          <SliderWithControls
            key={dim.name}
            name={dim.name}
            label={dim.label}
            weight={dim.weight}
            value={formValues[dim.name]}
            onChange={(value) => onFormValueChange({ ...formValues, [dim.name]: value })}
          />
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <button
          type="submit"
          className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {editingTaskId ? 'Update Task' : 'Add Task'}
        </button>
        <div className="text-gray-600 text-center md:text-left">
          Score Preview: <span className="font-medium">{previewScore}</span>
          <span className="text-sm text-gray-500 ml-2">({formulaString})</span>
        </div>
      </div>
    </form>
  );
}