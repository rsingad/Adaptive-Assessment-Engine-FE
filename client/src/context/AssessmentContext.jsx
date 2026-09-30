import React, { createContext, useContext, useState, useCallback } from 'react';
import assessmentService from '../services/assessmentService';
import { TOTAL_ASSESSMENT_QUESTIONS, DEFAULT_INITIAL_ABILITY } from '../utils/constants';

const AssessmentContext = createContext(null);

export function AssessmentProvider({ children }) {
  const [assessmentId, setAssessmentId] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [ability, setAbility] = useState(DEFAULT_INITIAL_ABILITY);
  const [previousAbility, setPreviousAbility] = useState(DEFAULT_INITIAL_ABILITY);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [totalQuestions] = useState(TOTAL_ASSESSMENT_QUESTIONS);
  const [reason, setReason] = useState("Assessment initialized.");
  const [abilityHistory, setAbilityHistory] = useState([
    { questionNumber: 1, ability: DEFAULT_INITIAL_ABILITY, difficulty: DEFAULT_INITIAL_ABILITY, correct: null, topic: "Baseline" }
  ]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'in-progress' | 'submitting' | 'completed' | 'error'
  const [lastFeedback, setLastFeedback] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Start or restart an assessment session
   */
  const startAssessment = useCallback(async () => {
    setStatus('loading');
    setError(null);
    setSelectedAnswer(null);
    setLastFeedback(null);
    try {
      const response = await assessmentService.startAssessment();
      setAssessmentId(response.assessmentId);
      setCurrentQuestion(response.question);
      setAbility(response.ability);
      setPreviousAbility(response.ability);
      setReason(response.reason || "Starting calibration assessment.");
      setQuestionIndex(1);
      setAbilityHistory([
        {
          questionNumber: 1,
          ability: response.ability,
          difficulty: response.question?.difficulty || 0.5,
          correct: null,
          topic: response.question?.topic || "General"
        }
      ]);
      setStatus('in-progress');
    } catch (err) {
      console.error("Failed to start assessment:", err);
      setError(err.message || "Failed to start assessment session");
      setStatus('error');
    }
  }, []);

  /**
   * Select an answer option
   */
  const selectAnswer = useCallback((answerIndex) => {
    if (status === 'submitting') return;
    setSelectedAnswer(answerIndex);
  }, [status]);

  /**
   * Submit current answer and adaptively progress to next question
   */
  const submitAnswer = useCallback(async () => {
    if (selectedAnswer === null || !currentQuestion || !assessmentId) return;

    setStatus('submitting');
    setError(null);
    try {
      const payload = {
        assessmentId,
        questionId: currentQuestion.id,
        answer: selectedAnswer,
      };

      const response = await assessmentService.submitAnswer(payload);

      setLastFeedback({
        correct: response.correct,
        reason: response.reason,
      });

      setPreviousAbility(ability);
      setAbility(response.ability);
      setReason(response.reason);

      // Record journey history point
      const nextIndex = questionIndex + 1;
      setAbilityHistory((prev) => [
        ...prev,
        {
          questionNumber: nextIndex,
          ability: response.ability,
          difficulty: response.question?.difficulty || 0.5,
          correct: response.correct,
          topic: currentQuestion.topic,
        }
      ]);

      if (response.isComplete || nextIndex > totalQuestions) {
        setStatus('completed');
        // Fetch or prepare diagnostic results
        const finalResults = await assessmentService.getResults(assessmentId);
        setResults(finalResults);
      } else {
        setCurrentQuestion(response.question);
        setQuestionIndex(nextIndex);
        setSelectedAnswer(null);
        setStatus('in-progress');
      }
    } catch (err) {
      console.error("Failed to submit answer:", err);
      setError(err.message || "Failed to submit answer");
      setStatus('error');
    }
  }, [assessmentId, currentQuestion, selectedAnswer, ability, questionIndex, totalQuestions]);

  /**
   * Reset the assessment session
   */
  const resetAssessment = useCallback(() => {
    setAssessmentId(null);
    setCurrentQuestion(null);
    setAbility(DEFAULT_INITIAL_ABILITY);
    setPreviousAbility(DEFAULT_INITIAL_ABILITY);
    setQuestionIndex(1);
    setReason("Assessment reset.");
    setAbilityHistory([]);
    setSelectedAnswer(null);
    setLastFeedback(null);
    setResults(null);
    setError(null);
    setStatus('idle');
  }, []);

  const value = {
    assessmentId,
    currentQuestion,
    ability,
    previousAbility,
    questionIndex,
    totalQuestions,
    reason,
    abilityHistory,
    selectedAnswer,
    status,
    lastFeedback,
    results,
    error,
    startAssessment,
    selectAnswer,
    submitAnswer,
    resetAssessment,
  };

  return (
    <AssessmentContext.Provider value={value}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessmentContext() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessmentContext must be used within an AssessmentProvider');
  }
  return context;
}
