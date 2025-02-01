import React, { useState, useEffect } from 'react';
import { TaskInputForm } from './components/TaskInputForm';
import { SettingsModal } from './components/SettingsModal';
import { TaskTable } from './components/TaskTable';
import './App.css';

const initialDimensions = [
  { name: 'easiness', label: 'Easiness', weight: 1 },
  { name: 'urgency', label: 'Urgency', weight: 3 },
  { name: 'monetaryBenefit', label: 'Monetary Benefit', weight: 2 },
  { name: 'personalDevelopment', label: 'Personal Development', weight: 1 }
];

export function App() {
  const [dimensions, setDimensions] = useState(initialDimensions);
  const [tasks, setTasks] = useState([]);
  const [formValues, setFormValues] = useState(
    Object.fromEntries(dimensions.map(dim => [dim.name, 5]))
  );
  const [taskName, setTaskName] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    if (taskName === '' && !editingTaskId) {
      setTaskName(`Task ${tasks.length + 1}`);
    }
  }, [tasks.length, taskName, editingTaskId]);

  // Update formValues when dimensions change
  useEffect(() => {
    setFormValues(prev => {
      const newValues = { ...prev };
      dimensions.forEach(dim => {
        if (!(dim.name in newValues)) {
          newValues[dim.name] = 5;
        }
      });
      Object.keys(newValues).forEach(key => {
        if (!dimensions.some(dim => dim.name === key)) {
          delete newValues[key];
        }
      });
      return newValues;
    });

    setTasks(prev => prev.map(task => {
      const updatedTask = { ...task };
      dimensions.forEach(dim => {
        if (!(dim.name in updatedTask)) {
          updatedTask[dim.name] = 0;
        }
      });
      return updatedTask;
    }));
  }, [dimensions]);

  const calculateImportance = (task) => {
    return dimensions.reduce((sum, dim) => {
      return sum + (task[dim.name] * dim.weight);
    }, 0);
  };

  const sortTasks = (tasksToSort) => {
    return [...tasksToSort].sort((a, b) => calculateImportance(b) - calculateImportance(a));
  };

  const isTaskNameDuplicate = (name, excludeId = null) => {
    return tasks.some(task => 
      task.name.toLowerCase() === name.toLowerCase() && task.id !== excludeId
    );
  };

  const handleAddOrUpdateTask = () => {
    if (taskName.trim() === '') {
      alert('Please enter a task name.');
      return;
    }

    if (isTaskNameDuplicate(taskName, editingTaskId)) {
      alert('A task with this name already exists.');
      return;
    }

    if (editingTaskId) {
      setTasks(prev => sortTasks(
        prev.map(task => 
          task.id === editingTaskId
            ? { ...task, name: taskName, ...formValues }
            : task
        )
      ));
      setEditingTaskId(null);
    } else {
      const newTask = {
        id: Date.now(),
        name: taskName,
        ...formValues
      };
      setTasks(prev => sortTasks([...prev, newTask]));
    }

    setTaskName('');
    setFormValues(Object.fromEntries(dimensions.map(dim => [dim.name, 5])));
  };

  const handleDeleteTask = (index) => {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks.splice(index, 1);
      return newTasks;
    });
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task.id);
    setTaskName(task.name);
    setFormValues(
      Object.fromEntries(
        dimensions.map(dim => [dim.name, task[dim.name]])
      )
    );
  };

  const handleSliderChange = (dimension, value) => {
    setFormValues(prev => ({
      ...prev,
      [dimension]: value
    }));
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
        
        <TaskInputForm
          taskName={taskName}
          onTaskNameChange={setTaskName}
          dimensions={dimensions}
          formValues={formValues}
          onFormValueChange={setFormValues}
          onSettingsOpen={() => setIsSettingsOpen(true)}
          onSubmit={handleAddOrUpdateTask}
          editingTaskId={editingTaskId}
          previewScore={previewScore}
          formulaString={formulaString}
        />
  
        <TaskTable
          tasks={tasks}
          dimensions={dimensions}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
          calculateImportance={calculateImportance}
        />
  
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          dimensions={dimensions}
          onDimensionsChange={setDimensions}
        />
      </div>
    );

}