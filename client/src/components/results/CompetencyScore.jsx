import React from 'react';
import Card from '../ui/Card';
import { Award, CheckCircle, HelpCircle } from 'lucide-react';
import { getCompetencyMeta, formatAbility } from '../../utils/helpers';

export function CompetencyScore({
  score = 0.78,
  level = "Advanced Competency",
  correctCount = 6,
  totalQuestions = 8,
}) {
  const competency = getCompetencyMeta(score);
  const accuracyPercentage = Math.round((correctCount / totalQuestions) * 100);

  return (
    <Card className="p-6 sm:p-8 relative overflow-hidden border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-brand-950/30 text-center flex flex-col items-center">
      {/* Decorative ambient backdrop */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Badge Icon */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-500 p-0.5 shadow-xl shadow-brand-500/20 mb-4 flex items-center justify-center">
        <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
          <Award className="w-8 h-8 text-accent-400" />
        </div>
      </div>

      <span className="text-xs uppercase font-bold tracking-widest text-brand-400 mb-1">
        Adaptive Diagnostic Complete
      </span>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
        {level}
      </h2>

      {/* Ability Score Big Number */}
      <div className="my-4 flex items-baseline justify-center gap-2">
        <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-accent-300 to-emerald-300">
          {formatAbility(score)}
        </span>
        <span className="text-sm font-semibold text-slate-400">/ 1.00</span>
      </div>

      <div className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold border ${competency.bg} ${competency.color} ${competency.border} mb-6`}>
        {competency.label} Standing
      </div>

      {/* Summary Stat Pills */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm pt-4 border-t border-slate-800/80">
        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
          <span className="text-[11px] text-slate-400 font-medium block">Raw Accuracy</span>
          <span className="text-base font-bold text-white">{accuracyPercentage}%</span>
          <span className="text-[10px] text-slate-400 block">({correctCount}/{totalQuestions} questions)</span>
        </div>
        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-center">
          <span className="text-[11px] text-slate-400 font-medium block">Adaptive Precision</span>
          <span className="text-base font-bold text-emerald-400">High Confidence</span>
          <span className="text-[10px] text-slate-400 block">Calibrated convergence</span>
        </div>
      </div>
    </Card>
  );
}

export default CompetencyScore;
