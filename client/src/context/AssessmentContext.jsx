import React, { createContext, useContext, useState, useCallback } from 'react';
import assessmentService from '../services/assessmentService';
import { TOTAL_ASSESSMENT_QUESTIONS, DEFAULT_INITIAL_ABILITY } from '../utils/constants';

const AssessmentContext = createContext(null);

function loadPersistedAssessmentId() {
  try {
    return localStorage.getItem('adaptilearn_assessment_id_v1') || null;
  } catch {
    return null;
  }
}

function persistAssessmentId(id) {
  try {
    if (id) {
      localStorage.setItem('adaptilearn_assessment_id_v1', id);
    } else {
      localStorage.removeItem('adaptilearn_assessment_id_v1');
    }
  } catch {
    // ignore
  }
}

export function AssessmentProvider({ children }) {
  const [assessmentId, setAssessmentIdState] = useState(() => loadPersistedAssessmentId());

  const setAssessmentId = useCallback((id) => {
    setAssessmentIdState(id);
    persistAssessmentId(id);
  }, []);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [ability, setAbility] = useState(DEFAULT_INITIAL_ABILITY);
  const [previousAbility, setPreviousAbility] = useState(DEFAULT_INITIAL_ABILITY);
  const [questionIndex, setQuestionIndex] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(TOTAL_ASSESSMENT_QUESTIONS);
  const [reason, setReason] = useState("Starting assessment with medium difficulty baseline (0.50).");
  const [explanation, setExplanation] = useState(null);
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
   * @param {Object} options - { userId, subject }
   */
  const startAssessment = useCallback(async (options = {}) => {
    setStatus('loading');
    setError(null);
    setSelectedAnswer(null);
    setLastFeedback(null);
    setExplanation(null);
    try {
      const response = await assessmentService.startAssessment({
        userId: options.userId || 'guest_user',
        subject: options.subject || 'DSA',
      });

      setAssessmentId(response.assessmentId);
      setCurrentQuestion(response.question);
      setAbility(response.ability);
      setPreviousAbility(response.ability);
      setReason(response.reason || "Starting calibration assessment.");
      setQuestionIndex(response.questionCount || 1);
      setTotalQuestions(response.totalQuestions || TOTAL_ASSESSMENT_QUESTIONS);
      setAbilityHistory([
        {
          questionNumber: response.questionCount || 1,
          ability: response.ability,
          difficulty: response.question?.difficulty || 0.5,
          correct: null,
          topic: response.question?.topic || "Baseline"
        }
      ]);
      setStatus('in-progress');
    } catch (err) {
      console.error("Failed to start assessment:", err);
      setError(err.data?.error || err.message || "Failed to start assessment session");
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
        selectedAnswer,
      };

      const response = await assessmentService.submitAnswer(payload);

      setLastFeedback({
        correct: response.correct,
        reason: response.reason,
        explanation: response.explanation,
      });
      setExplanation(response.explanation || null);

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
          difficulty: currentQuestion.difficulty || 0.5,
          correct: response.correct,
          topic: currentQuestion.topic,
          reason: response.reason,
        }
      ]);

      if (response.completed || response.isComplete || !response.question) {
        setStatus('completed');
        // Fetch real diagnostic results from backend
        const finalResults = await assessmentService.getResults(assessmentId);
        setResults(finalResults);
      } else {
        setCurrentQuestion(response.question);
        setQuestionIndex(response.questionCount + 1 || nextIndex);
        setSelectedAnswer(null);
        setStatus('in-progress');
      }
    } catch (err) {
      console.error("Failed to submit answer:", err);
      setError(err.data?.error || err.message || "Failed to submit answer");
      setStatus('error');
    }
  }, [assessmentId, currentQuestion, selectedAnswer, ability, questionIndex]);

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
    setExplanation(null);
    setAbilityHistory([]);
    setSelectedAnswer(null);
    setLastFeedback(null);
    setResults(null);
    setError(null);
    setStatus('idle');
  }, [setAssessmentId]);

  const value = {
    assessmentId,
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

export default AssessmentContext;
