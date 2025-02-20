import React from 'react';
import { TaskRow } from './TaskRow';

export function TableBody({
  tasks,
  dimensions,
  showWeightedScores,
  onDeleteTask,
  onEditTask,
  onCompleteTask,
  editingTaskId
}) {
  return (
    <div className="w-full overflow-x-auto rounded-lg shadow bg-white">
      <table className="w-full min-w-[768px] divide-y divide-slate-200">
        <thead className="bg-slate-600">
          <tr className="divide-x divide-slate-500">
            <th className="px-4 py-2 text-left font-medium text-white w-48">Task Name</th>
            <th className="px-4 py-2 text-center font-medium text-white w-32">Date Created</th>
            {dimensions.map(dim => (
              <th 
                key={dim.name} 
                className="px-4 py-2 text-center font-medium text-white w-32"
                title={dim.description}
              >
                {dim.label}
                {!showWeightedScores && <span className="text-xs text-teal-200 ml-1">(×{dim.weight})</span>}
              </th>
            ))}
            <th className="px-4 py-2 text-center font-medium text-white w-24">Total Score</th>
            <th className="px-4 py-2 text-center font-medium text-white w-24">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 divide-y divide-gray-200">
          {tasks.map((task, index) => (
            <TaskRow
              key={task.id}
              task={task}
              dimensions={dimensions}
              showWeightedScores={showWeightedScores}
              onDelete={onDeleteTask}
              onEdit={onEditTask}
              onComplete={onCompleteTask}
              index={index}
              className="divide-x divide-gray-200"
            />
          ))}
          {tasks.length === 0 && (
            <tr>
              <td
                colSpan={dimensions.length + 4}
                className="px-4 py-6 text-center text-gray-500"
              >
                {editingTaskId ? 'Editing task...' : 'No active tasks'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
} 