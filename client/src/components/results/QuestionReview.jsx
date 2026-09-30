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
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
          <BookOpen className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
            Question Review
          </h3>
          <p className="text-sm font-semibold text-slate-200">
            Full Answer History · {questionHistory.length} Questions
          </p>
        </div>
      </div>

      {/* Question Items */}
      <div className="space-y-2.5">
        {questionHistory.map((item, idx) => {
          const isCorrect = item.correct === true;
          const isExpanded = expandedIndex === idx;
          const abilityDelta = item.abilityAfter - item.abilityBefore;

          return (
            <div
              key={item.questionId || idx}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isCorrect
                  ? 'border-emerald-500/20 bg-emerald-950/10 hover:border-emerald-500/30'
                  : 'border-rose-500/20 bg-rose-950/10 hover:border-rose-500/30'
              }`}
            >
              {/* Collapsed Row */}
              <button
                onClick={() => toggleExpand(idx)}
                className="w-full text-left p-3.5 flex items-center gap-3"
              >
                {/* Correct/Incorrect Badge */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    isCorrect
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-rose-500/20 text-rose-400'
                  }`}
                >
                  {isCorrect ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                </div>

                {/* Question Number & Topic */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-300">
                      Q{idx + 1}
                    </span>
                    {item.topic && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20 font-medium">
                        {item.topic}
                      </span>
                    )}
                    {item.difficulty !== undefined && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 font-medium">
                        Difficulty: {item.difficulty.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 truncate pr-4">
                    {item.questionText}
                  </p>
                </div>

                {/* Ability Delta */}
                <div className="flex items-center gap-2 shrink-0">
                  {abilityDelta !== 0 && !isNaN(abilityDelta) && (
                    <span
                      className={`text-xs font-bold ${
                        abilityDelta > 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {abilityDelta > 0 ? '+' : ''}{abilityDelta.toFixed(2)}
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </button>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-3 border-t border-slate-800/60 pt-3">
                  {/* Full Question Text */}
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {item.questionText}
                  </p>

                  {/* Ability Before → After */}
                  {(item.abilityBefore !== undefined || item.abilityAfter !== undefined) && (
                    <div className="flex items-center gap-2 text-xs">
                      <Brain className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      <span className="text-slate-400">Ability:</span>
                      <span className="text-slate-200 font-semibold">
                        {formatAbility(item.abilityBefore)}
                      </span>
                      <span className="text-slate-500">→</span>
                      <span
                        className={`font-bold ${
                          abilityDelta > 0 ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {formatAbility(item.abilityAfter)}
                      </span>
                    </div>
                  )}

                  {/* Prerequisite */}
                  {item.prerequisite && (
                    <div className="text-xs text-amber-400/90 font-medium pl-3 border-l-2 border-amber-500/40 py-0.5">
                      Prerequisite: <span className="text-white font-semibold">{item.prerequisite}</span>
                    </div>
                  )}

                  {/* Adaptive Reason */}
                  {item.reason && (
                    <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-900/70 rounded-lg p-2.5 border border-slate-800">
                      <Zap className="w-3.5 h-3.5 text-accent-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item.reason}</span>
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
