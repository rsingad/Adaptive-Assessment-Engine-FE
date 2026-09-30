import React from 'react';
import Card from '../ui/Card';
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';
import { getCompetencyMeta, formatAbility } from '../../utils/helpers';

export function AbilityGauge({
  ability = 0.50,
  previousAbility = 0.50,
  className = '',
}) {
  const competency = getCompetencyMeta(ability);
  const delta = Number((ability - previousAbility).toFixed(2));
  const percentage = Math.round(ability * 100);

  return (
    <Card className={`p-5 sm:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
              Calculated Ability
            </h3>
            <p className="text-sm font-semibold text-slate-200">
              Estimated Real-Time Theta
            </p>
          </div>
        </div>

        {/* Competency Pill */}
        <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${competency.bg} ${competency.color} ${competency.border}`}>
          {competency.label}
        </span>
      </div>

      {/* Main Ability Score Display */}
      <div className="flex items-baseline justify-between my-3">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            {formatAbility(ability)}
          </span>
          <span className="text-xs text-slate-400 font-medium">/ 1.00</span>
        </div>

        {/* Delta indicator */}
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          {delta > 0 ? (
            <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              <TrendingUp className="w-3.5 h-3.5" />
              +{delta.toFixed(2)}
            </span>
          ) : delta < 0 ? (
            <span className="flex items-center gap-1 text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
              <TrendingDown className="w-3.5 h-3.5" />
              {delta.toFixed(2)}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
              <Minus className="w-3.5 h-3.5" />
              Baseline
            </span>
          )}
        </div>
      </div>

      {/* Visual meter bar with calibrated ticks */}
      <div className="space-y-2 mt-4">
        <div className="w-full h-3 bg-slate-800/90 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-brand-500 to-accent-400 transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${Math.max(5, Math.min(100, percentage))}%` }}
          />
        </div>

        {/* Range Labels */}
        <div className="flex justify-between text-[10px] text-slate-400 font-medium px-1">
          <span>0.00 (Foundational)</span>
          <span>0.50 (Median)</span>
          <span>1.00 (Mastery)</span>
        </div>
      </div>
    </Card>
  );
}

export default AbilityGauge;
