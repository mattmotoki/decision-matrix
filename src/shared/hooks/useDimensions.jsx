import { useState } from 'react';

const STORAGE_KEY = 'decision-matrix-dimensions';

const initialDimensions = [
  { name: 'easiness', label: 'Easiness', weight: 1, description: "How quickly and easily this can be completed." },
  { name: 'urgency', label: 'Urgency', weight: 3, description: "How time-sensitive or deadline-driven the task is." },
  { name: 'financialGain', label: 'Financial Gain', weight: 2, description: "Expected monetary return or business value." },
  { name: 'personalGrowth', label: 'Personal Growth', weight: 1, description: "Opportunity for learning and skill development." }
];

export function useDimensions() {
  const [dimensions, setDimensions] = useState(() => {
    const savedDimensions = localStorage.getItem(STORAGE_KEY);
    return savedDimensions ? JSON.parse(savedDimensions) : initialDimensions;
  });

  const updateDimensions = (newDimensions) => {
    setDimensions(newDimensions);
  };

  const saveDimensions = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dimensions));
  };

  return [dimensions, updateDimensions, saveDimensions];
} 