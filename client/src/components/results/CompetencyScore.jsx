import React from 'react';
import Card from '../ui/Card';
import { Award, Target, CheckCircle, Zap } from 'lucide-react';
import { getCompetencyMeta, formatAbility } from '../../utils/helpers';

/**
 * CompetencyScore — top-level diagnostic result summary card.
 * Shows final ability score, mastery label, accuracy, and question count.
 *
 * Props:
 *   score             {number}  - finalAbility (0–1)
 *   level             {string}  - short mastery label (Beginner/Intermediate/Proficient/Advanced)
 *   correctCount      {number}  - number of correctly answered questions
 *   totalQuestions    {number}  - total questions answered
 *   accuracyPercentage{number}  - backend-provided accuracy percentage (preferred)
 */
export function CompetencyScore({
  score = 0,
  level = 'Intermediate',
  correctCount = 0,
  totalQuestions = 0,
  accuracyPercentage,
}) {
  const competency = getCompetencyMeta(score);

  // Prefer backend-provided accuracy; fall back to ratio if needed
  const displayAccuracy =
    typeof accuracyPercentage === 'number' && !isNaN(accuracyPercentage)
      ? Math.round(accuracyPercentage)
      : totalQuestions > 0
      ? Math.round((correctCount / totalQuestions) * 100)
      : 0;

  return (
    <Card className="p-6 sm:p-8 relative overflow-hidden border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-brand-950/30 text-center flex flex-col items-center">
      {/* Decorative ambient backdrop */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-0 w-48 h-48 bg-accent-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Badge Icon */}
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-500 p-0.5 shadow-xl shadow-brand-500/20 mb-4 flex items-center justify-center relative z-10">
        <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
          <Award className="w-8 h-8 text-accent-400" />
        </div>
      </div>

      <span className="text-xs uppercase font-bold tracking-widest text-brand-400 mb-1 relative z-10">
        Adaptive Diagnostic Complete
      </span>

      {/* Mastery Level Heading */}
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2 relative z-10">
        {level} Understanding
      </h2>

      {/* Primary Human-Readable Standing Pill */}
      <div className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold border ${competency.bg} ${competency.color} ${competency.border} mb-5 relative z-10`}>
        <Zap className="w-3.5 h-3.5" />
        <span>{competency.label} Mastery Tier</span>
      </div>

      {/* Progress / Estimated Mastery Bar */}
      <div className="w-full max-w-sm space-y-2 mb-6 relative z-10">
        <div className="flex justify-between items-center text-xs px-0.5">
          <span className="text-slate-400 font-medium">Estimated Mastery</span>
          <span className="text-white font-bold">{Math.round(score * 100)}%</span>
        </div>
        <div className="w-full h-2.5 bg-slate-800/90 rounded-full overflow-hidden border border-slate-700/60 p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-brand-500 to-accent-400 transition-all duration-1000 ease-out shadow-sm"
            style={{ width: `${Math.max(5, Math.min(100, Math.round(score * 100)))}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-slate-500 font-medium px-0.5">
          <span>Foundational</span>
          <span>Developing</span>
          <span>Proficient</span>
          <span>Advanced</span>
        </div>
      </div>

      {/* Performance Metric Row */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-md pt-5 border-t border-slate-800/80 relative z-10">
        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-center space-y-0.5">
          <Target className="w-4 h-4 text-brand-400 mx-auto" />
          <span className="text-[11px] text-slate-400 font-medium block">Mastery Score</span>
          <span className="text-base font-bold text-white">{Math.round(score * 100)}%</span>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-center space-y-0.5">
          <CheckCircle className="w-4 h-4 text-emerald-400 mx-auto" />
          <span className="text-[11px] text-slate-400 font-medium block">Accuracy</span>
          <span className="text-base font-bold text-white">{displayAccuracy}%</span>
        </div>

        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-center space-y-0.5">
          <Award className="w-4 h-4 text-accent-400 mx-auto" />
          <span className="text-[11px] text-slate-400 font-medium block">Assessed</span>
          <span className="text-base font-bold text-white">
            {correctCount}<span className="text-slate-500">/{totalQuestions}</span>
          </span>
        </div>
      </div>
    </Card>
  );
}

export default CompetencyScore;
