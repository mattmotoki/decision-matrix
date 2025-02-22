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

  // Sort tasks by total score in descending order
  const sortedTasks = [...tasks].sort((a, b) => {
    const scoreA = dimensions.reduce((sum, dim) => sum + (a[dim.name] || 0) * dim.weight, 0);
    const scoreB = dimensions.reduce((sum, dim) => sum + (b[dim.name] || 0) * dim.weight, 0);
    return scoreB - scoreA;
  });

  return (
    <div className="w-full overflow-x-auto rounded-lg shadow bg-white">
      <table className="w-full min-w-[768px]">
        <thead className="bg-slate-700 text-white">
          <tr>
            <th className="px-4 py-2 text-left font-medium w-48">Task Name</th>
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
            <th className="px-4 py-2 text-center font-medium w-24">More Options</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 divide-y divide-gray-200">
          {sortedTasks.map((task, index) => (
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