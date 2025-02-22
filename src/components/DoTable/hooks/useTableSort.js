import { useState, useMemo } from 'react';
import { calculateImportance } from '../../../utils/taskUtils';

export function useTableSort(initialTasks, dimensions) {
  const [sortConfig, setSortConfig] = useState({
    key: 'totalScore',
    direction: 'desc'
  });

  const sortedTasks = useMemo(() => {
    const tasks = [...initialTasks];
    
    return tasks.sort((a, b) => {
      if (sortConfig.key === 'name') {
        return sortConfig.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      
      if (sortConfig.key === 'createdAt') {
        return sortConfig.direction === 'asc'
          ? new Date(a.createdAt) - new Date(b.createdAt)
          : new Date(b.createdAt) - new Date(a.createdAt);
      }
      
      if (sortConfig.key === 'totalScore') {
        const scoreA = calculateImportance(a, dimensions);
        const scoreB = calculateImportance(b, dimensions);
        return sortConfig.direction === 'asc'
          ? scoreA - scoreB
          : scoreB - scoreA;
      }
      
      // Sort by dimension scores
      if (dimensions.some(dim => dim.name === sortConfig.key)) {
        return sortConfig.direction === 'asc'
          ? a[sortConfig.key] - b[sortConfig.key]
          : b[sortConfig.key] - a[sortConfig.key];
      }
      
      return 0;
    });
  }, [initialTasks, sortConfig, dimensions]);

  const requestSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return {
    items: sortedTasks,
    sortConfig,
    requestSort
  };
} 