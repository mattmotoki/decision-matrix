import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

export function TaskTable({ 
  tasks, 
  dimensions, 
  onDeleteTask, 
  onEditTask,
  calculateImportance 
}) {
  return (
    <div className="w-full bg-white rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left font-medium text-gray-700">Task Name</th>
            {dimensions.map(dim => (
              <th key={dim.name} className="px-4 py-2 text-center font-medium text-gray-700">
                {dim.label}
              </th>
            ))}
            <th className="px-4 py-2 text-center font-medium text-gray-700 w-24">Weighted Score</th>
            <th className="px-4 py-2 text-center font-medium text-gray-700 w-32">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr 
              key={task.id} 
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <td className="px-4 py-2">{task.name}</td>
              {dimensions.map(dim => {
                const weightedScore = task[dim.name] * dim.weight;
                return (
                  <td key={dim.name} className="px-4 py-2 text-center">
                    {task[dim.name]} <span className="text-gray-500">({weightedScore})</span>
                  </td>
                );
              })}
              <td className="px-4 py-2 text-center font-medium">
                {calculateImportance(task)}
              </td>
              <td className="px-4 py-2 text-center">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEditTask(task)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => onDeleteTask(index)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
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
  );
}