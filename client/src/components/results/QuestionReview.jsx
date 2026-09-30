import React, { useState } from 'react';
import Card from '../ui/Card';
import { BookOpen, Check, X, ChevronDown, ChevronUp, Brain, Zap } from 'lucide-react';
import { formatAbility } from '../../utils/helpers';

/**
 * QuestionReview — shows a collapsible review of all answered questions.
 * Uses real questionHistory data from the backend's GET /results response.
 *
 * Props:
 *   questionHistory {Array} - Array of answered question objects from backend
 */
export function QuestionReview({ questionHistory = [] }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!questionHistory || questionHistory.length === 0) {
    return null;
  }

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <Card className="p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
              Question-by-Question Review
            </h3>
            <p className="text-sm font-semibold text-white">
              {questionHistory.length} Assessed Questions
            </p>
          </div>
        </div>
        <span className="text-xs text-slate-400">
          Click row to expand rationale
        </span>
      </div>

      {/* Refined List Items (Subtle Separators, Not Heavy Repetitive Cards) */}
      <div className="divide-y divide-slate-800/80">
        {questionHistory.map((item, idx) => {
          const isCorrect = item.correct === true;
          const isExpanded = expandedIndex === idx;
          const abilityDelta = item.abilityAfter - item.abilityBefore;

          return (
            <div
              key={item.questionId || idx}
              className="py-3 transition-colors first:pt-0 last:pb-0"
            >
              {/* Collapsed Row */}
              <button
                type="button"
                onClick={() => toggleExpand(idx)}
                className="w-full text-left p-3 rounded-xl flex items-center gap-3.5 hover:bg-slate-900/80 transition-colors cursor-pointer"
              >
                {/* Correct/Incorrect Badge */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    isCorrect
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-rose-500/15 text-rose-400'
                  }`}
                >
                  {isCorrect ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <X className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Question Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="font-bold text-white">
                      Q{idx + 1}
                    </span>
                    {item.topic && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                        {item.topic}
                      </span>
                    )}
                    {item.prerequisite && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-medium">
                        Prerequisite Check
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 truncate pr-2">
                    {item.questionText}
                  </p>
                </div>

                {/* Level Movement Hint */}
                <div className="flex items-center gap-2 shrink-0 text-xs">
                  {abilityDelta !== 0 && !isNaN(abilityDelta) && (
                    <span
                      className={`font-semibold hidden sm:inline-block ${
                        abilityDelta > 0 ? 'text-emerald-400' : 'text-slate-400'
                      }`}
                    >
                      {abilityDelta > 0 ? 'Advanced Level' : 'Level Adjusted'}
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="mt-2.5 mx-2 p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                  {/* Full Question Text */}
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Question Prompt
                    </span>
                    <p className="text-sm text-slate-200 leading-relaxed font-medium">
                      {item.questionText}
                    </p>
                  </div>

                  {/* Prerequisite context if applicable */}
                  {item.prerequisite && (
                    <div className="text-xs text-amber-300 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20">
                      <strong>Prerequisite Concept Tested:</strong> {item.prerequisite}
                    </div>
                  )}

                  {/* Adaptive Engine Insight */}
                  {item.reason && (
                    <div className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/70 rounded-lg p-3 border border-slate-800/80">
                      <Zap className="w-3.5 h-3.5 text-accent-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <strong className="text-accent-300">Why was this selected?</strong>
                        <p className="text-slate-400">{item.reason}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default QuestionReview;
