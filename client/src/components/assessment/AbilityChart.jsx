import React from 'react';
import Card from '../ui/Card';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { Activity } from 'lucide-react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 border border-slate-700/80 p-3 rounded-xl shadow-xl backdrop-blur-md text-xs space-y-1">
        <p className="font-bold text-white">Question {data.questionNumber}</p>
        <p className="text-slate-300">Topic: <span className="text-brand-300 font-medium">{data.topic || 'General'}</span></p>
        <p className="text-slate-300">Ability: <span className="text-accent-400 font-semibold">{data.ability?.toFixed(2)}</span></p>
        {data.correct !== null && (
          <p className="font-semibold">
            Status: {data.correct ? (
              <span className="text-emerald-400">Correct (+ Difficulty)</span>
            ) : (
              <span className="text-rose-400">Incorrect (Prerequisite Check)</span>
            )}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export function AbilityChart({
  history = [],
  className = '',
}) {
  const chartData = history.map((item, idx) => ({
    questionLabel: `Q${item.questionNumber || idx + 1}`,
    questionNumber: item.questionNumber || idx + 1,
    ability: item.ability,
    difficulty: item.difficulty,
    correct: item.correct,
    topic: item.topic,
  }));

  return (
    <Card className={`p-5 sm:p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-accent-500/10 text-accent-400 border border-accent-500/20">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs uppercase font-semibold text-slate-400 tracking-wider">
              Ability Journey
            </h3>
            <p className="text-sm font-semibold text-slate-200">
              Real-Time Dynamic Trajectory
            </p>
          </div>
        </div>
        <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
          Scale: 0.0 - 1.0
        </span>
      </div>

      <div className="w-full h-44 sm:h-52">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="questionLabel"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <YAxis
              domain={[0, 1]}
              ticks={[0, 0.25, 0.5, 0.75, 1.0]}
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0.5} stroke="#475569" strokeDasharray="4 4" label={{ value: 'Median', fill: '#64748b', fontSize: 10, position: 'right' }} />
            <Line
              type="monotone"
              dataKey="ability"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ fill: '#4f46e5', stroke: '#06b6d4', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default AbilityChart;
