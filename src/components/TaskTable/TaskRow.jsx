import React, { useState, useRef } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { DimensionScore } from '../../shared/components/Score';
import { calculateImportance, getScoreColor } from '../../utils/taskUtils';
import { ContextMenu } from './ContextMenu';

export function TaskRow({
  task,
  dimensions,
  showWeightedScores,
  onDelete,
  onEdit,
  onComplete,
  index,
  className = ''
}) {
  const menuRef = useRef(null);
  const [menuAnchor, setMenuAnchor] = useState(null);

  const totalScore = calculateImportance(task, dimensions);
  const maxPossibleScore = dimensions.reduce((sum, dim) => sum + (5 * dim.weight), 0);
  const scoreColorClass = getScoreColor(totalScore, maxPossibleScore, true);

  const handleMenuClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (menuAnchor) {
      setMenuAnchor(null);
      return;
    }
    
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuAnchor({
      x: rect.left - 100,
      y: rect.top + window.scrollY + rect.height + 4
    });
  };

  const formatDeadline = (date) => {
    if (!date) return '';
    const deadlineDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (deadlineDate.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (deadlineDate.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return deadlineDate.toLocaleDateString();
    }
  };

  return (
    <tr className={`group divide-x divide-gray-200 ${className}`}>
      <td 
        className={`px-4 py-2 truncate ${scoreColorClass}`}
        title={task.description ? `${task.description}` : ''}
      >
        {task.name}
      </td>
      <td
        className={`px-4 py-2 text-center text-sm ${scoreColorClass}`}
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
      <td
        className={`px-4 py-2 text-center text-sm ${scoreColorClass}`}
        title={task.deadline ? new Date(task.deadline).toLocaleString() : 'No deadline'}
      >
        {task.deadline ? formatDeadline(task.deadline) : '-'}
      </td>
      <td className={`px-4 py-2 ${scoreColorClass}`}>
        <div className="flex flex-wrap gap-1">
          {task.tags?.map(tag => (
            <span
              key={tag}
              className="inline-block px-2 py-0.5 text-xs rounded-full bg-teal-100 text-teal-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </td>
      <td className={`px-4 py-2 ${scoreColorClass}`}>
        <div className="flex justify-center">
          <button
            onClick={handleMenuClick}
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreHorizontal size={16} />
          </button>
          <ContextMenu
            isOpen={Boolean(menuAnchor)}
            setIsOpen={(open) => setMenuAnchor(open ? menuAnchor : null)}
            task={task}
            onEdit={onEdit}
            onDelete={() => onDelete(index)}
            onComplete={onComplete}
            position={menuAnchor || {}}
            menuRef={menuRef}
          />
        </div>
      </td>
    </tr>
  );
} 