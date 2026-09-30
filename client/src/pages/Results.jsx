import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAssessment from '../hooks/useAssessment';
import CompetencyScore from '../components/results/CompetencyScore';
import AdaptiveTimeline from '../components/results/AdaptiveTimeline';
import TopicPerformance from '../components/results/TopicPerformance';
import LearningGaps from '../components/results/LearningGaps';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { RotateCcw, Home as HomeIcon, Download, Sparkles } from 'lucide-react';
import { MOCK_FINAL_RESULTS } from '../utils/mockData';
import { APP_NAME } from '../utils/constants';

export function Results() {
  const navigate = useNavigate();
  const { results, abilityHistory, resetAssessment, startAssessment } = useAssessment();
  const [activeResults, setActiveResults] = useState(results || null);
  const [loading, setLoading] = useState(!results);

  useEffect(() => {
    if (results) {
      setActiveResults(results);
      setLoading(false);
    } else {
      // If user navigated directly to /results, hydrate with representative diagnostic data
      const timer = setTimeout(() => {
        setActiveResults(MOCK_FINAL_RESULTS);
        setLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [results]);

  const handleRetake = () => {
    resetAssessment();
    startAssessment();
    navigate('/assessment');
  };

  const handleHome = () => {
    resetAssessment();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <LoadingSpinner size="lg" message="Synthesizing adaptive competency diagnostic report..." />
      </div>
    );
  }

  const data = activeResults || MOCK_FINAL_RESULTS;
  // Use session ability history if available, else mock
  const journey = (abilityHistory && abilityHistory.length > 1) 
    ? abilityHistory 
    : data.abilityJourney;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative selection:bg-brand-500 selection:text-white">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-brand-600/10 via-accent-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-30 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center text-white font-bold text-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-white tracking-tight">{APP_NAME} Results</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleHome}>
              <HomeIcon className="w-4 h-4 mr-1.5" />
              Home
            </Button>
            <Button variant="primary" size="sm" onClick={handleRetake}>
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Retake Assessment
            </Button>
          </div>
        </div>
      </header>

      {/* Main Report Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        
        {/* Top Summary Banner */}
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-brand-400">
            Comprehensive Diagnostic Evaluation
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Assessment Results & Diagnostic Insights
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Our adaptive algorithm converged on your current ability tier and analyzed underlying concept dependencies.
          </p>
        </div>

        {/* Competency Card */}
        <CompetencyScore
          score={data.competencyScore}
          level={data.competencyLevel}
          correctCount={data.correctCount || 6}
          totalQuestions={data.totalQuestions || 8}
        />

        {/* Adaptive Timeline Sequence */}
        <AdaptiveTimeline
          journey={journey}
        />

        {/* Two-Column Deep-Dive: Topic Mastery & Identified Gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TopicPerformance
            topics={data.topicPerformance}
          />

          <LearningGaps
            gaps={data.learningGaps}
          />
        </div>

        {/* Bottom Callout Actions */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-slate-400 text-center sm:text-left">
            Scores are normalized between 0.00 (Foundational) and 1.00 (Expert Mastery).
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="secondary" className="w-full sm:w-auto" onClick={() => window.print()}>
              <Download className="w-4 h-4 mr-1.5" />
              Export Report
            </Button>
            <Button variant="accent" className="w-full sm:w-auto" onClick={handleRetake}>
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Retake Assessment
            </Button>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Results;
