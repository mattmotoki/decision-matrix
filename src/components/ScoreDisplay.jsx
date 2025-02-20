// components/ScoreDisplay.jsx
import React from 'react';

export function DimensionScore({ rawScore = 0, weight, showRawScores = false }) {
  const weightedScore = (rawScore || 0) * weight;
  const displayScore = showRawScores ? rawScore : weightedScore;
  
  return (
    <div
      className="inline-flex items-center"
      title={`${rawScore}×${weight} = ${weightedScore}`}
    >
      <span className="font-sm">{displayScore}</span>
    </div>
  );
}

export function ImportanceScore({ task, dimensions }) {
  const calculations = dimensions.map(dim => ({
    label: dim.label,
    rawScore: typeof task[dim.name] === 'number' ? task[dim.name] : 0,
    weight: dim.weight,
    weightedScore: (typeof task[dim.name] === 'number' ? task[dim.name] : 0) * dim.weight
  }));

  const totalScore = calculations.reduce((sum, calc) => sum + calc.weightedScore, 0);

  const formulaString = calculations
    .map(calc => `${calc.rawScore}×${calc.weight}`)
    .join(' + ');

  return (
    <div
      className="font-medium"
      title={`Total Score = ${totalScore} (${formulaString})`}
    >
      {totalScore.toString()}
    </div>
  );
}