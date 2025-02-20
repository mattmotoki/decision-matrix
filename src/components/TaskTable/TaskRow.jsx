import React from 'react';
import { Edit, Trash2, CheckCircle } from 'lucide-react';
import { DimensionScore } from '../ScoreDisplay';
import { calculateImportance, getScoreColor } from '../../utils/taskUtils';

export function TaskRow({
  task,
  dimensions,
  showWeightedScores,
  onDelete,
  onEdit,
  onComplete,
  index
}) {
  const totalScore = calculateImportance(task, dimensions);
  const maxPossibleScore = dimensions.reduce((sum, dim) => sum + (5 * dim.weight), 0);
  const scoreColorClass = getScoreColor(totalScore, maxPossibleScore, true);

  return (
    <tr className="group">
      <td className="px-4 py-2 truncate group-hover:bg-gray-50">{task.name}</td>
      <td
        className="px-4 py-2 text-center text-sm group-hover:bg-gray-50"
        title={new Date(task.createdAt).toLocaleString()}
      >
        {new Date(task.createdAt).toLocaleDateString()}
      </td>
      {dimensions.map(dim => {
        const dimensionScoreClass = getScoreColor(task[dim.name], 5, false);
        return (
          <td key={dim.name} className={`px-4 py-2 text-center ${dimensionScoreClass}`}>
            <DimensionScore
              rawScore={task[dim.name]}
              weight={dim.weight}
              showWeightedScores={showWeightedScores}
            />
          </td>
        );
      })}
      <td className={`px-4 py-2 text-center font-medium ${scoreColorClass}`}>
        {totalScore}
      </td>
      <td className="px-4 py-2 group-hover:bg-gray-50">
        <div className="flex justify-center gap-2">
          <button
            onClick={() => onComplete(task)}
            className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors cursor-pointer"
            title="Complete Task"
          >
            <CheckCircle size={18} />
          </button>
          <button
            onClick={() => onEdit(task)}
            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
            title="Edit"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => onDelete(index)}
            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
} 