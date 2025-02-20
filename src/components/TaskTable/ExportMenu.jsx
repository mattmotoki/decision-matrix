import React, { useState, useRef, useEffect } from 'react';
import { Download } from 'lucide-react';
import * as XLSX from 'xlsx';

export function ExportMenu({ tasks, dimensions }) {
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);
  const downloadButtonRef = useRef(null);
  const downloadMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (downloadMenuRef.current && !downloadMenuRef.current.contains(event.target) &&
          downloadButtonRef.current && !downloadButtonRef.current.contains(event.target)) {
        setShowDownloadMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDownloadCSV = (useWeightedScores = false) => {
    const scoreType = useWeightedScores ? 'weighted' : 'raw';
    
    const headers = ['Name', 'Created At', ...dimensions.map(dim => {
      const suffix = useWeightedScores ? ` (×${dim.weight})` : '';
      return `${dim.label}${suffix}`;
    }), 'Total Score'];
    
    const rows = tasks.map(task => [
      task.name,
      new Date(task.createdAt).toLocaleDateString(),
      ...dimensions.map(dim => useWeightedScores ? (task[dim.name] * dim.weight) : task[dim.name]),
      dimensions.reduce((sum, dim) => sum + (task[dim.name] * dim.weight), 0)
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    downloadFile(csvContent, 'csv', `tasks-${scoreType}-scores`);
  };

  const handleDownloadExcel = () => {
    const dimensionsData = dimensions.map(dim => ({
      'Label': dim.label,
      'Weight': dim.weight,
      'Description': dim.description
    }));

    const wb = XLSX.utils.book_new();
    
    const wsDim = XLSX.utils.json_to_sheet(dimensionsData);
    XLSX.utils.book_append_sheet(wb, wsDim, 'Dimensions');

    const headers = [
      'Task Name',
      'Created At',
      ...dimensions.map(dim => `${dim.label} (Raw)`),
      ...dimensions.map(dim => `${dim.label} (Weighted)`),
      'Total Score'
    ];

    const taskRows = tasks.map(task => [
      task.name,
      new Date(task.createdAt).toLocaleDateString(),
      ...dimensions.map(dim => task[dim.name])
    ]);

    const wsTask = XLSX.utils.aoa_to_sheet([headers]);
    XLSX.utils.sheet_add_aoa(wsTask, taskRows, { origin: 'A2' });

    const firstDataRow = 2;
    const lastDataRow = firstDataRow + taskRows.length - 1;
    const getColLetter = (index) => XLSX.utils.encode_col(index);

    dimensions.forEach((dim, dimIndex) => {
      const rawScoreCol = getColLetter(2 + dimIndex);
      const weightedScoreCol = getColLetter(2 + dimensions.length + dimIndex);

      for (let row = firstDataRow; row <= lastDataRow; row++) {
        const formula = `=${rawScoreCol}${row}*VLOOKUP("${dim.label}",Dimensions!$A$2:$B$${dimensionsData.length + 1},2,FALSE)`;
        wsTask[`${weightedScoreCol}${row}`] = { f: formula };
      }
    });

    const totalScoreCol = getColLetter(2 + dimensions.length * 2);
    const firstWeightedCol = getColLetter(2 + dimensions.length);
    const lastWeightedCol = getColLetter(2 + dimensions.length * 2 - 1);

    for (let row = firstDataRow; row <= lastDataRow; row++) {
      const formula = `=SUM(${firstWeightedCol}${row}:${lastWeightedCol}${row})`;
      wsTask[`${totalScoreCol}${row}`] = { f: formula };
    }

    XLSX.utils.book_append_sheet(wb, wsTask, 'Tasks');

    const dateStr = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `tasks-export-${dateStr}.xlsx`);
    setShowDownloadMenu(false);
  };

  const downloadFile = (content, type, filename) => {
    const dateStr = new Date().toISOString().split('T')[0];
    const mimeTypes = {
      csv: 'text/csv;charset=utf-8;'
    };

    const blob = new Blob([content], { type: mimeTypes[type] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${dateStr}.${type}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowDownloadMenu(false);
  };

  return (
    <div className="relative">
      <button
        ref={downloadButtonRef}
        onClick={() => setShowDownloadMenu(!showDownloadMenu)}
        className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        title="Download tasks"
      >
        <Download size={18} />
      </button>
      {showDownloadMenu && (
        <div
          ref={downloadMenuRef}
          className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10"
        >
          <button
            onClick={handleDownloadExcel}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            Excel Shreadsheet
          </button>          
          <button
            onClick={() => handleDownloadCSV(true)}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            CSV (Weighted Scores)
          </button>
          <button
            onClick={() => handleDownloadCSV(false)}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
          >
            CSV (Raw Values)
          </button>          
        </div>
      )}
    </div>
  );
} 