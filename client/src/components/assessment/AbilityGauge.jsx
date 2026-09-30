import React from 'react';
import Card from '../ui/Card';
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';
import {
  getCompetencyMeta,
  formatAbilityForStudent,
  getAbilityTrendLabel,
  getMasteryPercent,
} from '../../utils/helpers';

export function AbilityGauge({
  ability = 0.50,
  previousAbility = 0.50,
  className = '',
}) {
  const competency = getCompetencyMeta(ability);
  const delta = ability - previousAbility;
  const trendLabel = getAbilityTrendLabel(delta);
  const masteryPercent = getMasteryPercent(ability);
  const masteryLabel = formatAbilityForStudent(ability);

  // Pick icon & colour for trend pill
  const trendConfig =
    delta > 0.05
      ? {
          icon: <TrendingUp className="w-3.5 h-3.5" />,
          cls: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        }
      : delta < -0.05
      ? {
          icon: <TrendingDown className="w-3.5 h-3.5" />,
          cls: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        }
      : {
          icon: <Minus className="w-3.5 h-3.5" />,
          cls: 'text-slate-400 bg-slate-800/80 border-slate-700/60',
        };

  // Mastery tier labels for the ruler beneath the bar
  const TIER_LABELS = ['Foundational', 'Developing', 'Proficient', 'Advanced'];

  return (
    <Card className={`p-5 sm:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
              Current Understanding
            </h3>
            <p className="text-sm font-semibold text-slate-200">
              Live Mastery Estimate
            </p>
          </div>
        </div>

        {/* Competency Pill */}
        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold border ${competency.bg} ${competency.color} ${competency.border}`}
        >
          {competency.label}
        </span>
      </div>

      {/* Main mastery display */}
      <div className="flex items-baseline justify-between my-3">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {masteryLabel}
          </span>
        </div>

        {/* Trend indicator */}
        <div
          className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg border ${trendConfig.cls}`}
        >
          {trendConfig.icon}
          {trendLabel}
        </div>
      </div>

      {/* Visual meter bar */}
      <div className="space-y-2 mt-4">
        <div className="flex justify-between items-center text-xs px-0.5 mb-1">
          <span className="text-slate-400 font-medium">Mastery Progress</span>
          <span className="text-white font-bold">{masteryPercent}%</span>
        </div>
        <div className="w-full h-3 bg-slate-800/90 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 via-brand-500 to-accent-400 transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${Math.max(5, Math.min(100, masteryPercent))}%` }}
          />
        </div>

        {/* Tier Labels */}
        <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5">
          {TIER_LABELS.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default AbilityGauge;
