import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { 
  Sparkles, 
  ArrowRight, 
  Activity, 
  BrainCircuit, 
  Target, 
  HelpCircle, 
  GitBranch, 
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { APP_NAME, APP_TAGLINE } from '../utils/constants';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden selection:bg-brand-500 selection:text-white">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-gradient-to-b from-brand-600/15 via-accent-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-700/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-accent-600/15 rounded-full blur-[128px] pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="w-full border-b border-slate-800/80 backdrop-blur-xl bg-slate-950/60 sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 p-0.5 shadow-lg shadow-brand-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-accent-400" />
              </div>
            </div>
            <span className="text-lg font-bold text-white tracking-tight">{APP_NAME}</span>
          </div>

          <Badge variant="brand" icon={Sparkles}>
            Hackathon Edition
          </Badge>
          <Link
            to="/login"
            className="text-xs font-semibold text-brand-400 hover:text-brand-300 px-3 py-1.5 rounded-lg border border-brand-500/30 hover:bg-brand-500/10 transition-all"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-inner mb-6">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span className="text-xs font-semibold text-slate-300">
            Intelligent Item Response Theory & Dynamic Calibration
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1] mb-6">
          Assessments that adapt to your knowledge in{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-300 to-accent-300">
            real time.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed mb-10">
          Traditional tests give everyone the same rigid sequence. <strong className="text-white">AdaptiLearn</strong> calibrates difficulty on the fly, explains every selection, and diagnoses hidden prerequisite gaps.
        </p>

        {/* Start Assessment CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <Button
            variant="accent"
            size="lg"
            className="w-full sm:w-auto px-8 py-4 text-base shadow-xl shadow-brand-600/25 group cursor-pointer"
            onClick={() => navigate('/login')}
          >
            <span>Start Adaptive Assessment</span>
            <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => {
              const el = document.getElementById('how-it-works');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore How It Works
          </Button>
        </div>

        {/* Key Product Differentiation Grid */}
        <div id="how-it-works" className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 text-left my-8">
          <Card className="p-6 relative overflow-hidden border-slate-800" hoverEffect={true}>
            <div className="p-3 w-fit rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
              <Sliders className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Dynamic Difficulty Tuning</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Continuous latent ability calculation ensures students never waste time on questions too easy or demotivatingly hard.
            </p>
          </Card>

          <Card className="p-6 relative overflow-hidden border-slate-800" hoverEffect={true}>
            <div className="p-3 w-fit rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
              <GitBranch className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Prerequisite Gap Detection</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              When a complex question fails, the engine analyzes conceptual dependencies and verifies fundamental building blocks.
            </p>
          </Card>

          <Card className="p-6 relative overflow-hidden border-slate-800" hoverEffect={true}>
            <div className="p-3 w-fit rounded-xl bg-accent-500/10 text-accent-400 border border-accent-500/20 mb-4">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Explainable AI Reasoning</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Transparency built-in. Every question presents a "Why this question?" insight explaining the engine's real-time rationale.
            </p>
          </Card>
        </div>

        {/* Comparison Callout: Traditional vs AdaptiLearn */}
        <Card className="w-full mt-8 p-6 sm:p-8 bg-slate-900/60 border-slate-800 text-left">
          <div className="flex flex-col md:flex-row items-stretch gap-6">
            <div className="flex-1 p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <span className="text-xs uppercase font-bold tracking-wider text-rose-400 mb-2 block">
                Traditional Testing
              </span>
              <p className="text-xs sm:text-sm text-slate-400 mb-3">
                Static fixed question list. A beginner gets crushed by question 3; an expert is bored until question 9.
              </p>
              <div className="text-xs text-slate-500 font-mono">
                Q1 (Static) → Q2 (Static) → Q3 (Static)
              </div>
            </div>

            <div className="flex-1 p-5 rounded-2xl bg-brand-950/30 border border-brand-500/30 shadow-lg shadow-brand-500/5">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 mb-2 block">
                AdaptiLearn Engine
              </span>
              <p className="text-xs sm:text-sm text-slate-300 mb-3">
                Dynamically responsive. Difficulty expands on success; errors immediately branch to diagnose prerequisite foundations.
              </p>
              <div className="text-xs text-brand-300 font-mono">
                Ability 0.50 → Correct (0.62) → Wrong → Prerequisite Check
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/60 py-6 px-6 text-center text-xs text-slate-400">
        <p>© 2026 AdaptiLearn — Built for MERN-Stack Adaptive Assessment Hackathon</p>
      </footer>
    </div>
  );
}

export default Home;
