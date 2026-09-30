import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useAssessment from '../hooks/useAssessment';
import AssessmentHeader from '../components/assessment/AssessmentHeader';
import QuestionCard from '../components/assessment/QuestionCard';
import AbilityGauge from '../components/assessment/AbilityGauge';
import AbilityChart from '../components/assessment/AbilityChart';
import WhyQuestion from '../components/assessment/WhyQuestion';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { AlertCircle, RotateCcw, ArrowLeft, BookOpen } from 'lucide-react';
import { ICON_MAP_DYNAMIC } from '../utils/subjectIcons';

import PreparingAssessment from '../components/assessment/PreparingAssessment';

export function Assessment() {
  const navigate = useNavigate();
  const { user, selectedSubject } = useAuth();
  const {
    currentQuestion,
    ability,
    previousAbility,
    questionIndex,
    totalQuestions,
    reason,
    explanation,
    abilityHistory,
    selectedAnswer,
    status,
    error,
    startAssessment,
    selectAnswer,
    submitAnswer,
    resetAssessment,
  } = useAssessment();

  // Auto-start assessment if idle
  useEffect(() => {
    if (status === 'idle') {
      const subjectName = selectedSubject?.label || 'DSA';
      const userId = user?.id || 'guest_user';
      startAssessment({ userId, subject: subjectName });
    }
  }, [status, startAssessment, selectedSubject, user]);

  // Navigate to results when completed
  useEffect(() => {
    if (status === 'completed') {
      navigate('/results');
    }
  }, [status, navigate]);

  const progressPercentage = Math.round(((questionIndex - 1) / totalQuestions) * 100);
  const SubjectIcon = selectedSubject ? (ICON_MAP_DYNAMIC[selectedSubject.icon] || BookOpen) : BookOpen;

  // Render Full-Screen Calibration UI during Loading
  if (status === 'loading') {
    return (
      <PreparingAssessment
        subjectName={selectedSubject?.label || 'Mathematics'}
      />
    );
  }

  // Render Error UI if initialization failed
  if (status === 'error' && !currentQuestion) {
    return (
      <PreparingAssessment
        subjectName={selectedSubject?.label || 'Mathematics'}
        error={error || 'Failed to communicate with assessment engine.'}
        onChangeSubject={() => navigate('/select-subject')}
        onRetry={() => {
          resetAssessment();
          const subjectName = selectedSubject?.label || 'DSA';
          const userId = user?.id || 'guest_user';
          startAssessment({ userId, subject: subjectName });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative overflow-hidden selection:bg-brand-500 selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gradient-to-b from-brand-600/10 via-accent-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Dynamic Header */}
      <AssessmentHeader
        questionIndex={questionIndex}
        totalQuestions={totalQuestions}
        progressPercentage={progressPercentage}
        onReset={() => {
          if (window.confirm('Are you sure you want to restart this assessment session?')) {
            resetAssessment();
            const subjectName = selectedSubject?.label || 'DSA';
            const userId = user?.id || 'guest_user';
            startAssessment({ userId, subject: subjectName });
          }
        }}
      />

      {/* Main Content Layout */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 z-10">
        
        {/* Subject Context Bar */}
        {selectedSubject && (
          <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Assessing:</span>
              <span className="font-semibold text-white flex items-center gap-1.5">
                <SubjectIcon className="w-3.5 h-3.5 text-accent-400" />
                {selectedSubject.label}
              </span>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Leave assessment and choose a different domain?')) {
                  resetAssessment();
                  navigate('/select-subject');
                }
              }}
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            >
              Exit to Subjects
            </button>
          </div>
        )}

        {/* Core Layout: Question Dominates (8 cols), Metrics Support (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Question Primary Column */}
          <div className="lg:col-span-8 space-y-5">
            <QuestionCard
              question={currentQuestion}
              questionNumber={questionIndex}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={selectAnswer}
              onSubmitAnswer={submitAnswer}
              isSubmitting={status === 'submitting'}
              error={error}
            />

            {/* Subtle Pedagogical Rationale underneath the Question */}
            <WhyQuestion
              reason={reason}
              explanation={explanation}
              ability={ability}
              previousAbility={previousAbility}
              prerequisite={currentQuestion?.prerequisite}
              isFirstQuestion={questionIndex === 1}
            />
          </div>

          {/* Metrics Column: Supporting rather than overwhelming */}
          <div className="lg:col-span-4 space-y-5">
            <AbilityGauge
              ability={ability}
              previousAbility={previousAbility}
            />

            <AbilityChart
              history={abilityHistory}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Assessment;
