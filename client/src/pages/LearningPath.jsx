import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Sparkles, ArrowLeft, Construction, BookOpen, Compass, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function LearningPath() {
  const navigate = useNavigate();
  const { selectedSubject } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative selection:bg-brand-500 selection:text-white">
      {/* Decorative ambient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-brand-600/10 via-accent-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-30 px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
              <Compass className="w-4 h-4" />
            </div>
            <span className="font-bold text-white tracking-tight">Personalized Learning Path</span>
          </div>

          <Button variant="outline" size="sm" onClick={() => navigate('/results')}>
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to Results
          </Button>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-12 flex flex-col items-center justify-center text-center relative z-10">
        <Card className="p-8 sm:p-12 border-slate-800 bg-slate-900/90 w-full space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/30 text-brand-400 flex items-center justify-center mx-auto">
            <Construction className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-brand-400">
              Phase 5 Milestone
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Personalized Learning Path
            </h1>
            <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              Your customized curriculum based on identified concept gaps in{' '}
              <span className="text-white font-semibold">{selectedSubject?.label || 'Computer Science'}</span>{' '}
              will be unlocked in the upcoming learning pathway phase.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-left space-y-3">
            <span className="text-xs font-bold text-slate-300 block">Upcoming Capabilities:</span>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Targeted remedial micro-modules targeting your weak topics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Prerequisite reinforcement pathways with progressive challenge scaling</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Continuous mastery tracking with post-remedial recalibration</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate('/results')}>
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              View Diagnostic Report
            </Button>
            <Button variant="primary" onClick={() => navigate('/select-subject')}>
              <BookOpen className="w-4 h-4 mr-1.5" />
              Take Another Assessment
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}

export default LearningPath;
