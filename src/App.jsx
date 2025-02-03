import React, { useState, useEffect } from 'react';
import { TaskInputForm } from './components/TaskInputForm';
import { SettingsModal } from './components/SettingsModal';
import { TaskTable } from './components/TaskTable';
import { TaskArchive } from './components/TaskArchive';
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
  const [completedTasks, setCompletedTasks] = useState([]);
  const [formValues, setFormValues] = useState(
    Object.fromEntries(dimensions.map(dim => [dim.name, 5]))
  );
  const [taskName, setTaskName] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

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

  const handleAddOrUpdateTask = () => {
    const finalTaskName = taskName.trim() || 'unnamed';
    
    if (editingTaskId) {
      const originalTask = tasks.find(task => task.id === editingTaskId);
      setTasks(prev => sortTasks(
        prev.map(task =>
          task.id === editingTaskId
            ? {
              ...task,
              name: finalTaskName,
              ...formValues,
              createdAt: originalTask.createdAt
            }
            : task
        )
      ));
      setEditingTaskId(null);
    } else {
      const newTask = {
        id: Date.now(),
        name: finalTaskName,
        createdAt: new Date().toISOString(),
        ...formValues
      };
      setTasks(prev => sortTasks([...prev, newTask]));
    }

    setTaskName('');
    setFormValues(Object.fromEntries(dimensions.map(dim => [dim.name, 5])));
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

  const handleCompleteTask = (task) => {
    setTasks(prev => prev.filter(t => t.id !== task.id));
    const completedTask = {
      ...task,
      completedAt: new Date().toISOString()
    };
    setCompletedTasks(prev => [completedTask, ...prev]);
  };

  const handleDeleteTask = (index) => {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks.splice(index, 1);
      return newTasks;
    });
  };

  const handleDeleteCompletedTask = (index) => {
    setCompletedTasks(prev => {
      const newTasks = [...prev];
      newTasks.splice(index, 1);
      return newTasks;
    });
  };

  const handleRestoreTask = (task) => {
    const { completedAt, ...restoredTask } = task;
    setTasks(prev => sortTasks([...prev, restoredTask]));
    setCompletedTasks(prev => prev.filter(t => t.id !== task.id));
  };

  const previewScore = calculateImportance(formValues);
  const formulaString = dimensions
    .map(dim => `${dim.weight}×${formValues[dim.name]}`)
    .join(' + ');

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-8">
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
        onCompleteTask={handleCompleteTask}
        calculateImportance={calculateImportance}
        editingTaskId={editingTaskId}
      />

      <TaskArchive
        tasks={completedTasks}
        dimensions={dimensions}
        onDeleteTask={handleDeleteCompletedTask}
        onRestoreTask={handleRestoreTask}
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