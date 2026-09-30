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
import { formatAbilityForStudent } from '../../utils/helpers';

// Map internal 0-1 ticks to human labels on the Y-axis
const YTICK_LABELS = {
  0:    'Foundational',
  0.33: 'Developing',
  0.66: 'Proficient',
  1:    'Advanced',
};

const CustomYAxisTick = ({ x, y, payload }) => {
  const label = YTICK_LABELS[payload.value] ?? '';
  if (!label) return null;
  return (
    <text x={x} y={y} dy={4} textAnchor="end" fill="#64748b" fontSize={9}>
      {label}
    </text>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const masteryLabel = formatAbilityForStudent(data.ability);
    return (
      <div className="bg-slate-900/95 border border-slate-700/80 p-3 rounded-xl shadow-xl backdrop-blur-md text-xs space-y-1">
        <p className="font-bold text-white">Question {data.questionNumber}</p>
        <p className="text-slate-300">
          Topic: <span className="text-brand-300 font-medium">{data.topic || 'General'}</span>
        </p>
        <p className="text-slate-300">
          Understanding:{' '}
          <span className="text-accent-400 font-semibold">{masteryLabel}</span>
        </p>
        {data.correct !== null && (
          <p className="font-semibold">
            {data.correct ? (
              <span className="text-emerald-400">✓ Correct</span>
            ) : (
              <span className="text-rose-400">✗ Incorrect</span>
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
              Learning Journey
            </h3>
            <p className="text-sm font-semibold text-slate-200">
              How Your Understanding Developed
            </p>
          </div>
        </div>
        <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
          Continuous Trajectory
        </span>
      </div>

      <div className="w-full h-44 sm:h-52">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
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
              ticks={[0, 0.33, 0.66, 1]}
              tick={<CustomYAxisTick />}
              stroke="#64748b"
              tickLine={false}
              axisLine={{ stroke: '#334155' }}
              width={72}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={0.5}
              stroke="#475569"
              strokeDasharray="4 4"
              label={{ value: 'Mid-point', fill: '#64748b', fontSize: 10, position: 'right' }}
            />
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
