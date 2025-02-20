import React, { useState, useRef } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { DimensionScore } from '../DimensionManager';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  const totalScore = calculateImportance(task, dimensions);
  const maxPossibleScore = dimensions.reduce((sum, dim) => sum + (5 * dim.weight), 0);
  const scoreColorClass = getScoreColor(totalScore, maxPossibleScore, true);

  const handleOpenMenu = (event) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({
      x: rect.left - 100, // Position menu to the left of the button
      y: rect.top + window.scrollY + rect.height + 4 // Position below the button with a small gap
    });
    setIsMenuOpen(true);
  };

  return (
    <tr className={`group divide-x divide-gray-200 ${className}`}>
      <td className={`px-4 py-2 truncate ${scoreColorClass}`}>{task.name}</td>
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
      <td className={`px-4 py-2 ${scoreColorClass}`}>
        <div className="flex justify-center">
          <button
            onClick={handleOpenMenu}
            className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreHorizontal size={16} />
          </button>
          <ContextMenu
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
            task={task}
            onEdit={onEdit}
            onDelete={() => onDelete(index)}
            onComplete={onComplete}
            position={menuPosition}
            menuRef={menuRef}
          />
        </div>
      </td>
    </tr>
  );
} 