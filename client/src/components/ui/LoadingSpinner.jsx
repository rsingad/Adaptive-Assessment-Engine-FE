import React from 'react';

export function LoadingSpinner({
  size = 'md',
  message = 'Calculating adaptive trajectory...',
  className = '',
}) {
  const sizeMap = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 gap-4 ${className}`}>
      <div className="relative">
        <div className={`${sizeMap[size] || sizeMap.md} rounded-full border-slate-700/60 border-t-brand-500 animate-spin`} />
        <div className="absolute inset-0 rounded-full blur-md bg-brand-500/20 animate-pulse" />
      </div>
      {message && (
        <p className="text-sm text-slate-400 font-medium tracking-wide animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}

export default LoadingSpinner;
