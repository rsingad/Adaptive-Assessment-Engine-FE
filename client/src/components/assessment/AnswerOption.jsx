import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function AnswerOption({
  index,
  text,
  isSelected,
  onSelect,
  disabled = false,
}) {
  const letter = OPTION_LETTERS[index] || String(index + 1);

  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      disabled={disabled}
      className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 cursor-pointer select-none group relative overflow-hidden ${
        isSelected
          ? 'bg-brand-600/15 border-brand-500 shadow-lg shadow-brand-500/10 text-white'
          : 'bg-slate-900/60 hover:bg-slate-800/80 border-slate-800 hover:border-slate-700 text-slate-200'
      } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
    >
      {/* Option Key Letter Pill */}
      <div
        className={`w-8 h-8 rounded-xl font-semibold text-xs flex items-center justify-center shrink-0 transition-colors border ${
          isSelected
            ? 'bg-brand-600 text-white border-brand-400 shadow-sm'
            : 'bg-slate-800 text-slate-400 border-slate-700/80 group-hover:text-slate-200 group-hover:border-slate-600'
        }`}
      >
        {letter}
      </div>

      {/* Option Text */}
      <div className="flex-1 pt-0.5 text-sm sm:text-base leading-relaxed font-normal">
        {text}
      </div>

      {/* Selected Indicator */}
      <div className="shrink-0 pt-0.5">
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
            isSelected
              ? 'border-brand-500 bg-brand-500 text-white shadow-sm'
              : 'border-slate-700 bg-slate-900/50 group-hover:border-slate-500'
          }`}
        >
          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
        </div>
      </div>

      {/* Subtle selection accent bar */}
      {isSelected && (
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-brand-400 to-accent-400" />
      )}
    </button>
  );
}

export default AnswerOption;
