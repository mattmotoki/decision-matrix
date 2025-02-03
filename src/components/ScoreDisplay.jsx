import React from 'react';

export function DimensionScore({ rawScore, weight }) {
  const weightedScore = rawScore * weight;
  return (
    <div
      className="inline-flex items-center"
      title={`${rawScore}×${weight} = ${weightedScore}`}
    >
      <span className="font-sm">{weightedScore}</span>
    </div>
  );
}

export function ImportanceScore({ task, dimensions }) {
  const calculations = dimensions.map(dim => ({
    label: dim.label,
    rawScore: task[dim.name],
    weight: dim.weight,
    weightedScore: task[dim.name] * dim.weight
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
      {totalScore}
    </div>
  );
}