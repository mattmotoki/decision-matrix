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
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        No tasks yet. Add your first task above.
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow bg-white">
      <table className="w-full min-w-[768px]">
        <thead className="bg-slate-700 text-white">
          <tr>
            <th className="px-4 py-2 text-left font-medium w-48">Task Name</th>
            <th className="px-4 py-2 text-center font-medium w-32">Created</th>
            {dimensions.map(dim => (
              <th 
                key={dim.name}
                className="px-4 py-2 text-center font-medium w-32"
              >
                {dim.label}
                {!showWeightedScores && <span className="text-xs text-teal-300 ml-1">(×{dim.weight})</span>}
              </th>
            ))}
            <th className="px-4 py-2 text-center font-medium w-24">Total Score</th>
            <th className="px-4 py-2 text-center font-medium w-32">Deadline</th>
            <th className="px-4 py-2 text-center font-medium w-32">Tags</th>
            <th className="px-4 py-2 text-center font-medium w-24">More Options</th>
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
} 