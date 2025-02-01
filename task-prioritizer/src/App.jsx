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

  // Set default task name when component mounts or tasks change
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

  const handleAddTask = () => {
    if (taskName.trim() === '') {
      alert('Please enter a task name.');
      return;
    }

    const newTask = {
      name: taskName,
      ...formValues
    };

    setTasks(prev => [...prev, newTask].sort((a, b) => 
      calculateImportance(b) - calculateImportance(a)
    ));
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
    setTasks(newTasks.sort((a, b) => calculateImportance(b) - calculateImportance(a)));
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
              label={`${dim.label} (${dim.weight > 0 ? '×' : ''}${dim.weight})`}
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

      <div className="overflow-x-auto">
        <table className="task-table">
          <thead>
            <tr>
              <th className="table-header-cell text-left">Task Name</th>
              {dimensions.map(dim => (
                <th key={dim.name} className="table-header-cell">
                  {dim.label}
                </th>
              ))}
              <th className="table-header-cell">Score</th>
              <th className="table-header-cell">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr 
                key={index} 
                className="table-row hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="table-cell">{task.name}</td>
                {dimensions.map(dim => (
                  <td key={dim.name} className="table-cell text-center">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={task[dim.name]}
                      onChange={(e) => {
                        const value = Math.min(10, Math.max(0, Number(e.target.value)));
                        updateTaskValue(index, dim.name, value);
                      }}
                      className="number-input"
                    />
                  </td>
                ))}
                <td className="table-cell text-center score-value">
                  {calculateImportance(task).toFixed(1)}
                </td>
                <td className="table-cell text-center">
                  <button
                    onClick={() => handleDeleteTask(index)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}