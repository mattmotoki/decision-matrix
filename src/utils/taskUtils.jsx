// utils/taskUtils.jsx
export const calculateImportance = (task, dimensions) => {
  return dimensions.reduce((sum, dim) => {
    const value = typeof task[dim.name] === 'undefined' ? 0 : task[dim.name];
    return sum + (value * dim.weight);
  }, 0);
};

export const sortTasksByImportance = (tasks, dimensions) => {
  return [...tasks].sort(
    (a, b) => calculateImportance(b, dimensions) - calculateImportance(a, dimensions)
  );
};

export const createFormValues = (dimensions, defaultValue = 5) => {
  return Object.fromEntries(dimensions.map(dim => [dim.name, defaultValue]));
};

export const formatFormulaString = (dimensions, formValues) => {
  return dimensions
    .map(dim => `${dim.weight}×${formValues[dim.name]}`)
    .join(' + ');
};