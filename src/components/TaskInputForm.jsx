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
  const handleSliderChange = (dimension, value) => {
    onFormValueChange({
      ...formValues,
      [dimension]: value
    });
  };

  return (
    <div className="input-card">
      <div className="flex justify-between items-start mb-4">
        <div className="input-group flex-1">
          <label htmlFor="taskName" className="input-label">
            Task Name:
          </label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => onTaskNameChange(e.target.value)}
            className="text-input"
            placeholder="Enter task name"
          />
        </div>
        <button
          onClick={onSettingsOpen}
          className="ml-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
          title="Settings"
        >
          <Settings size={20} />
        </button>
      </div>

      <div className="grid gap-2 mb-4">
        {dimensions.map(dim => (
          <SliderWithControls
            key={dim.name}
            name={dim.name}
            label={dim.label}
            weight={dim.weight}
            value={formValues[dim.name]}
            onChange={(value) => handleSliderChange(dim.name, value)}
          />
        ))}
      </div>

      <div className="button-row">
        <button
          onClick={onSubmit}
          className="add-button"
        >
          {editingTaskId ? 'Update Task' : 'Add Task'}
        </button>
        <div className="preview-score">
          Score Preview: <span className="preview-score-value">{previewScore}</span> = {formulaString}
        </div>
      </div>
    </div>
  );
}