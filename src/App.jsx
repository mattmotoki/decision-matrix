import React, { useState, useEffect } from 'react';
import { SliderWithControls } from './components/SliderWithControls';
import './App.css';

const dimensions = [
  { name: 'easiness', label: 'Easiness', weight: 1 },
  { name: 'urgency', label: 'Urgency', weight: 3 },
  { name: 'monetaryBenefit', label: 'Monetary Benefit', weight: 2 },
  { name: 'personalDevelopment', label: 'Personal Development', weight: 1 }
];

export function App() {
  const [tasks, setTasks] = useState([]);
  const [formValues, setFormValues] = useState(
    Object.fromEntries(dimensions.map(dim => [dim.name, 5]))
  );
  const [taskName, setTaskName] = useState('');
  const [activeRowIndex, setActiveRowIndex] = useState(null);

  useEffect(() => {
    if (taskName === '') {
      setTaskName(`Task ${tasks.length + 1}`);
    }
  }, [tasks.length, taskName]);

  const calculateImportance = (task) => {
    return dimensions.reduce((sum, dim) => {
      return sum + (task[dim.name] * dim.weight);
    }, 0);
  };

  const sortTasks = (tasksToSort) => {
    return [...tasksToSort].sort((a, b) => calculateImportance(b) - calculateImportance(a));
  };

  const handleAddTask = () => {
    if (taskName.trim() === '') {
      alert('Please enter a task name.');
      return;
    }

    const newTask = {
      id: Date.now(),
      name: taskName,
      ...formValues
    };

    setTasks(prev => sortTasks([...prev, newTask]));
    setTaskName('');
    setFormValues(Object.fromEntries(dimensions.map(dim => [dim.name, 5])));
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleSliderChange = (dimension, value) => {
    setFormValues(prev => ({
      ...prev,
      [dimension]: value
    }));
  };

  const updateTaskValue = (taskIndex, dimension, value) => {
    const newTasks = [...tasks];
    newTasks[taskIndex] = {
      ...tasks[taskIndex],
      [dimension]: value
    };
    setTasks(newTasks);
  };

  const handleRowFocus = (index) => {
    setActiveRowIndex(index);
  };

  const handleRowLeave = () => {
    if (activeRowIndex !== null) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      setTasks(prev => sortTasks(prev));
      setActiveRowIndex(null);
    }
  };

  const previewScore = calculateImportance(formValues);
  const formulaString = dimensions
    .map(dim => `${dim.weight}×${formValues[dim.name]}`)
    .join(' + ');

  return (
    <div className="task-prioritizer">
      <h1 className="page-title">
        Decision Matrix Task Prioritizer
      </h1>
      
      <div className="input-card">
        <div className="input-group">
          <label htmlFor="taskName" className="input-label">
            Task Name:
          </label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="text-input"
            placeholder="Enter task name"
          />
        </div>

        <div className="grid gap-2">
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
            onClick={handleAddTask}
            className="add-button"
          >
            Add Task
          </button>
          <div className="preview-score">
            <div>Score Preview: <span className="preview-score-value">{previewScore.toFixed(1)}</span> = {formulaString}</div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Task Name</th>
              {dimensions.map(dim => (
                <th key={dim.name} className="px-4 py-2 text-center font-medium text-gray-700 w-32">
                  {dim.label}
                </th>
              ))}
              <th className="px-4 py-2 text-center font-medium text-gray-700 w-24">Score</th>
              <th className="px-4 py-2 text-center font-medium text-gray-700 w-24">Actions</th>
            </tr>
          </thead>
        </table>
        
        {/* Separate container for animated tbody */}
        <div className="relative" style={{ height: `${tasks.length * 48}px`, minHeight: '0px' }}>
          {tasks.map((task, index) => (
            <div 
              key={task.id}
              className={`absolute w-full transition-transform duration-300 ease-in-out border-t border-gray-200 ${
                activeRowIndex === index ? 'bg-blue-50' : 'hover:bg-gray-50'
              }`}
              style={{ transform: `translateY(${index * 48}px)` }}
              onMouseLeave={handleRowLeave}
            >
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="px-4 py-2">{task.name}</td>
                    {dimensions.map(dim => (
                      <td key={dim.name} className="px-4 py-2 text-center w-32">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={task[dim.name]}
                          onChange={(e) => {
                            const value = Math.min(10, Math.max(0, Number(e.target.value)));
                            updateTaskValue(index, dim.name, value);
                          }}
                          onFocus={() => handleRowFocus(index)}
                          className="w-16 px-2 py-1 text-center border border-gray-300 rounded"
                        />
                      </td>
                    ))}
                    <td className="px-4 py-2 text-center font-medium w-24">
                      {calculateImportance(task).toFixed(1)}
                    </td>
                    <td className="px-4 py-2 text-center w-24">
                      <button
                        onClick={() => handleDeleteTask(index)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}