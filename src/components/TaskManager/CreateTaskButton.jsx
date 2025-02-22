import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Modal } from '../Modal';
import { TaskForm } from './TaskForm';
import { createFormValues } from '../../utils/taskUtils';

export function CreateTaskButton({
  dimensions,
  onSubmit,
  previewScore,
  formulaString
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [formValues, setFormValues] = useState(createFormValues(dimensions));

  const handleSubmit = (formData) => {
    onSubmit({
      name: taskName.trim() || 'UNNAMED TASK',
      ...formValues,
      ...formData
    });
    handleClose();
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setTaskName('');
    setFormValues(createFormValues(dimensions));
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors"
      >
        <Plus size={20} />
        Create New Task
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Create New Task"
      >
        <TaskForm
          taskName={taskName}
          onTaskNameChange={setTaskName}
          dimensions={dimensions}
          formValues={formValues}
          onFormValueChange={setFormValues}
          onSubmit={handleSubmit}
          submitButtonText="Create Task"
          previewScore={previewScore}
          formulaString={formulaString}
        />
      </Modal>
    </>
  );
} 