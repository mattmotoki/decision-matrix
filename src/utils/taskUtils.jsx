// utils/taskUtils.jsx
export const calculateImportance = (task, dimensions) => {
  return dimensions.reduce((sum, dim) => {
    const value = typeof task[dim.name] === 'undefined' ? 0 : task[dim.name];
    return sum + (value * dim.weight);
  }, 0);
};

export const getScoreColor = (score, maxPossibleScore, isWeighted = false) => {
  // Calculate the percentage of max possible score
  const percentage = (score / maxPossibleScore) * 100;
  
  if (isWeighted) {
    // More granular steps for weighted total scores
    if (percentage >= 90) return 'bg-teal-300 group-hover:bg-teal-400';
    if (percentage >= 75) return 'bg-teal-200 group-hover:bg-teal-300';
    if (percentage >= 60) return 'bg-teal-100 group-hover:bg-teal-200';
    if (percentage >= 45) return 'bg-teal-50 group-hover:bg-teal-100';
    if (percentage >= 30) return 'bg-teal-50/70 group-hover:bg-teal-50';
    if (percentage >= 15) return 'bg-teal-50/40 group-hover:bg-teal-50/70';
    return 'bg-gray-50 group-hover:bg-gray-100';
  } else {
    // Discrete steps for dimension scores (0-5)
    switch (score) {
      case 5: return 'bg-teal-300 group-hover:bg-teal-400';
      case 4: return 'bg-teal-200 group-hover:bg-teal-300';
      case 3: return 'bg-teal-100 group-hover:bg-teal-200';
      case 2: return 'bg-teal-50 group-hover:bg-teal-100';
      case 1: return 'bg-teal-50/50 group-hover:bg-teal-50';
      case 0: return 'bg-gray-50 group-hover:bg-gray-100';
      default: return 'bg-gray-50 group-hover:bg-gray-100';
    }
  }
};

export const sortTasksByImportance = (tasks, dimensions) => {
  return [...tasks].sort(
    (a, b) => calculateImportance(b, dimensions) - calculateImportance(a, dimensions)
  );
};

export const createFormValues = (dimensions, defaultValue = 0) => {
  return Object.fromEntries(dimensions.map(dim => [dim.name, defaultValue]));
};

export const formatFormulaString = (dimensions, formValues) => {
  return dimensions
    .map(dim => `${dim.weight}×${formValues[dim.name]}`)
    .join(' + ');
};