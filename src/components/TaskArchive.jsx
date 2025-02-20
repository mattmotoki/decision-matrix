// components/TaskArchive.jsx
import React, { useState } from 'react';
import { Trash2, RefreshCw } from 'lucide-react';
import { ConfirmationModal } from './ConfirmationModal';
import { DimensionScore, ImportanceScore } from './TaskManager';

export function TaskArchive({
  tasks,
  dimensions,
  onDeleteTask,
  onRestoreTask,
  showWeightedScores
}) {
  const [deleteTask, setDeleteTask] = useState(null);

  if (tasks.length === 0) return null;

  const handleConfirmDelete = () => {
    if (deleteTask !== null) {
      onDeleteTask(deleteTask);
      setDeleteTask(null);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Completed Tasks</h2>
      <div className="w-full overflow-x-auto rounded-lg shadow bg-white">
        <table className="w-full min-w-[768px]">
          <thead className="bg-slate-700 text-white">
            <tr>
              <th className="px-4 py-2 text-left font-medium w-48">Task Name</th>
              <th className="px-4 py-2 text-center font-medium w-32">Date Created</th>
              {dimensions.map(dim => (
                <th 
                  key={dim.name}
                  className="px-4 py-2 text-center font-medium w-32"
                  title={dim.description}
                >
                  {dim.label}
                  {!showWeightedScores && <span className="text-xs text-teal-300 ml-1">(×{dim.weight})</span>}
                </th>
              ))}
              <th className="px-4 py-2 text-center font-medium w-24">Total Score</th>
              <th className="px-4 py-2 text-center font-medium w-32">Date Completed</th>
              <th className="px-4 py-2 text-center font-medium w-24">More Options</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y divide-gray-200">
            {tasks.map((task, index) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 truncate">{task.name}</td>
                <td className="px-4 py-2 text-center text-sm" title={new Date(task.createdAt).toLocaleString()}>
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>
                {dimensions.map(dim => (
                  <td key={dim.name} className="px-4 py-2 text-center">
                    <DimensionScore
                      rawScore={task[dim.name]}
                      weight={dim.weight}
                      showWeightedScores={showWeightedScores}
                    />
                  </td>
                ))}
                <td className="px-4 py-2 text-center">
                  <ImportanceScore
                    task={task}
                    dimensions={dimensions}
                    showWeightedScores={showWeightedScores}
                  />
                </td>
                <td className="px-4 py-2 text-center text-sm" title={new Date(task.completedAt).toLocaleString()}>
                  {new Date(task.completedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onRestoreTask(task)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
                      title="Restore Task"
                    >
                      <RefreshCw size={18} />
                    </button>
                    <button
                      onClick={() => setDeleteTask(index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmationModal
        isOpen={deleteTask !== null}
        onClose={() => setDeleteTask(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </div>
  );
}