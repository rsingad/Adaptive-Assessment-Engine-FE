import React from 'react';

export function ProgressBar({
  value = 0,
  max = 100,
  showLabel = false,
  color = 'brand',
  size = 'md',
  className = '',
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  const colorGradients = {
    brand: 'bg-gradient-to-r from-brand-600 to-indigo-400',
    accent: 'bg-gradient-to-r from-brand-600 via-indigo-500 to-accent-400',
    success: 'bg-gradient-to-r from-emerald-500 to-teal-400',
    warning: 'bg-gradient-to-r from-amber-500 to-yellow-400',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5 font-medium">
          <span>Progress</span>
          <span>{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50 ${sizeClasses[size] || sizeClasses.md}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorGradients[color] || colorGradients.brand}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
