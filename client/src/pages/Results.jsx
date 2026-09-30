import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useAssessment from '../hooks/useAssessment';
import { useAuth } from '../context/AuthContext';
import assessmentService from '../services/assessmentService';

// Result components
import CompetencyScore from '../components/results/CompetencyScore';
import AdaptiveTimeline from '../components/results/AdaptiveTimeline';
import TopicPerformance from '../components/results/TopicPerformance';
import LearningGaps from '../components/results/LearningGaps';
import QuestionReview from '../components/results/QuestionReview';

// Assessment visualization components (reused from Phase 3)
import AbilityChart from '../components/assessment/AbilityChart';

// UI primitives
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import LoadingSpinner from '../components/ui/LoadingSpinner';

import {
  RotateCcw,
  Home as HomeIcon,
  Sparkles,
  ArrowRight,
  AlertCircle,
  FileText,
  Activity,
  Compass,
  Map,
  BookOpen,
  BarChart3,
  ClipboardList,
} from 'lucide-react';
import { APP_NAME } from '../utils/constants';

// ─── Loading Skeleton ───────────────────────────────────────────────────────────
function ResultsSkeleton() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-30 px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-800 animate-pulse" />
            <div className="w-36 h-4 bg-slate-800 rounded animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="w-20 h-8 bg-slate-800 rounded-xl animate-pulse" />
            <div className="w-36 h-8 bg-slate-800 rounded-xl animate-pulse" />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-12 space-y-6">
        {/* Title skeleton */}
        <div className="text-center space-y-3">
          <div className="w-40 h-3 bg-slate-800 rounded-full mx-auto animate-pulse" />
          <div className="w-72 h-8 bg-slate-800 rounded-xl mx-auto animate-pulse" />
          <div className="w-96 h-4 bg-slate-800 rounded-lg mx-auto animate-pulse" />
        </div>

        {/* CompetencyScore skeleton */}
        <div className="h-64 bg-slate-900/70 border border-slate-800 rounded-2xl animate-pulse" />

        {/* Two-column grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 h-56 bg-slate-900/70 border border-slate-800 rounded-2xl animate-pulse" />
          <div className="lg:col-span-6 h-56 bg-slate-900/70 border border-slate-800 rounded-2xl animate-pulse" />
        </div>

        {/* More cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-44 bg-slate-900/70 border border-slate-800 rounded-2xl animate-pulse" />
          <div className="h-44 bg-slate-900/70 border border-slate-800 rounded-2xl animate-pulse" />
        </div>
      </main>
    </div>
  );
}

// ─── Error State ────────────────────────────────────────────────────────────────
function ResultsError({ error, assessmentId, onRetry, onHome, onNewAssessment }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center border-slate-800 bg-slate-900/90 shadow-2xl space-y-5">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-2">Diagnostic Report Unavailable</h2>
          <p className="text-sm text-slate-400 leading-relaxed">{error}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          {assessmentId && (
            <Button variant="outline" onClick={onRetry} className="gap-1.5">
              <RotateCcw className="w-4 h-4" />
              Retry
            </Button>
          )}
          <Button variant="outline" onClick={onHome} className="gap-1.5">
            <HomeIcon className="w-4 h-4" />
            Home
          </Button>
          <Button variant="primary" onClick={onNewAssessment} className="gap-1.5">
            <BookOpen className="w-4 h-4" />
            New Assessment
          </Button>
        </div>
      </Card>
    </div>
  );
}

// ─── Section Divider ────────────────────────────────────────────────────────────
function SectionLabel({ icon: Icon, label, color = 'text-slate-400', iconColor = 'text-slate-400' }) {
  return (
    <div className="flex items-center gap-2 px-1">
      <Icon className={`w-4 h-4 ${iconColor}`} />
      <h2 className={`text-xs uppercase font-bold tracking-wider ${color}`}>
        {label}
      </h2>
      <div className="flex-1 h-px bg-slate-800/80" />
    </div>
  );
}

// ─── Main Results Page ───────────────────────────────────────────────────────────
export function Results() {
  const navigate = useNavigate();
  const { selectedSubject } = useAuth();
  const {
    results,
    assessmentId,
    abilityHistory,
    resetAssessment,
    startAssessment,
  } = useAssessment();

  const [activeResults, setActiveResults] = useState(results || null);
  const [loading, setLoading] = useState(!results);
  const [error, setError] = useState(null);

  // ── Fetch results from backend (or reuse in-memory results if already loaded) ──
  const fetchResultsData = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const data = await assessmentService.getResults(id);
      setActiveResults(data);
    } catch (err) {
      console.error('Failed to load assessment results:', err);
      const message =
        err.status === 404
          ? 'Assessment not found. It may have expired or the session ID is invalid.'
          : err.status === 401
          ? 'Your session has expired. Please log in again.'
          : err.data?.error || err.message || 'Unable to retrieve your assessment diagnostic report. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (results) {
      setActiveResults(results);
      setLoading(false);
    } else if (assessmentId) {
      // Re-fetch on page refresh using persisted assessmentId
      fetchResultsData(assessmentId);
    } else {
      setLoading(false);
      setError(
        'No assessment session found. Complete an adaptive baseline assessment to view your diagnostic report.'
      );
    }
  }, [results, assessmentId, fetchResultsData]);

  // ── Action Handlers ──────────────────────────────────────────────────────────
  const handleRetake = () => {
    resetAssessment();
    const subjectName = selectedSubject?.label || 'DSA';
    startAssessment({ subject: subjectName });
    navigate('/assessment');
  };

  const handleHome = () => {
    resetAssessment();
    navigate('/');
  };

  const handleContinueLearning = () => {
    navigate('/learning-path');
  };

  // ── Loading State ────────────────────────────────────────────────────────────
  if (loading) {
    return <ResultsSkeleton />;
  }

  // ── Error State ──────────────────────────────────────────────────────────────
  if (error && !activeResults) {
    return (
      <ResultsError
        error={error}
        assessmentId={assessmentId}
        onRetry={() => fetchResultsData(assessmentId)}
        onHome={handleHome}
        onNewAssessment={() => navigate('/select-subject')}
      />
    );
  }

  // ── Data extraction ──────────────────────────────────────────────────────────
  const data = activeResults;

  // Prefer trajectory from backend results; fall back to in-memory abilityHistory
  const journey =
    (data?.abilityJourney && data.abilityJourney.length > 0)
      ? data.abilityJourney
      : (abilityHistory && abilityHistory.length > 1)
      ? abilityHistory
      : [];

  const hasTrajectory = journey.length > 1;
  const hasLearningGaps = data?.learningGaps?.length > 0;
  const hasTopicPerformance = data?.topicPerformance?.length > 0;
  const hasQuestionHistory = data?.questionHistory?.length > 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative selection:bg-brand-500 selection:text-white">
      {/* Ambient gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-brand-600/15 via-accent-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-500/3 rounded-full blur-3xl pointer-events-none" />

      {/* ── Sticky Header ─────────────────────────────────────────────────────── */}
      <header className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-30 px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-white tracking-tight hidden sm:block">
              {APP_NAME} · Diagnostic Report
            </span>
            <span className="font-bold text-white tracking-tight sm:hidden">{APP_NAME}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button id="btn-home" variant="outline" size="sm" onClick={handleHome}>
              <HomeIcon className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Home</span>
            </Button>
            <Button id="btn-retake" variant="primary" size="sm" onClick={handleRetake}>
              <RotateCcw className="w-4 h-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Retake</span>
            </Button>
          </div>
        </div>
      </header>

      {/* ── Main Report Body ───────────────────────────────────────────────────── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 z-10">

        {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
        <div className="text-center space-y-2.5">
          <span className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-brand-400">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
            Assessment Complete
            {selectedSubject?.label && ` · ${selectedSubject.label}`}
            <div className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Diagnostic Summary &amp; Performance Insights
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Our item-response theory adaptive engine calibrated your domain ability score
            and mapped concept dependencies across {data?.totalQuestions || 'all assessed'} questions.
          </p>
        </div>

        {/* ── Section 1: Ability & Mastery Summary ─────────────────────────────── */}
        <div className="space-y-3">
          <SectionLabel
            icon={Sparkles}
            label="Ability & Mastery Summary"
            iconColor="text-brand-400"
            color="text-brand-400"
          />
          <CompetencyScore
            score={data?.competencyScore}
            level={data?.competencyLevel}
            correctCount={data?.correctCount}
            totalQuestions={data?.totalQuestions}
            accuracyPercentage={data?.accuracyPercentage}
          />
        </div>

        {/* ── Section 2: Performance Trajectory ────────────────────────────────── */}
        {hasTrajectory && (
          <div className="space-y-3">
            <SectionLabel
              icon={Activity}
              label="Performance Trajectory"
              iconColor="text-accent-400"
              color="text-accent-400"
            />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Recharts Line Chart */}
              <div className="lg:col-span-7">
                <AbilityChart history={journey} />
              </div>
              {/* Step-by-Step Timeline */}
              <div className="lg:col-span-5">
                <AdaptiveTimeline journey={journey} />
              </div>
            </div>
          </div>
        )}

        {/* ── Section 3: Learning Gap Map & Topic Performance ───────────────────── */}
        <div className="space-y-3">
          <SectionLabel
            icon={Map}
            label="Learning Gap Map & Topic Performance"
            iconColor="text-amber-400"
            color="text-amber-400"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <LearningGaps gaps={data?.learningGaps} />
            {hasTopicPerformance && <TopicPerformance topics={data?.topicPerformance} />}
          </div>
        </div>

        {/* ── Section 4: What We Found — Backend Diagnostic Insight ─────────────── */}
        {data?.diagnosis && (
          <div className="space-y-3">
            <SectionLabel
              icon={FileText}
              label="What We Found · Algorithmic Diagnosis"
              iconColor="text-accent-400"
              color="text-accent-400"
            />
            <Card className="p-6 border-accent-500/20 bg-gradient-to-br from-slate-900/90 to-accent-950/10 space-y-3">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {data.diagnosis}
              </p>
              {/* Weak topics quick list if backend provides them */}
              {data?.weakTopicsRaw && data.weakTopicsRaw.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-xs text-slate-500 font-medium self-center">
                    Weak Topics:
                  </span>
                  {data.weakTopicsRaw.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* ── Section 5: Question-by-Question Review ────────────────────────────── */}
        {hasQuestionHistory && (
          <div className="space-y-3">
            <SectionLabel
              icon={ClipboardList}
              label="Question-by-Question Review"
              iconColor="text-brand-400"
              color="text-brand-400"
            />
            <QuestionReview questionHistory={data.questionHistory} />
          </div>
        )}

        {/* ── Topic Performance (standalone if no learning gaps col) ────────────── */}
        {!hasLearningGaps && !hasTopicPerformance && (
          <div className="space-y-3">
            <SectionLabel
              icon={BarChart3}
              label="Topic Performance"
              iconColor="text-brand-400"
              color="text-brand-400"
            />
            <TopicPerformance topics={data?.topicPerformance || []} />
          </div>
        )}

        {/* ── Action Bar ─────────────────────────────────────────────────────────── */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-500 text-center sm:text-left max-w-xs">
            Ability scores range from 0.00 (Foundational) to 1.00 (Expert Mastery) and are calibrated using
            Item Response Theory.
          </span>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Button
              id="btn-retake-bottom"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={handleRetake}
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Retake Assessment
            </Button>

            <Button
              id="btn-continue-learning"
              variant="accent"
              className="w-full sm:w-auto min-w-[200px] shadow-lg shadow-brand-500/25 group"
              onClick={handleContinueLearning}
            >
              <Compass className="w-4 h-4 mr-1.5 text-accent-300" />
              <span>Continue Learning</span>
              <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Results;
