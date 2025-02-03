// shared/hooks/useTasks.jsx
import { useState, useEffect } from 'react';
import { sortTasksByImportance } from '../../utils/taskUtils';

export function useTasks(dimensions) {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);

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
    restoreTask
  };
}