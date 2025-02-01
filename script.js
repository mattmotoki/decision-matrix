import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const SliderWithControls = ({ 
  name,
  label, 
  weight, 
  value, 
  onChange,
  min = 0,
  max = 10
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleSliderChange = (e) => {
    const newValue = parseInt(e.target.value);
    setCurrentValue(newValue);
    onChange(newValue);
  };

  const incrementValue = () => {
    if (currentValue < max) {
      const newValue = currentValue + 1;
      setCurrentValue(newValue);
      onChange(newValue);
    }
  };

  const decrementValue = () => {
    if (currentValue > min) {
      const newValue = currentValue - 1;
      setCurrentValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="flex items-center gap-2 mb-2">
      <label htmlFor={name} className="min-w-40">
        {label} ({weight > 0 ? '+' : ''}{weight}):
      </label>
      <div className="flex-1 flex items-center gap-2">
        <input
          type="range"
          min={min}
          max={max}
          value={currentValue}
          onChange={handleSliderChange}
          id={name}
          className="flex-1"
        />
        <span className="min-w-8 text-center">{currentValue}</span>
        <div className="flex flex-col">
          <button
            onClick={incrementValue}
            className="p-0.5 hover:bg-gray-100 rounded"
            aria-label="Increase value"
          >
            <ChevronUp size={16} />
          </button>
          <button
            onClick={decrementValue}
            className="p-0.5 hover:bg-gray-100 rounded"
            aria-label="Decrease value"
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Main app component that uses the enhanced slider
const TaskPrioritizer = () => {
  const dimensions = [
    { name: 'difficulty', label: 'Difficulty', weight: -1 },
    { name: 'urgency', label: 'Urgency', weight: 3 },
    { name: 'monetaryBenefit', label: 'Monetary Benefit', weight: 2 },
    { name: 'personalDevelopment', label: 'Personal Development', weight: 1 }
  ];

  const [tasks, setTasks] = useState([]);
  const [formValues, setFormValues] = useState(
    Object.fromEntries(dimensions.map(dim => [dim.name, 0]))
  );
  const [taskName, setTaskName] = useState('');

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

    setTasks([...tasks].sort((a, b) => 
      calculateImportance(b) - calculateImportance(a)
    ));
    setTaskName('');
    setFormValues(Object.fromEntries(dimensions.map(dim => [dim.name, 0])));
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-8">
        Decision Matrix Task Prioritizer
      </h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="mb-4">
          <label htmlFor="taskName" className="block font-bold mb-2">
            Task Name:
          </label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter task name"
          />
        </div>

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

        <button
          onClick={handleAddTask}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white rounded-lg shadow">
          <thead>
            <tr>
              <th className="p-3 text-left bg-gray-50">Task Name</th>
              {dimensions.map(dim => (
                <th key={dim.name} className="p-3 text-center bg-gray-50">
                  {dim.label}
                </th>
              ))}
              <th className="p-3 text-center bg-gray-50">Importance Score</th>
              <th className="p-3 text-center bg-gray-50">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="border-t">
                <td className="p-3">{task.name}</td>
                {dimensions.map(dim => (
                  <td key={dim.name} className="p-3 text-center">
                    <SliderWithControls
                      name={`${task.name}-${dim.name}`}
                      label=""
                      weight={dim.weight}
                      value={task[dim.name]}
                      onChange={(value) => {
                        const newTasks = [...tasks];
                        newTasks[index] = {
                          ...task,
                          [dim.name]: value
                        };
                        setTasks(newTasks);
                      }}
                    />
                  </td>
                ))}
                <td className="p-3 text-center">
                  {calculateImportance(task).toFixed(2)}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleDeleteTask(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
};

export default TaskPrioritizer;