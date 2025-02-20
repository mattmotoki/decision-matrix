// shared/hooks/useTasks.jsx
import { useState, useEffect } from 'react';
import { sortTasksByImportance } from '../../utils/taskUtils';

const STORAGE_KEYS = {
  ACTIVE_TASKS: 'decision-matrix-tasks',
  COMPLETED_TASKS: 'decision-matrix-completed-tasks',
  SHOW_WEIGHTED_SCORES: 'decision-matrix-show-weighted-scores'
};

export function useTasks(dimensions) {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEYS.ACTIVE_TASKS);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [completedTasks, setCompletedTasks] = useState(() => {
    const savedCompletedTasks = localStorage.getItem(STORAGE_KEYS.COMPLETED_TASKS);
    return savedCompletedTasks ? JSON.parse(savedCompletedTasks) : [];
  });
  
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Remove auto-save effects
  const saveToLocalStorage = (showWeightedScores) => {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TASKS, JSON.stringify(tasks));
    localStorage.setItem(STORAGE_KEYS.COMPLETED_TASKS, JSON.stringify(completedTasks));
    localStorage.setItem(STORAGE_KEYS.SHOW_WEIGHTED_SCORES, JSON.stringify(showWeightedScores));
  };

  const updateTasksWithNewDimension = (tasks) => {
    return tasks.map(task => {
      const updatedTask = { ...task };
      dimensions.forEach(dim => {
        if (typeof updatedTask[dim.name] === 'undefined') {
          updatedTask[dim.name] = 0;
        }
      });
      return updatedTask;
    });
  };

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...task
    };
    dimensions.forEach(dim => {
      if (typeof newTask[dim.name] === 'undefined') {
        newTask[dim.name] = 0;
      }
    });
    setTasks(prev => sortTasksByImportance([...prev, newTask], dimensions));
  };

    
  const updateTask = (taskId, updatedData) => {
    setTasks(prev => 
      sortTasksByImportance(
        prev.map(task =>
          task.id === taskId
            ? { ...task, ...updatedData }
            : task
        ),
        dimensions
      )
    );
    setEditingTaskId(null);
  };

  const completeTask = (task) => {
    setTasks(prev => prev.filter(t => t.id !== task.id));
    const completedTask = {
      ...task,
      completedAt: new Date().toISOString()
    };
    setCompletedTasks(prev => [completedTask, ...prev]);
  };

  const deleteTask = (index) => {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks.splice(index, 1);
      return newTasks;
    });
  };

  const deleteCompletedTask = (index) => {
    setCompletedTasks(prev => {
      const newTasks = [...prev];
      newTasks.splice(index, 1);
      return newTasks;
    });
  };

  const restoreTask = (task) => {
    const { completedAt, ...restoredTask } = task;
    setTasks(prev => sortTasksByImportance([...prev, restoredTask], dimensions));
    setCompletedTasks(prev => prev.filter(t => t.id !== task.id));
  };
 
  useEffect(() => {
    setTasks(prev => updateTasksWithNewDimension(prev));
    setCompletedTasks(prev => updateTasksWithNewDimension(prev));
  }, [dimensions]);  

  return {
    tasks,
    completedTasks,
    editingTaskId,
    setEditingTaskId,
    addTask,
    updateTask,
    completeTask,
    deleteTask,
    deleteCompletedTask,
    restoreTask,
    saveToLocalStorage
  };
}