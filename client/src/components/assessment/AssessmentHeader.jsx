import React from 'react';
import { Sparkles, RotateCcw } from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';

export function AssessmentHeader({
  questionIndex = 1,
  totalQuestions = 10,
  progressPercentage = 10,
  onReset,
}) {
  return (
    <header className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-30 px-4 sm:px-6 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 p-0.5 shadow-md shadow-brand-500/20 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-brand-400" />
            </div>
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              AdaptiLearn
              <span className="hidden sm:inline-block text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-300 border border-brand-500/20">
                Adaptive Engine
              </span>
            </h1>
          </div>
        </div>

        {/* Progress Center Indicator */}
        <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-6 flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">
              Question <span className="text-white font-bold">{questionIndex}</span> of {totalQuestions}
            </span>
            <span className="text-brand-400 font-semibold">{progressPercentage}% Complete</span>
          </div>
          <ProgressBar value={progressPercentage} size="sm" color="accent" />
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {onReset && (
            <button
              onClick={onReset}
              className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-lg transition-colors border border-transparent hover:border-slate-700/60"
              title="Reset Assessment"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default AssessmentHeader;
