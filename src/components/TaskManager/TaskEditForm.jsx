import React from 'react';
import { TaskForm } from './TaskForm';

export function TaskEditForm({
  taskName,
  onTaskNameChange,
  dimensions,
  formValues,
  onFormValueChange,
  onSubmit,
  previewScore,
  formulaString,
  task
}) {
  const handleSubmit = (formData) => {
    onSubmit(formData);
  };

  return (
    <TaskForm
      taskName={taskName}
      onTaskNameChange={onTaskNameChange}
      dimensions={dimensions}
      formValues={formValues}
      onFormValueChange={onFormValueChange}
      onSubmit={handleSubmit}
      submitButtonText="Update Task"
      previewScore={previewScore}
      formulaString={formulaString}
      initialDescription={task?.description}
      initialDeadline={task?.deadline}
      initialTags={task?.tags}
    />
  );
} 