import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import {
  BrainCircuit,
  BookOpen,
  Clock,
  Zap,
  ArrowLeft,
  Construction,
} from 'lucide-react';
import { ICON_MAP_DYNAMIC } from '../utils/subjectIcons';

/**
 * Assessment Page — Phase 2 Placeholder
 *
 * Shows the subject chosen by the user plus a "Coming in Phase 3" banner.
 * The full adaptive assessment engine will be wired in Phase 3.
 */
export function Assessment() {
  const navigate = useNavigate();
  const { selectedSubject, user } = useAuth();

  const SubjectIcon = selectedSubject ? (ICON_MAP_DYNAMIC[selectedSubject.icon] || BookOpen) : BookOpen;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden selection:bg-brand-500 selection:text-white">
      {/* Ambient gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-gradient-to-b from-brand-600/10 via-accent-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="w-full bg-slate-900/70 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-30 px-4 sm:px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 p-0.5 shadow-md shadow-brand-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <BrainCircuit className="w-4 h-4 text-accent-400" />
              </div>
            </div>
            <span className="font-bold text-white tracking-tight">AdaptiLearn</span>
          </div>

          <button
            onClick={() => navigate('/select-subject')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Change Subject
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center relative z-10">

        {/* Subject Confirmation Banner */}
        {selectedSubject && (
          <div className={`flex items-center gap-3 px-4 py-2.5 rounded-full border mb-8 ${selectedSubject.border} ${selectedSubject.bg} animate-fade-in`}>
            <SubjectIcon className={`w-4 h-4 ${selectedSubject.accent}`} />
            <span className={`text-sm font-semibold ${selectedSubject.accent}`}>
              {selectedSubject.label}
            </span>
            <span className="text-xs text-slate-400">· selected subject</span>
          </div>
        )}

        {/* Main Placeholder Card */}
        <Card className="w-full max-w-2xl p-8 sm:p-12 text-center border-slate-800 bg-gradient-to-br from-slate-900/90 to-brand-950/20 relative overflow-hidden">
          {/* Decorative accent top bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 via-accent-500 to-indigo-500" />

          {/* Construction Icon */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-600/30 to-accent-500/20 border border-brand-500/30 flex items-center justify-center mx-auto mb-6">
            <Construction className="w-10 h-10 text-brand-400" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-brand-400 mb-3 block">
            Baseline Assessment
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Your Assessment Will Begin Here
          </h1>

          <p className="text-base text-slate-400 max-w-lg mx-auto leading-relaxed mb-8">
            The adaptive baseline assessment for{' '}
            <span className="text-white font-semibold">
              {selectedSubject?.label || 'your selected subject'}
            </span>{' '}
            is coming in <span className="text-accent-400 font-semibold">Phase 3</span>.
            The engine will start by calibrating your baseline ability, then dynamically
            adapt question difficulty in real time.
          </p>

          {/* What's Coming Preview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
            {[
              {
                icon: Zap,
                title: 'Baseline Calibration',
                desc: 'Initial medium-difficulty questions to estimate starting ability θ.',
                color: 'text-brand-400',
                bg: 'bg-brand-500/10',
                border: 'border-brand-500/20',
              },
              {
                icon: BrainCircuit,
                title: 'Adaptive Difficulty',
                desc: 'Questions adapt in real time based on your answers.',
                color: 'text-accent-400',
                bg: 'bg-accent-500/10',
                border: 'border-accent-500/20',
              },
              {
                icon: Clock,
                title: '8–10 Questions',
                desc: 'Focused diagnostic session concluding with a full competency report.',
                color: 'text-emerald-400',
                bg: 'bg-emerald-500/10',
                border: 'border-emerald-500/20',
              },
            ].map(({ icon: Icon, title, desc, color, bg, border }) => (
              <div key={title} className={`p-4 rounded-xl ${bg} border ${border} space-y-2`}>
                <div className={`w-8 h-8 rounded-lg ${bg} border ${border} flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <p className="text-xs font-bold text-white">{title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* "Coming in Phase 3" pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/80 text-sm text-slate-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Coming in Phase 3
          </div>

          {/* Back button */}
          <div className="mt-8 pt-6 border-t border-slate-800/60">
            <Button
              variant="outline"
              onClick={() => navigate('/select-subject')}
              className="mx-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Back to Subject Selection
            </Button>
          </div>
        </Card>

        {/* Greeting */}
        {user && (
          <p className="text-xs text-slate-500 mt-6 text-center">
            Logged in as <span className="text-slate-400">{user.email}</span>
          </p>
        )}
      </main>
    </div>
  );
}

export default Assessment;
