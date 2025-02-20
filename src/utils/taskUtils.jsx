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
  
  // More granular steps using Tailwind's opacity classes with darker blues
  if (percentage >= 90) return 'bg-blue-200 group-hover:bg-blue-300';
  if (percentage >= 80) return 'bg-blue-200/90 group-hover:bg-blue-300/90';
  if (percentage >= 70) return 'bg-blue-200/80 group-hover:bg-blue-300/80';
  if (percentage >= 60) return 'bg-blue-200/70 group-hover:bg-blue-300/70';
  if (percentage >= 50) return 'bg-blue-200/60 group-hover:bg-blue-300/60';
  if (percentage >= 40) return 'bg-blue-200/50 group-hover:bg-blue-300/50';
  if (percentage >= 30) return 'bg-blue-200/40 group-hover:bg-blue-300/40';
  if (percentage >= 20) return 'bg-blue-200/30 group-hover:bg-blue-300/30';
  if (percentage >= 10) return 'bg-blue-200/20 group-hover:bg-blue-300/20';
  return 'bg-blue-200/10 group-hover:bg-blue-300/10';
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