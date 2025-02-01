import { useState } from 'react';
import { SliderWithControls } from './components/SliderWithControls';

const dimensions = [
  { name: 'difficulty', label: 'Difficulty', weight: -1 },
  { name: 'urgency', label: 'Urgency', weight: 3 },
  { name: 'monetaryBenefit', label: 'Monetary Benefit', weight: 2 },
  { name: 'personalDevelopment', label: 'Personal Development', weight: 1 }
];

export function App() {
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

    setTasks(prev => [...prev, newTask].sort((a, b) => 
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

  const updateTaskValue = (taskIndex, dimension, value) => {
    const newTasks = [...tasks];
    newTasks[taskIndex] = {
      ...tasks[taskIndex],
      [dimension]: value
    };
    setTasks(newTasks.sort((a, b) => calculateImportance(b) - calculateImportance(a)));
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
              <th className="p-2 text-left bg-gray-50">Task Name</th>
              {dimensions.map(dim => (
                <th key={dim.name} className="p-2 text-center bg-gray-50">
                  {dim.label}
                </th>
              ))}
              <th className="p-2 text-center bg-gray-50">Score</th>
              <th className="p-2 text-center bg-gray-50">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="border-t">
                <td className="p-2">{task.name}</td>
                {dimensions.map(dim => (
                  <td key={dim.name} className="p-2 text-center">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={task[dim.name]}
                      onChange={(e) => {
                        const value = Math.min(10, Math.max(0, Number(e.target.value)));
                        updateTaskValue(index, dim.name, value);
                      }}
                      className="w-16 p-1 text-center border rounded"
                    />
                  </td>
                ))}
                <td className="p-2 text-center font-medium">
                  {calculateImportance(task).toFixed(1)}
                </td>
                <td className="p-2 text-center">
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
}