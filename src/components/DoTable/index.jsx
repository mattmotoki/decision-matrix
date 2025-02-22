import React, { useState } from 'react';
import { TableHeader } from './TableHeader';
import { WeightedScoresToggle } from './WeightedScoresToggle';
import { TableBody } from './TableBody';
import { ConfirmationModal } from '../ConfirmationModal';
import { Modal } from '../Modal';
import { TaskEditForm } from '../TaskManager';
import { DownloadMenu } from './DownloadMenu';
import { calculateImportance, formatFormulaString } from '../../utils/taskUtils';

export function DoTable({
  tasks,
  dimensions,
  onDeleteTask,
  onEditTask,
  onCompleteTask,
  showWeightedScores,
  onToggleWeightedScores
}) {
  const [deleteTaskIndex, setDeleteTaskIndex] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editFormValues, setEditFormValues] = useState(null);
  const [editTaskName, setEditTaskName] = useState('');

  const handleConfirmDelete = () => {
    if (deleteTaskIndex !== null) {
      onDeleteTask(deleteTaskIndex);
      setDeleteTaskIndex(null);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditTaskName(task.name);
    setEditFormValues(
      Object.fromEntries(
        dimensions.map(dim => [dim.name, task[dim.name]])
      )
    );
    onEditTask(task); // Call this just to maintain compatibility with parent's state
    return {
      description: task.description || '',
      deadline: task.deadline || '',
      tags: task.tags || []
    };
  };

  const handleEditClose = () => {
    setEditingTask(null);
    setEditFormValues(null);
    setEditTaskName('');
  };

  const handleEditSubmit = (formData) => {
    if (editingTask) {
      const updatedTask = {
        ...editingTask,
        name: editTaskName,
        ...editFormValues,
        ...formData
      };
      onEditTask(updatedTask);
      handleEditClose();
    }
  };

  // Calculate preview score and formula string for the edit form
  const editPreviewScore = editFormValues ? calculateImportance(editFormValues, dimensions) : 0;
  const editFormulaString = editFormValues ? formatFormulaString(dimensions, editFormValues) : '';

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <TableHeader />
          <DownloadMenu tasks={tasks} dimensions={dimensions} />
        </div>
        <WeightedScoresToggle
          showWeightedScores={showWeightedScores}
          onToggleWeightedScores={onToggleWeightedScores}
        />
      </div>

      <TableBody
        tasks={tasks}
        dimensions={dimensions}
        showWeightedScores={showWeightedScores}
        onDeleteTask={index => setDeleteTaskIndex(index)}
        onEditTask={handleEditClick}
        onCompleteTask={onCompleteTask}
      />

      <ConfirmationModal
        isOpen={deleteTaskIndex !== null}
        onClose={() => setDeleteTaskIndex(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />

      <Modal
        isOpen={editingTask !== null}
        onClose={handleEditClose}
        title="Edit Task"
      >
        {editingTask && editFormValues && (
          <TaskEditForm
            taskName={editTaskName}
            onTaskNameChange={setEditTaskName}
            dimensions={dimensions}
            formValues={editFormValues}
            onFormValueChange={setEditFormValues}
            onSubmit={handleEditSubmit}
            previewScore={editPreviewScore}
            formulaString={editFormulaString}
            task={editingTask}
          />
        )}
      </Modal>
    </div>
  );
} 