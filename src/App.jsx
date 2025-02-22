import React, { useState, useEffect } from 'react';
import { CreateTaskButton } from './components/TaskManager';
import { DoTable } from './components/DoTable';
import { TaskArchive } from './components/TaskArchive';
import { Navbar } from './components/Navbar';
import { ControlPanel } from './components/ControlPanel';
import { Footer } from './components/Footer';
import { useTasks, STORAGE_KEYS } from './shared/hooks/useTasks';
import { calculateImportance, createFormValues, formatFormulaString } from './utils/taskUtils';
import './App.css';
import { BrowseTemplates } from './pages/BrowseTemplates';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';

function loadTemplateFromStorage() {
  const storedTemplate = localStorage.getItem('currentTemplate');
  if (!storedTemplate) {
    // Default template for new users
    const defaultTemplate = {
      id: 'side-projects',
      name: 'Side Project Prioritizer',
      description: 'Helps prioritize which side projects are most aligned with your goals. Adjust weights to focus on lucrative projects or skill building.',
      dimensions: [
        { name: 'impact', label: 'Impact', weight: 5, description: 'The potential impact and value this project could create' },
        { name: 'easiness', label: 'Easiness', weight: 3, description: 'How quickly and easily this can be completed' },
        { name: 'financial_gain', label: 'Financial Gain', weight: 2, description: 'Expected monetary return or business value' },
        { name: 'growth_potential', label: 'Growth Potential', weight: 4, description: 'Opportunity for learning and skill development' }
      ]
    };

    // Add sample tasks for new users
    const sampleTasks = [
      {
        id: Date.now() + Math.random(),
        name: 'Mobile App Development',
        description: 'Build a cross-platform mobile app using React Native',
        createdAt: new Date().toISOString(),
        impact: 4,
        easiness: 2,
        financial_gain: 4,
        growth_potential: 5
      },
      {
        id: Date.now() + Math.random() + 1,
        name: 'Open Source Contribution',
        description: 'Contribute to a popular open source project',
        createdAt: new Date().toISOString(),
        impact: 5,
        easiness: 3,
        financial_gain: 1,
        growth_potential: 4
      },
      {
        id: Date.now() + Math.random() + 2,
        name: 'Technical Blog',
        description: 'Start a blog sharing technical insights and learnings',
        createdAt: new Date().toISOString(),
        impact: 3,
        easiness: 4,
        financial_gain: 2,
        growth_potential: 3
      }
    ];

    // Store the template and tasks in localStorage
    localStorage.setItem('currentTemplate', JSON.stringify(defaultTemplate));
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TASKS, JSON.stringify(sampleTasks));
    localStorage.setItem(STORAGE_KEYS.COMPLETED_TASKS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.SHOW_WEIGHTED_SCORES, JSON.stringify(true));

    return defaultTemplate;
  }
  try {
    return JSON.parse(storedTemplate);
  } catch (e) {
    console.error('Error parsing stored template:', e);
    return null;
  }
}

