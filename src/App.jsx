import React, { useState } from 'react';
import { CreateTaskButton } from './components/TaskManager';
import { TaskTable } from './components/TaskTable';
import { TaskArchive } from './components/TaskArchive';
import { Navbar } from './components/Navbar';
import { ControlPanel } from './components/ControlPanel';
import { useTasks } from './shared/hooks/useTasks';
import { useDimensions } from './shared/hooks/useDimensions';
import { calculateImportance, createFormValues, formatFormulaString } from './utils/taskUtils';
import './App.css';



export function App() {
  // State management
  const [dimensions, setDimensions] = useDimensions();
  const [showWeightedScores, setShowWeightedScores] = useState(() => {
    const saved = localStorage.getItem('decision-matrix-show-weighted-scores');
    return saved ? JSON.parse(saved) : true;
  });
  
  // Custom hook for task management
  const {
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
    saveToLocalStorage,
    setTasks,
    setCompletedTasks
  } = useTasks(dimensions);

  // Calculate preview score and formula string for task creation
  const previewScore = calculateImportance(createFormValues(dimensions), dimensions);
  const formulaString = formatFormulaString(dimensions, createFormValues(dimensions));

  const handleEditTask = (task) => {
    // We now only need to handle the actual task update
    const updatedTasks = tasks.map(t => 
      t.id === task.id ? { ...t, ...task } : t
    );
    setTasks(updatedTasks);
  };

  const handleImport = (data) => {
    // Update dimensions first
    setDimensions(data.dimensions);
    
    // Update tasks with the new scores format
    const processTask = (task) => ({
      id: task.id,
      name: task.name,
      createdAt: task.createdAt,
      description: task.description,
      deadline: task.deadline,
      tags: task.tags || [],
      // Ensure all dimensions have values
      ...Object.fromEntries(data.dimensions.map(dim => [dim.name, 0])), // Default values
      ...task.scores, // Override with actual scores
      ...(task.completedAt ? { completedAt: task.completedAt } : {})
    });

    // Set active and completed tasks
    const activeTasks = data.activeTasks.map(processTask);
    const completedTasks = data.completedTasks.map(processTask);
    
    // Update tasks state
    setTasks(activeTasks);
    setCompletedTasks(completedTasks);
    
    // Update settings
    if (data.settings?.showWeightedScores !== undefined) {
      setShowWeightedScores(data.settings.showWeightedScores);
    }
    
    // Reset form values to match new dimensions
    setFormValues(createFormValues(data.dimensions));
    setTaskName('');
    setEditingTaskId(null);
  };

  const handleExport = () => {
    const data = {
      metadata: {
        exportDate: new Date().toISOString(),
        totalActiveTasks: tasks.length,
        totalCompletedTasks: completedTasks.length
      },
      settings: {
        showWeightedScores
      },
      dimensions: dimensions.map(dim => ({
        name: dim.name,
        label: dim.label,
        weight: dim.weight,
        description: dim.description
      })),
      activeTasks: tasks.map(task => ({
        id: task.id,
        name: task.name,
        createdAt: task.createdAt,
        description: task.description,
        deadline: task.deadline,
        tags: task.tags || [],
        scores: Object.fromEntries(
          dimensions.map(dim => [dim.name, task[dim.name]])
        )
      })),
      completedTasks: completedTasks.map(task => ({
        id: task.id,
        name: task.name,
        createdAt: task.createdAt,
        completedAt: task.completedAt,
        description: task.description,
        deadline: task.deadline,
        tags: task.tags || [],
        scores: Object.fromEntries(
          dimensions.map(dim => [dim.name, task[dim.name]])
        )
      }))
    };

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = `2dotable-template-${timestamp}.json`;
      document.body.appendChild(a);
      a.click();
    } finally {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onSave={() => {
          saveToLocalStorage(showWeightedScores);
          return Promise.resolve();
        }}
        onImport={handleImport}
        onExport={handleExport}
        tasks={tasks}
        completedTasks={completedTasks}
        dimensions={dimensions}
        showWeightedScores={showWeightedScores}
      />
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        
        <ControlPanel
          dimensions={dimensions}
          onDimensionsChange={setDimensions}
          onExport={handleExport}
          onImport={handleImport}
          onSave={() => {
            saveToLocalStorage(showWeightedScores);
            return Promise.resolve();
          }}
        />

        <div className="mt-8 flex justify-end">
          <CreateTaskButton
            dimensions={dimensions}
            onSubmit={addTask}
            previewScore={previewScore}
            formulaString={formulaString}
          />
        </div>

        <TaskTable
          tasks={tasks}
          dimensions={dimensions}
          onDeleteTask={deleteTask}
          onEditTask={handleEditTask}
          onCompleteTask={completeTask}
          showWeightedScores={showWeightedScores}
          onToggleWeightedScores={(value) => setShowWeightedScores(value)}
        />

        <TaskArchive
          tasks={completedTasks}
          dimensions={dimensions}
          onDeleteTask={deleteCompletedTask}
          onRestoreTask={restoreTask}
          showWeightedScores={showWeightedScores}
        />
      </div>
    </div>
  );
}