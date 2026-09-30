import React from 'react';
import Card from '../ui/Card';
import { GitCommit, ArrowRight, Check, X } from 'lucide-react';
import { formatAbilityForStudent, getCompetencyMeta } from '../../utils/helpers';

export function AdaptiveTimeline({
  journey = [],
  className = '',
}) {
  return (
    <Card className={`p-5 sm:p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 rounded-xl bg-accent-500/10 text-accent-400 border border-accent-500/20">
          <GitCommit className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
            Question Timeline
          </h3>
          <p className="text-sm font-semibold text-slate-200">
            Your Step-by-Step Learning Path
          </p>
        </div>
      </div>

      {/* Horizontally scrollable timeline */}
      <div className="overflow-x-auto pb-4 pt-1">
        <div className="flex items-center gap-2 min-w-max">
          {journey.map((step, idx) => {
            const isCorrect = step.correct === true;
            const isIncorrect = step.correct === false;
            const masteryLabel = formatAbilityForStudent(step.ability);
            const competency = getCompetencyMeta(step.ability);

            return (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center bg-slate-900/80 border border-slate-800 rounded-xl p-3 min-w-[120px] text-center hover:border-slate-700 transition-colors">
                  {/* Step number & result icon */}
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="text-xs font-bold text-slate-300">
                      Q{step.questionNumber || idx + 1}
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                        isCorrect
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : isIncorrect
                          ? 'bg-rose-500/20 text-rose-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {isCorrect ? (
                        <Check className="w-3 h-3" />
                      ) : isIncorrect ? (
                        <X className="w-3 h-3" />
                      ) : (
                        '•'
                      )}
                    </span>
                  </div>

                  {/* Mastery tier label (replaces raw ability decimal) */}
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${competency.bg} ${competency.color} ${competency.border} leading-tight`}
                  >
                    {masteryLabel}
                  </span>

                  {/* Topic tag */}
                  <div className="mt-2 pt-1 border-t border-slate-800/80 w-full text-[10px] text-slate-400 truncate">
                    {step.topic || 'General'}
                  </div>
                </div>

                {idx < journey.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

export default AdaptiveTimeline;
