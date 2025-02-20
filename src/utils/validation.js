export function validateImportData(data) {
  // Check if data is an object
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid data format');
  }

  // Validate dimensions array
  if (!Array.isArray(data.dimensions)) {
    throw new Error('Missing or invalid dimensions array');
  }

  // Validate each dimension
  data.dimensions.forEach(dim => {
    if (!dim.name || typeof dim.name !== 'string') {
      throw new Error('Invalid dimension name');
    }
    if (!dim.label || typeof dim.label !== 'string') {
      throw new Error('Invalid dimension label');
    }
    if (typeof dim.weight !== 'number' || dim.weight < 0) {
      throw new Error('Invalid dimension weight');
    }
  });

  // Validate settings
  if (!data.settings || typeof data.settings !== 'object') {
    throw new Error('Missing or invalid settings');
  }
  if (typeof data.settings.showWeightedScores !== 'boolean') {
    throw new Error('Invalid showWeightedScores setting');
  }

  // Validate tasks arrays
  if (!Array.isArray(data.activeTasks)) {
    throw new Error('Missing or invalid activeTasks array');
  }
  if (!Array.isArray(data.completedTasks)) {
    throw new Error('Missing or invalid completedTasks array');
  }

  // Validate each task
  const validateTask = (task, isCompleted = false) => {
    if (!task.id || typeof task.id !== 'number') {
      throw new Error('Invalid task ID');
    }
    if (!task.name || typeof task.name !== 'string') {
      throw new Error('Invalid task name');
    }
    if (!task.createdAt || isNaN(Date.parse(task.createdAt))) {
      throw new Error('Invalid task creation date');
    }
    if (!task.scores || typeof task.scores !== 'object') {
      throw new Error('Invalid task scores');
    }
    if (isCompleted && (!task.completedAt || isNaN(Date.parse(task.completedAt)))) {
      throw new Error('Invalid task completion date');
    }
  };

  data.activeTasks.forEach(task => validateTask(task));
  data.completedTasks.forEach(task => validateTask(task, true));

  return true;
} 