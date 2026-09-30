import React from 'react';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import { BarChart3 } from 'lucide-react';

export function TopicPerformance({
  topics = [],
  className = '',
}) {
  return (
    <Card className={`p-5 sm:p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-5">
        <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
          <BarChart3 className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
            Domain Competency
          </h3>
          <p className="text-sm font-semibold text-slate-200">
            Topic-Level Mastery Breakdown
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {topics.map((item, index) => {
          const isGap = item.score < 60;
          const colorKey = item.score >= 80 ? 'success' : isGap ? 'warning' : 'brand';

          return (
            <div key={index} className="space-y-1.5 p-3 rounded-xl bg-slate-900/50 border border-slate-800/80">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{item.topic}</span>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${isGap ? 'text-amber-400' : 'text-slate-100'}`}>
                    {item.score}%
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                    item.score >= 80 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : isGap
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-brand-500/10 text-brand-300 border-brand-500/30'
                  }`}>
                    {item.status || (item.score >= 80 ? 'Mastered' : isGap ? 'Review Required' : 'Competent')}
                  </span>
                </div>
              </div>
              <ProgressBar value={item.score} size="sm" color={colorKey} />
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default TopicPerformance;
