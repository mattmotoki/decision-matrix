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

  // Validate settings (optional)
  if (data.settings && typeof data.settings !== 'object') {
    throw new Error('Invalid settings object');
  }

  // Ensure activeTasks and completedTasks are arrays (can be empty)
  data.activeTasks = Array.isArray(data.activeTasks) ? data.activeTasks : [];
  data.completedTasks = Array.isArray(data.completedTasks) ? data.completedTasks : [];

  // Validate each task
  const validateTask = (task) => {
    if (!task.id) {
      task.id = Date.now() + Math.random(); // Generate a unique ID if missing
    }
    if (!task.name || typeof task.name !== 'string') {
      throw new Error('Invalid task name');
    }
    if (!task.createdAt) {
      task.createdAt = new Date().toISOString(); // Set current date if missing
    }
    if (task.completedAt && isNaN(Date.parse(task.completedAt))) {
      throw new Error('Invalid task completion date');
    }
    
    // Ensure scores object exists
    task.scores = task.scores || {};
    
    // Optional fields validation with defaults
    task.description = task.description || '';
    task.deadline = task.deadline || null;
    task.tags = Array.isArray(task.tags) ? task.tags : [];
  };

  // Validate and normalize tasks
  data.activeTasks.forEach(validateTask);
  data.completedTasks.forEach(validateTask);

  return true;
} 