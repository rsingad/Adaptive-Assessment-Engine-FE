import React from 'react';
import { Sparkles, RefreshCw, ArrowLeft, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';

/**
 * PreparingAssessment Component
 *
 * Full-screen deep indigo calibration experience displayed while the backend
 * initializes the adaptive assessment session and selects Question 1.
 *
 * Requirements:
 * - Full-screen deep indigo / ink canvas
 * - Centered ability calibration ruler with tick marks
 * - Subtle teal calibration sweep line moving across the ruler
 * - Heading: "Preparing your assessment"
 * - Dynamic subtitle: "Analyzing your starting point in [Subject]."
 * - Respects prefers-reduced-motion (sweep pauses at center)
 * - Friendly error state with "Try Again" and "Change Subject" actions
 * - No fake percentages or fake progress bars
 */
export function PreparingAssessment({
  subjectName = 'Mathematics',
  error = null,
  onRetry,
  onChangeSubject,
}) {
  const ticks = Array.from({ length: 25 }, (_, i) => i);

  if (error) {
    return (
      <div
        role="alert"
        aria-live="assertive"
        className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-md w-full bg-slate-900/90 border border-rose-500/30 rounded-2xl p-6 sm:p-8 text-center relative z-10 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7" aria-hidden="true" />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
            We couldn't prepare your assessment
          </h2>

          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            Please try again or choose a different subject to continue.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {onChangeSubject && (
              <Button
                variant="outline"
                size="md"
                onClick={onChangeSubject}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Change Subject
              </Button>
            )}

            {onRetry && (
              <Button
                variant="primary"
                size="md"
                onClick={onRetry}
                className="w-full sm:w-auto"
              >
                <RefreshCw className="w-4 h-4 mr-1.5" />
                Try Again
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden select-none"
    >
      {/* Deep indigo ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-900/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-accent-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-xl mx-auto flex flex-col items-center text-center relative z-10 space-y-8">
        {/* Subtle Brand Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-300 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-accent-400 animate-pulse" aria-hidden="true" />
          <span>AdaptiLearn Assessment Engine</span>
        </div>

        {/* Headings */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Preparing your assessment
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto leading-relaxed">
            Analyzing your starting point in <span className="font-semibold text-accent-300">{subjectName}</span>.
          </p>
        </div>

        {/* Calibration Ruler Visual */}
        <div className="w-full max-w-lg bg-slate-900/80 backdrop-blur-xl border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          <div className="flex items-center justify-between text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-4 px-1">
            <span>Foundational</span>
            <span className="text-accent-400 font-bold tracking-widest text-xs">Calibrating</span>
            <span>Advanced</span>
          </div>

          {/* Horizontal Ruler Container */}
          <div className="relative w-full h-16 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between px-3 overflow-hidden shadow-inner">
            {/* Tick Marks */}
            {ticks.map((idx) => {
              const isMajor = idx % 6 === 0;
              const isMid = idx % 3 === 0 && !isMajor;
              return (
                <div
                  key={idx}
                  className={`w-0.5 rounded-full transition-colors ${
                    isMajor
                      ? 'h-8 bg-slate-400'
                      : isMid
                      ? 'h-5 bg-slate-600'
                      : 'h-3 bg-slate-800'
                  }`}
                />
              );
            })}

            {/* Sweeping Teal Calibration Indicator */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-accent-400 shadow-[0_0_16px_3px_rgba(45,212,191,0.65)] -translate-x-1/2 pointer-events-none animate-ruler-sweep"
              aria-hidden="true"
            >
              {/* Top pointer cap */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-accent-300 rotate-45 -translate-y-1 shadow-sm" />
              {/* Bottom pointer cap */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-accent-300 rotate-45 translate-y-1 shadow-sm" />
            </div>
          </div>

          {/* Under-ruler descriptor */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
            <span>Establishing baseline question difficulty...</span>
          </div>
        </div>

        {/* Informative Microcopy */}
        <p className="text-xs text-slate-500 max-w-sm">
          AdaptiLearn will dynamically adjust question difficulty after each response based on your accuracy.
        </p>
      </div>
    </div>
  );
}

export default PreparingAssessment;
