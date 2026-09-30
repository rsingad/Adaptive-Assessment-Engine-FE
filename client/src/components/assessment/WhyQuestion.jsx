import React from 'react';
import Card from '../ui/Card';
import { HelpCircle, AlertTriangle, ArrowUpRight, ArrowDownRight, Compass } from 'lucide-react';

export function WhyQuestion({
  reason,
  ability = 0.50,
  previousAbility = 0.50,
  prerequisite = null,
  isFirstQuestion = false,
  className = '',
}) {
  const delta = Number((ability - previousAbility).toFixed(2));
  const isPrerequisiteCheck = Boolean(prerequisite) || reason?.toLowerCase().includes('prerequisite');
  const isDifficultyIncrease = delta > 0;
  const isDifficultyDecrease = delta < 0;

  // Visual state styling depending on explanation context
  let badgeConfig = {
    title: "System Calibration",
    subtitle: "Baseline assessment initialization",
    icon: Compass,
    accentBorder: "border-brand-500/30",
    bgGrad: "from-brand-950/30 to-slate-900/40",
    textColor: "text-brand-300",
  };

  if (isPrerequisiteCheck) {
    badgeConfig = {
      title: "Prerequisite Concept Verification",
      subtitle: prerequisite ? `Focus: ${prerequisite}` : "Targeted diagnostic check",
      icon: AlertTriangle,
      accentBorder: "border-amber-500/40",
      bgGrad: "from-amber-950/25 to-slate-900/40",
      textColor: "text-amber-400",
    };
  } else if (isDifficultyIncrease) {
    badgeConfig = {
      title: "Challenge Escalation",
      subtitle: `Difficulty increased (+${delta.toFixed(2)})`,
      icon: ArrowUpRight,
      accentBorder: "border-emerald-500/40",
      bgGrad: "from-emerald-950/25 to-slate-900/40",
      textColor: "text-emerald-400",
    };
  } else if (isDifficultyDecrease) {
    badgeConfig = {
      title: "Targeted Adjustment",
      subtitle: `Difficulty modulated (${delta.toFixed(2)})`,
      icon: ArrowDownRight,
      accentBorder: "border-indigo-500/40",
      bgGrad: "from-indigo-950/25 to-slate-900/40",
      textColor: "text-indigo-300",
    };
  }

  const Icon = badgeConfig.icon;

  return (
    <Card className={`border ${badgeConfig.accentBorder} bg-gradient-to-br ${badgeConfig.bgGrad} p-5 sm:p-6 relative overflow-hidden transition-all duration-300 ${className}`}>
      {/* Background soft ambient glow */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-20 bg-brand-400 pointer-events-none" />

      <div className="flex items-start gap-4">
        {/* State Icon */}
        <div className={`p-2.5 rounded-xl border ${badgeConfig.accentBorder} bg-slate-900/80 shrink-0 ${badgeConfig.textColor}`}>
          <Icon className="w-5 h-5" />
        </div>

        {/* Content Body */}
        <div className="space-y-1.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Why this question?
            </span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${badgeConfig.accentBorder} bg-slate-900/50 ${badgeConfig.textColor}`}>
              {badgeConfig.title}
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed">
            {reason || "Our adaptive algorithm selected this question based on your preceding answer pattern."}
          </p>

          <p className="text-xs text-slate-400 pt-1">
            {badgeConfig.subtitle}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default WhyQuestion;
