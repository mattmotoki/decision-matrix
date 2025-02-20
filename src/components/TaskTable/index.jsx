import React, { useState } from 'react';
import { TableHeader } from './TableHeader';
import { TableActions } from './TableActions';
import { TableBody } from './TableBody';
import { ConfirmationModal } from '../ConfirmationModal';

export function TaskTable({
  tasks,
  dimensions,
  onDeleteTask,
  onEditTask,
  onCompleteTask,
  editingTaskId,
  showWeightedScores,
  onToggleWeightedScores
}) {
  const [deleteTaskIndex, setDeleteTaskIndex] = useState(null);
  const visibleTasks = tasks.filter(task => task.id !== editingTaskId);

  const handleConfirmDelete = () => {
    if (deleteTaskIndex !== null) {
      onDeleteTask(deleteTaskIndex);
      setDeleteTaskIndex(null);
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <TableHeader />
        <TableActions
          showWeightedScores={showWeightedScores}
          onToggleWeightedScores={onToggleWeightedScores}
          tasks={visibleTasks}
          dimensions={dimensions}
        />
      </div>

      <TableBody
        tasks={visibleTasks}
        dimensions={dimensions}
        showWeightedScores={showWeightedScores}
        onDeleteTask={index => setDeleteTaskIndex(index)}
        onEditTask={onEditTask}
        onCompleteTask={onCompleteTask}
        editingTaskId={editingTaskId}
      />

      <ConfirmationModal
        isOpen={deleteTaskIndex !== null}
        onClose={() => setDeleteTaskIndex(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </div>
  );
} 