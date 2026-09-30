import React from 'react';
import Card from '../ui/Card';
import { AlertCircle, Lightbulb, CheckCheck } from 'lucide-react';

export function LearningGaps({
  gaps = [],
  className = '',
}) {
  if (!gaps || gaps.length === 0) {
    return (
      <Card className={`p-5 sm:p-6 ${className}`}>
        <div className="flex items-center gap-3 text-emerald-400">
          <CheckCheck className="w-5 h-5 shrink-0" />
          <p className="text-sm font-medium text-slate-200">
            No critical prerequisite concept gaps were identified during this assessment session.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-5 sm:p-6 border-amber-500/20 bg-gradient-to-br from-amber-950/10 via-slate-900/60 to-slate-900/90 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30">
          <AlertCircle className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs uppercase font-semibold text-amber-400 tracking-wider">
            Diagnostic Insights
          </h3>
          <p className="text-sm font-semibold text-slate-100">
            Detected Prerequisite Concept Gaps
          </p>
        </div>
      </div>

      <div className="space-y-3.5">
        {gaps.map((gap, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-amber-500/30 transition-colors"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                {gap.title || gap.topic}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium">
                Prerequisite Gap
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {gap.description}
            </p>

            {gap.recommendation && (
              <div className="mt-2 pt-2 border-t border-slate-800 flex items-start gap-2 text-xs text-brand-300">
                <Lightbulb className="w-3.5 h-3.5 shrink-0 mt-0.5 text-accent-400" />
                <span><strong className="text-slate-200">Recommended Action:</strong> {gap.recommendation}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

export default LearningGaps;
