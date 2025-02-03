// components/TaskTable.jsx
import React, { useState } from 'react';
import { Edit, Trash2, CheckCircle } from 'lucide-react';
import { ConfirmationModal } from './ConfirmationModal';
import { DimensionScore, ImportanceScore } from './ScoreDisplay';

export function TaskTable({
  tasks,
  dimensions,
  onDeleteTask,
  onEditTask,
  onCompleteTask,
  editingTaskId
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
      <h2 className="text-xl font-semibold mb-4">Tasks in Progress</h2>
      <div className="w-full overflow-x-auto rounded-lg shadow bg-white">
        <table className="w-full min-w-[768px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-700 w-48">Task Name</th>
              <th className="px-4 py-2 text-center font-medium text-gray-700 w-32">Date Created</th>
              {dimensions.map(dim => (
                <th 
                  key={dim.name} 
                  className="px-4 py-2 text-center font-medium text-gray-700 w-32"
                  title={dim.description}
                >
                  {dim.label}
                </th>
              ))}
              <th className="px-4 py-2 text-center font-medium text-gray-700 w-24">Score</th>
              <th className="px-4 py-2 text-center font-medium text-gray-700 w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y divide-gray-200">
            {visibleTasks.map((task, index) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 truncate">{task.name}</td>
                <td
                  className="px-4 py-2 text-center text-sm"
                  title={new Date(task.createdAt).toLocaleString()}
                >
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>
                {dimensions.map(dim => (
                  <td key={dim.name} className="px-4 py-2 text-center">
                    <DimensionScore
                      rawScore={task[dim.name]}
                      weight={dim.weight}
                    />
                  </td>
                ))}
                <td className="px-4 py-2 text-center">
                  <ImportanceScore
                    task={task}
                    dimensions={dimensions}
                  />
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onCompleteTask(task)}
                      className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors cursor-pointer"
                      title="Complete Task"
                    >
                      <CheckCircle size={18} />
                    </button>
                    <button
                      onClick={() => onEditTask(task)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => setDeleteTaskIndex(index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {visibleTasks.length === 0 && (
              <tr>
                <td
                  colSpan={dimensions.length + 4}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  {editingTaskId ? 'Editing task...' : 'No active tasks'}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <ConfirmationModal
          isOpen={deleteTaskIndex !== null}
          onClose={() => setDeleteTaskIndex(null)}
          onConfirm={handleConfirmDelete}
          title="Delete Task"
          message="Are you sure you want to delete this task? This action cannot be undone."
        />
      </div>
    </div>
  );
}