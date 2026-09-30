import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SUBJECTS } from '../utils/constants';
import { ICON_MAP_DYNAMIC } from '../utils/subjectIcons';
import Button from '../components/ui/Button';
import {
  Code2,
  ChevronRight,
  LogOut,
  BrainCircuit,
  CheckCircle2,
} from 'lucide-react';

export function SelectSubject() {
  const navigate = useNavigate();
  const { user, setSelectedSubject, logout } = useAuth();
  const [activeId, setActiveId] = useState(null);

  function handleSelect(id) {
    setActiveId(id);
  }

  function handleContinue() {
    if (!activeId) return;
    const subject = SUBJECTS.find((s) => s.id === activeId);
    setSelectedSubject(subject);
    navigate('/assessment');
  }

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden selection:bg-brand-500 selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-brand-600/10 via-accent-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="w-full bg-slate-900/70 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-30 px-4 sm:px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 p-0.5 shadow-md shadow-brand-500/20 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <BrainCircuit className="w-4 h-4 text-accent-400" />
                </div>
              </div>
              <span className="font-bold text-white tracking-tight group-hover:text-brand-300 transition-colors">
                AdaptiLearn
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {user.name || user.email}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-300 px-3 py-1.5 rounded-lg hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10 space-y-8">

        {/* Page heading */}
        <div className="text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-semibold text-brand-300">
            <span>Step 1 · Assessment Focus</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Choose what you want to assess
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
            The adaptive engine calibrates questions based on your responses within your selected domain to diagnose foundational strengths and learning gaps.
          </p>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SUBJECTS.map((subject) => {
            const Icon = ICON_MAP_DYNAMIC[subject.icon] || Code2;
            const isSelected = activeId === subject.id;

            return (
              <button
                key={subject.id}
                type="button"
                id={`subject-card-${subject.id}`}
                onClick={() => handleSelect(subject.id)}
                className={`group relative text-left w-full rounded-2xl border p-5 sm:p-6 transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  isSelected
                    ? 'border-brand-500 bg-slate-900 shadow-xl ring-1 ring-brand-500/50'
                    : 'border-slate-800/80 bg-slate-900/60 hover:bg-slate-900/90 hover:border-slate-700'
                }`}
              >
                {/* Selected check badge */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 className="w-5 h-5 text-accent-400 animate-fade-in" />
                  </div>
                )}

                {/* Icon block */}
                <div className={`w-11 h-11 rounded-xl mb-3.5 flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? 'bg-brand-600/20 text-brand-300 border border-brand-500/30'
                    : 'bg-slate-800 text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-700'
                }`}>
                  <Icon className="w-5 h-5 transition-colors" />
                </div>

                {/* Text */}
                <h2 className="text-base font-bold text-white mb-1 tracking-tight">{subject.label}</h2>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{subject.description}</p>

                {/* Selected label pill */}
                {isSelected && (
                  <div className="mt-3.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-accent-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Selected for Assessment</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Continue Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="text-xs sm:text-sm text-slate-400 text-center sm:text-left">
            {activeId ? (
              <span className="text-white font-medium">
                Ready to assess in <span className="text-accent-300 font-bold">{SUBJECTS.find((s) => s.id === activeId)?.label}</span>
              </span>
            ) : (
              'Select a domain above to continue'
            )}
          </div>

          <Button
            variant="accent"
            size="lg"
            disabled={!activeId}
            onClick={handleContinue}
            className="w-full sm:w-auto min-w-[200px] group cursor-pointer font-semibold"
            id="continue-to-assessment-btn"
          >
            <span>Continue to Assessment</span>
            <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </main>
    </div>
  );
}

export default SelectSubject;
