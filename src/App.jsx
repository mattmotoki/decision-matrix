import React, { useState, useEffect } from 'react';
import { TaskInputForm } from './components/TaskInputForm';
import { SettingsModal } from './components/SettingsModal';
import { TaskTable } from './components/TaskTable';
import { TaskArchive } from './components/TaskArchive';
import { useTasks } from './shared/hooks/useTasks';
import { calculateImportance, createFormValues, formatFormulaString } from './utils/taskUtils';
import './App.css';


const initialDimensions = [
  { name: 'easiness', label: 'Easiness', weight: 1, description: "How quickly and easily this can be completed." },
  { name: 'urgency', label: 'Urgency', weight: 3, description: "How time-sensitive or deadline-driven the task is." },
  { name: 'financialGain', label: 'Financial Gain', weight: 2, description: "Expected monetary return or business value." },
  { name: 'personalGrowth', label: 'Personal Growth', weight: 1, description: "Opportunity for learning and skill development." }
];


export function App() {
  // State management
  const [dimensions, setDimensions] = useState(initialDimensions);
  const [taskName, setTaskName] = useState('');
  const [formValues, setFormValues] = useState(createFormValues(dimensions));
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showWeightedScores, setShowWeightedScores] = useState(true);
  
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
    restoreTask
  } = useTasks(dimensions);

  // Update form values when dimensions change
  useEffect(() => {
    setFormValues(prev => {
      const newValues = { ...prev };
      // Add new dimensions with default value
      dimensions.forEach(dim => {
        if (!(dim.name in newValues)) {
          newValues[dim.name] = 0;
        }
      });
      // Remove dimensions that no longer exist
      Object.keys(newValues).forEach(key => {
        if (!dimensions.some(dim => dim.name === key)) {
          delete newValues[key];
        }
      });
      return newValues;
    });
  }, [dimensions]);

  const handleAddOrUpdateTask = () => {
    const finalTaskName = taskName.trim() || 'UNNAMED TASK';
    
    if (editingTaskId) {
      updateTask(editingTaskId, {
        name: finalTaskName,
        ...formValues
      });
    } else {
      addTask({
        name: finalTaskName,
        ...formValues
      });
    }

    // Reset form
    setTaskName('');
    setFormValues(createFormValues(dimensions));
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

  // Calculate preview score and formula string
  const previewScore = calculateImportance(formValues, dimensions);
  const formulaString = formatFormulaString(dimensions, formValues);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-8">
        Decision Matrix – Task Prioritizer
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
        onDeleteTask={deleteTask}
        onEditTask={handleEditTask}
        onCompleteTask={completeTask}
        editingTaskId={editingTaskId}
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

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        dimensions={dimensions}
        onDimensionsChange={setDimensions}
      />
    </div>
  );
}