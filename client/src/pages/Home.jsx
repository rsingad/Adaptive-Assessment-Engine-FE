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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 p-0.5 shadow-md shadow-brand-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-accent-400" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight">{APP_NAME}</span>
              <span className="hidden md:inline-block ml-2 text-[11px] font-medium text-slate-400 border-l border-slate-800 pl-2">
                Adaptive Learning Engine
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl hover:bg-slate-900 border border-slate-800 transition-all"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="text-xs font-semibold text-white bg-brand-600 hover:bg-brand-500 px-4 py-2 rounded-xl shadow-md shadow-brand-600/20 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-14 space-y-16 lg:space-y-20 relative z-10">
        
        {/* ── Hero Section with Balanced 2-Column Product Layout ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-accent-400" />
              <span>Real-Time Diagnostic Assessment</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Personalized Learning That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-indigo-300 to-accent-300">
                Adapts To You.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-xl">
              Assess your knowledge. Discover your learning gaps. Follow a learning path built around your needs.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <Button
                variant="accent"
                size="lg"
                className="px-7 py-3.5 text-sm sm:text-base font-semibold shadow-xl shadow-brand-600/20 group cursor-pointer"
                onClick={() => navigate('/login')}
              >
                <span>Start Assessment</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="px-6 py-3.5 text-sm sm:text-base"
                onClick={() => {
                  const el = document.getElementById('how-it-works');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore How It Works
              </Button>
            </div>

            {/* Subtle Product Principles */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero rigid question lists</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-400" />
                <span>Root-cause prerequisite diagnosis</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Product Flow Preview (Not Fake Stats, Real Architecture) */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 shadow-2xl backdrop-blur-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  How AdaptiLearn Works
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 font-semibold border border-brand-500/20">
                  Active Cycle
                </span>
              </div>

              {/* Step Flow Architecture */}
              <div className="space-y-3">
                {/* Step 1 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-7 h-7 rounded-lg bg-brand-600/20 text-brand-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Starting Point Calibration</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Estimates initial understanding across foundational concepts.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-7 h-7 rounded-lg bg-accent-500/20 text-accent-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Adaptive Question Selection</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Dynamically scales difficulty up on success, or branches on error.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Learning Gap Identification</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Pins down the exact prerequisite topics that need strengthening.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">Targeted Learning Path</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Follow curriculum recommendations structured for your gaps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Section: Product Explanation & Differentiators ─────────────────── */}
        <div id="how-it-works" className="pt-6 space-y-8 text-left">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent-400">
              The Adaptive Difference
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Assessment built for growth, not just grading.
            </h2>
            <p className="text-sm text-slate-400 mt-2 leading-relaxed">
              Standard exams tell you what you got wrong. AdaptiLearn isolates <em>why</em> an error occurred by verifying conceptual dependencies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Continuous Calibration</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Rather than fixed quizzes, our engine updates estimated mastery with every answer to keep questions in your zone of proximal development.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                <GitBranch className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Prerequisite Gap Mapping</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                When an advanced question is missed, the platform tests upstream concepts to confirm whether the issue is the new topic or an unmastered prerequisite.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent-500/10 text-accent-400 border border-accent-500/20 flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Explainable Rationale</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                No black-box scoring. Every selected question provides pedagogical insight into why it was chosen and what skill it assesses.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/60 py-6 px-6 text-center text-xs text-slate-500">
        <p>© 2026 AdaptiLearn. Intelligent Adaptive Assessment & Learning Gap Diagnosis.</p>
      </footer>
    </div>
  );
}

export default Home;
