import { useState, useEffect } from 'react';

const DEFAULT_VISIBLE_COLUMNS = {
  name: true,
  createdAt: true,
  totalScore: true,
  actions: true
};

export function useColumnVisibility(dimensions) {
  const [visibleColumns, setVisibleColumns] = useState(() => {
    // Initialize with default columns and all dimensions visible
    return {
      ...DEFAULT_VISIBLE_COLUMNS,
      ...Object.fromEntries(dimensions.map(dim => [dim.name, true]))
    };
  });

  // Update visible columns when dimensions change
  useEffect(() => {
    setVisibleColumns(prev => {
      const newColumns = { ...DEFAULT_VISIBLE_COLUMNS };
      
      // Keep existing dimension visibility if present
      dimensions.forEach(dim => {
        newColumns[dim.name] = prev[dim.name] ?? true;
      });
      
      return newColumns;
    });
  }, [dimensions]);

  const toggleColumn = (columnName) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnName]: !prev[columnName]
    }));
  };

  const toggleAllColumns = (value) => {
    setVisibleColumns(prev => 
      Object.fromEntries(Object.keys(prev).map(key => [key, value]))
    );
  };

  return {
    visibleColumns,
    toggleColumn,
    toggleAllColumns
  };
} 