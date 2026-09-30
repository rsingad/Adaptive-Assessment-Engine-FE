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

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <LoadingSpinner
          size="lg"
          message={`Initializing adaptive session for ${selectedSubject?.label || 'Computer Science'}...`}
        />
      </div>
    );
  }

  if (status === 'error' && !currentQuestion) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-6 text-center border-rose-500/30 bg-slate-900">
          <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Connection Error</h2>
          <p className="text-sm text-slate-400 mb-6">{error || 'Failed to communicate with assessment engine.'}</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate('/select-subject')}>
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Change Subject
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                resetAssessment();
                const subjectName = selectedSubject?.label || 'DSA';
                const userId = user?.id || 'guest_user';
                startAssessment({ userId, subject: subjectName });
              }}
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Retry
            </Button>
          </div>
        </Card>
      </div>
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 z-10">
        
        {/* Subject Bar */}
        {selectedSubject && (
          <div className="flex items-center justify-between">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${selectedSubject.border} ${selectedSubject.bg} ${selectedSubject.accent}`}>
              <SubjectIcon className="w-3.5 h-3.5" />
              <span>Subject: {selectedSubject.label}</span>
            </div>
            <button
              onClick={() => navigate('/select-subject')}
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Change Subject
            </button>
          </div>
        )}

        {/* Real-time Dynamic Rationale Banner */}
        <WhyQuestion
          reason={reason}
          explanation={explanation}
          ability={ability}
          previousAbility={previousAbility}
          prerequisite={currentQuestion?.prerequisite}
          isFirstQuestion={questionIndex === 1}
        />

        {/* Core Split Grid: Question vs Adaptive Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Question Column */}
          <div className="lg:col-span-7 space-y-6">
            <QuestionCard
              question={currentQuestion}
              questionNumber={questionIndex}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={selectAnswer}
              onSubmitAnswer={submitAnswer}
              isSubmitting={status === 'submitting'}
              error={error}
            />
          </div>

          {/* Metrics & Trajectory Column */}
          <div className="lg:col-span-5 space-y-6">
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