// Create an inner component that can use the useNavigate hook
function AppContent() {
  const navigate = useNavigate();

  // Initialize template and dimensions from localStorage
  const [currentTemplate, setCurrentTemplate] = useState(loadTemplateFromStorage);

  // Update localStorage whenever template changes
  useEffect(() => {
    if (currentTemplate) {
      localStorage.setItem('currentTemplate', JSON.stringify(currentTemplate));
    }
  }, [currentTemplate]);

  const dimensions = currentTemplate?.dimensions || [];

  // State management
  const [showWeightedScores, setShowWeightedScores] = useState(() => {
    const saved = localStorage.getItem('decision-matrix-show-weighted-scores');
    return saved ? JSON.parse(saved) : true;
  });

  // Get tasks state and methods from the hook
  const {
    tasks,
    completedTasks,
    editingTaskId,
    setEditingTaskId,
    addTask,
    updateTask,
    completeTask,
    deleteTask,
    deleteCompletedTask,
    restoreTask,
    saveToLocalStorage,
    setTasks,
    setCompletedTasks
  } = useTasks(dimensions);

  // Calculate preview score and formula string for task creation
  const previewScore = calculateImportance(createFormValues(dimensions), dimensions);
  const formulaString = formatFormulaString(dimensions, createFormValues(dimensions));

  const handleImport = (data) => {
    try {
      // Update dimensions first
      if (!Array.isArray(data.dimensions)) {
        throw new Error('Invalid dimensions data');
      }
      setCurrentTemplate(prev => ({ ...prev, dimensions: data.dimensions }));

      // Process tasks
      const processTask = (task) => {
        const scores = task.scores || {};
        const processedTask = {
          id: task.id || Date.now() + Math.random(),
          name: task.name,
          createdAt: task.createdAt || new Date().toISOString(),
          description: task.description || '',
          deadline: task.deadline || null,
          tags: Array.isArray(task.tags) ? task.tags : [],
        };

        // Add dimension scores
        data.dimensions.forEach(dim => {
          processedTask[dim.name] = scores[dim.name] || 0;
        });

        if (task.completedAt) {
          processedTask.completedAt = task.completedAt;
        }

        return processedTask;
      };

      // Set active and completed tasks
      const activeTasks = (data.activeTasks || []).map(processTask);
      const completedTasks = (data.completedTasks || []).map(processTask);

      setTasks(activeTasks);
      setCompletedTasks(completedTasks);

      // Update settings if present
      if (data.settings?.showWeightedScores !== undefined) {
        setShowWeightedScores(Boolean(data.settings.showWeightedScores));
      }
    } catch (error) {
      console.error('Import error:', error);
      alert(`Import failed: ${error.message}`);
      throw error;
    }
  };

  const handleExport = () => {
    const data = {
      metadata: {
        exportDate: new Date().toISOString(),
        totalActiveTasks: tasks.length,
        totalCompletedTasks: completedTasks.length
      },
      settings: {
        showWeightedScores
      },
      dimensions: dimensions.map(dim => ({
        name: dim.name,
        label: dim.label,
        weight: dim.weight,
        description: dim.description
      })),
      activeTasks: tasks.map(task => ({
        id: task.id,
        name: task.name,
        createdAt: task.createdAt,
        description: task.description,
        deadline: task.deadline,
        tags: task.tags || [],
        scores: Object.fromEntries(
          dimensions.map(dim => [dim.name, task[dim.name]])
        )
      })),
      completedTasks: completedTasks.map(task => ({
        id: task.id,
        name: task.name,
        createdAt: task.createdAt,
        completedAt: task.completedAt,
        description: task.description,
        deadline: task.deadline,
        tags: task.tags || [],
        scores: Object.fromEntries(
          dimensions.map(dim => [dim.name, task[dim.name]])
        )
      }))
    };

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = `dotable-template-${timestamp}.json`;
      document.body.appendChild(a);
      a.click();
    } finally {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleSave = () => {
    localStorage.setItem('currentTemplate', JSON.stringify(currentTemplate));
    saveToLocalStorage(showWeightedScores);
    return Promise.resolve();
  };

  const handleTemplateSelect = (template) => {
    // Create new dimensions array while preserving weights and normalizing names
    const newDimensions = template.dimensions.map(dim => ({
      ...dim,
      name: dim.name.toLowerCase().replace(/\s+/g, '_')  // normalize dimension names only
    }));

    // Set the complete template with new dimensions
    setCurrentTemplate({
      ...template,
      dimensions: newDimensions
    });

    // Create sample tasks with proper structure
    const tasks = (template.tasks || []).map(task => {
      // Create a case-insensitive map of values
      const normalizedValues = {};
      Object.entries(task.values).forEach(([key, value]) => {
        normalizedValues[key.toLowerCase().replace(/\s+/g, '_')] = value;
      });

      // Create the base task object
      const newTask = {
        id: Date.now() + Math.random(),
        name: task.name,
        createdAt: new Date().toISOString(),
        description: '',
        deadline: null,
        tags: []
      };

      // Add dimension values directly to the task object
      newDimensions.forEach(dim => {
        newTask[dim.name] = normalizedValues[dim.name] || 0;
      });

      return newTask;
    });

    // Set tasks and update localStorage
    setTasks(tasks);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TASKS, JSON.stringify(tasks));
    localStorage.setItem(STORAGE_KEYS.COMPLETED_TASKS, JSON.stringify([]));

    // Use React Router's navigate
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar
        onSave={handleSave}
        onImport={handleImport}
        onExport={handleExport}
        tasks={tasks}
        completedTasks={completedTasks}
        dimensions={dimensions}
        showWeightedScores={showWeightedScores}
      />
      <div className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
                <ControlPanel
                  dimensions={dimensions}
                  onDimensionsChange={(newDimensions) => setCurrentTemplate(prev => ({ ...prev, dimensions: newDimensions }))}
                  onExport={handleExport}
                  onImport={handleImport}
                  onSave={handleSave}
                />

                <div className="mt-8 flex justify-end">
                  <CreateTaskButton
                    dimensions={dimensions}
                    onSubmit={addTask}
                    previewScore={previewScore}
                    formulaString={formulaString}
                  />
                </div>

                <DoTable
                  tasks={tasks}
                  dimensions={dimensions}
                  onDeleteTask={deleteTask}
                  onEditTask={updateTask}
                  onCompleteTask={completeTask}
                  showWeightedScores={showWeightedScores}
                  onToggleWeightedScores={(value) => setShowWeightedScores(value)}
                />

                <TaskArchive
                  tasks={completedTasks}
                  dimensions={dimensions}
                  onDeleteTask={deleteCompletedTask}
                  onRestoreTask={restoreTask}
                  showWeightedScores={showWeightedScores}
                />
              </div>
            }
          />
          <Route
            path="/browse-templates"
            element={
              <BrowseTemplates
                onTemplateSelect={handleTemplateSelect}
              />
            }
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}


export function App() {
  return (
    <BrowserRouter
      basename="/dotable"
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <AppContent />
    </BrowserRouter>
  );
}