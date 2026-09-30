import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 p-0.5 shadow-md shadow-brand-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <BrainCircuit className="w-4 h-4 text-accent-400" />
              </div>
            </div>
            <span className="font-bold text-white tracking-tight">AdaptiLearn</span>
          </div>

          <div className="flex items-center gap-3">
            {user && (
              <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {user.name || user.email}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-300 px-3 py-1.5 rounded-lg hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 relative z-10">

        {/* Page heading */}
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-brand-400 mb-3 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20">
            Step 1 of 1
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Select Your Subject
          </h1>
          <p className="text-base text-slate-400 max-w-lg mx-auto leading-relaxed">
            Choose the domain you want to be assessed in. The engine will calibrate an adaptive baseline assessment tailored to that subject.
          </p>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {SUBJECTS.map((subject) => {
            const Icon = ICON_MAP_DYNAMIC[subject.icon] || Code2;
            const isSelected = activeId === subject.id;

            return (
              <button
                key={subject.id}
                type="button"
                id={`subject-card-${subject.id}`}
                onClick={() => handleSelect(subject.id)}
                className={`group relative text-left w-full rounded-2xl border p-6 transition-all duration-200 cursor-pointer outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-slate-950 ${
                  isSelected
                    ? `${subject.border} bg-slate-900/90 shadow-xl ${subject.glow}`
                    : 'border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 hover:border-slate-700 hover:shadow-lg hover:-translate-y-0.5'
                }`}
              >
                {/* Decorative top bar when selected */}
                {isSelected && (
                  <div className={`absolute top-0 left-6 right-6 h-0.5 rounded-full bg-gradient-to-r ${subject.gradient}`} />
                )}

                {/* Selected check badge */}
                {isSelected && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 className={`w-5 h-5 ${subject.accent} animate-fade-in`} />
                  </div>
                )}

                {/* Icon block */}
                <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-all duration-200 ${
                  isSelected
                    ? `bg-gradient-to-br ${subject.gradient} shadow-md`
                    : `${subject.bg} group-hover:bg-gradient-to-br group-hover:${subject.gradient}`
                }`}>
                  <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : subject.accent} transition-colors`} />
                </div>

                {/* Text */}
                <h2 className="text-lg font-bold text-white mb-1.5 tracking-tight">{subject.label}</h2>
                <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{subject.description}</p>

                {/* Selected label pill */}
                {isSelected && (
                  <div className={`mt-4 inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${subject.bg} ${subject.accent} border ${subject.border}`}>
                    <CheckCircle2 className="w-3 h-3" />
                    Selected
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Continue footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="text-sm text-slate-400 text-center sm:text-left">
            {activeId ? (
              <span className="text-white font-medium">
                ✓ {SUBJECTS.find((s) => s.id === activeId)?.label} selected — ready to begin
              </span>
            ) : (
              'Select a subject above to continue'
            )}
          </div>

          <Button
            variant="accent"
            size="lg"
            disabled={!activeId}
            onClick={handleContinue}
            className="w-full sm:w-auto min-w-[200px] group"
            id="continue-to-assessment-btn"
          >
            Continue to Assessment
            <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </main>
    </div>
  );
}

export default SelectSubject;
