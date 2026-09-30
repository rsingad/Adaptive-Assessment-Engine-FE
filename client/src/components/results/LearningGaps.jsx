import React from 'react';
import Card from '../ui/Card';
import { AlertCircle, Lightbulb, CheckCheck, TrendingUp } from 'lucide-react';

/**
 * LearningGaps — renders identified learning gaps from the backend results.
 * Gracefully handles:
 *   - No gaps → shows "no gaps found" confirmation
 *   - Gaps without prerequisite info → shows available info only
 *   - Gaps with prerequisite → shows prerequisite branch
 *
 * Props:
 *   gaps {Array} - normalized gap objects from assessmentService.getResults()
 *   className {string}
 */
export function LearningGaps({ gaps = [], className = '' }) {
  // Empty state — no concept gaps were identified
  if (!gaps || gaps.length === 0) {
    return (
      <Card className={`p-5 sm:p-6 border-emerald-500/20 bg-gradient-to-br from-emerald-950/10 via-slate-900/60 to-slate-900/90 ${className}`}>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
            <CheckCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs uppercase font-semibold text-emerald-400 tracking-wider">Learning Gaps</h3>
            <p className="text-sm font-medium text-slate-200 mt-0.5">
              No critical prerequisite concept gaps were identified.
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Your foundational understanding appears strong across assessed topics.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`p-5 sm:p-6 border-amber-500/20 bg-gradient-to-br from-amber-950/10 via-slate-900/60 to-slate-900/90 ${className}`}
    >
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 shrink-0">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs uppercase font-semibold text-amber-400 tracking-wider">
            Learning Gap Map
          </h3>
          <p className="text-sm font-semibold text-slate-100">
            {gaps.length} Concept Gap{gaps.length > 1 ? 's' : ''} Identified
          </p>
        </div>
      </div>

      {/* Gap Items */}
      <div className="space-y-3.5">
        {gaps.map((gap, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5 hover:border-amber-500/30 transition-colors"
          >
            {/* Topic Title & Status Badge */}
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0 mt-1" />
                {gap.title || gap.topic}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold whitespace-nowrap shrink-0">
                Needs Improvement
              </span>
            </div>

            {/* Gap Description (only if available from backend) */}
            {gap.description && (
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {gap.description}
              </p>
            )}

            {/* Prerequisite Branch (only if backend returned this info) */}
            {gap.prerequisite && (
              <div className="text-xs text-amber-400/90 font-medium pl-3 border-l-2 border-amber-500/40 py-0.5">
                └─ Prerequisite:{' '}
                <span className="text-white font-semibold">{gap.prerequisite}</span>
              </div>
            )}

            {/* Recommended Action (only if available) */}
            {gap.recommendation && (
              <div className="mt-1 pt-2.5 border-t border-slate-800 flex items-start gap-2 text-xs text-slate-300">
                <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5 text-accent-400" />
                <span>
                  <strong className="text-slate-200">Recommended Action: </strong>
                  {gap.recommendation}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer hint */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-2 text-xs text-slate-500">
        <TrendingUp className="w-3.5 h-3.5 text-brand-400" />
        <span>
          Gaps are identified by the adaptive engine from incorrect answers and prerequisite relationships.
        </span>
      </div>
    </Card>
  );
}

export default LearningGaps;
