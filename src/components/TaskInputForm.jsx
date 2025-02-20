// components/TaskInputForm.jsx
import React, { useState, useEffect } from 'react';
import { Settings, X } from 'lucide-react';
import { DimensionSlider } from './TaskManager';

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
  formulaString,
  task
}) {
  const [description, setDescription] = useState(task?.description || '');
  const [deadline, setDeadline] = useState(task?.deadline || '');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState(task?.tags || []);

  // Update form when task changes (editing mode)
  useEffect(() => {
    if (task) {
      setDescription(task.description || '');
      setDeadline(task.deadline || '');
      setTags(task.tags || []);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      description,
      deadline: deadline || null,
      tags: [...tags]
    });
    // Reset optional fields
    setDescription('');
    setDeadline('');
    setTags([]);
  };

  const handleAddTag = (e) => {
    e.preventDefault();
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
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

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Left Column - Dimension Sliders */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-medium text-gray-700 mb-3">Task Dimensions</h3>
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
            <div className="text-slate-600 text-lg">
              <span className="font-medium">Score Preview: {previewScore}</span>
              <span className="text-base ml-1 text-slate-500"> ({formulaString})</span>
            </div>
          </div>

          {/* Right Column - Optional Fields */}
          <div className="md:col-span-2 space-y-4">

            {/* Description */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Description (optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add task description..."
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Deadline */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Deadline (optional)
              </label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">
                Tags (optional)
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-teal-100 text-teal-700"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 p-0.5 hover:bg-teal-200 rounded-full"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Add a tag..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddTag(e);
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
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