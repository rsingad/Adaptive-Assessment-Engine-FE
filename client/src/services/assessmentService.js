import apiClient from './apiClient';
import { API_ENDPOINTS, COMPETENCY_LEVELS } from '../utils/constants';
import { 
  INITIAL_ASSESSMENT_RESPONSE, 
  MOCK_QUESTIONS_POOL, 
  MOCK_FINAL_RESULTS 
} from '../utils/mockData';

/**
 * Derive a short competency label from ability score (0-1)
 * Maps to Beginner / Intermediate / Proficient / Advanced
 * @param {number} ability
 * @returns {string}
 */
function deriveMasteryLabel(ability) {
  if (typeof ability !== 'number' || isNaN(ability)) return 'Intermediate';
  const score = Math.max(0, Math.min(1, ability));
  for (const level of COMPETENCY_LEVELS) {
    if (score >= level.min && score <= level.max) return level.label;
  }
  return 'Intermediate';
}

// Configurable flag: false = connects to live backend
const IS_MOCK_MODE = import.meta.env.VITE_USE_MOCK === 'true';

// Internal session tracking for simulated adaptive responses in mock mode
let mockSessionIndex = 0;
let currentMockAbility = 0.50;

/**
 * Service providing assessment actions with normalization for real backend API.
 */
export const assessmentService = {
  /**
   * Start a new adaptive assessment session
   * POST /api/assessment/start
   * @param {Object} params - { userId, subject }
   */
  async startAssessment({ userId = 'guest_user', subject = 'DSA' } = {}) {
    if (!IS_MOCK_MODE) {
      const response = await apiClient.post(API_ENDPOINTS.START, {
        userId,
        subject,
      });

      // Normalize real API response:
      // response has { assessmentId, ability, questionCount, totalQuestions, question, reason }
      return {
        assessmentId: response.assessmentId,
        ability: response.ability,
        questionCount: response.questionCount || 1,
        totalQuestions: response.totalQuestions || 10,
        question: response.question,
        reason: response.reason,
      };
    }

    // Mock response simulation fallback
    await new Promise((resolve) => setTimeout(resolve, 350));
    mockSessionIndex = 0;
    currentMockAbility = 0.50;
    return INITIAL_ASSESSMENT_RESPONSE;
  },

  /**
   * Submit an answer for the current question
   * POST /api/assessment/answer
   * @param {Object} payload - { assessmentId, questionId, selectedAnswer }
   */
  async submitAnswer({ assessmentId, questionId, selectedAnswer }) {
    if (!IS_MOCK_MODE) {
      const response = await apiClient.post(API_ENDPOINTS.ANSWER, {
        assessmentId,
        questionId,
        selectedAnswer: Number(selectedAnswer),
      });

      // Real backend response:
      // { assessmentId, correct, explanation, abilityBefore, abilityAfter, completed, questionCount, totalQuestions, reason, nextQuestion }
      return {
        correct: response.correct,
        explanation: response.explanation,
        abilityBefore: response.abilityBefore,
        ability: response.abilityAfter,
        completed: response.completed,
        isComplete: response.completed,
        questionCount: response.questionCount,
        totalQuestions: response.totalQuestions,
        reason: response.reason,
        question: response.nextQuestion,
      };
    }

    // Mock adaptive simulation fallback
    await new Promise((resolve) => setTimeout(resolve, 400));
    mockSessionIndex += 1;

    const currentQ = MOCK_QUESTIONS_POOL.find((q) => q.id === questionId) || MOCK_QUESTIONS_POOL[0];
    const isCorrect = Number(selectedAnswer) === currentQ.correctIndex;

    let nextQuestion;
    let reasonText = "";

    if (isCorrect) {
      const prevAbility = currentMockAbility;
      currentMockAbility = Math.min(0.95, Number((currentMockAbility + 0.12).toFixed(2)));
      nextQuestion = MOCK_QUESTIONS_POOL[Math.min(mockSessionIndex, MOCK_QUESTIONS_POOL.length - 1)];
      reasonText = `You answered correctly! Difficulty increased from ${prevAbility.toFixed(2)} to ${currentMockAbility.toFixed(2)}.`;
    } else {
      const prevAbility = currentMockAbility;
      currentMockAbility = Math.max(0.25, Number((currentMockAbility - 0.12).toFixed(2)));
      nextQuestion = MOCK_QUESTIONS_POOL.find((q) => q.topic === "Recursion") || MOCK_QUESTIONS_POOL[2];
      reasonText = `Possible prerequisite gap detected in ${nextQuestion.topic}. Before testing ${currentQ.topic} again, we're checking your foundation in ${nextQuestion.topic}.`;
    }

    return {
      correct: isCorrect,
      explanation: isCorrect ? "Great job!" : "Reviewing foundational concept.",
      ability: currentMockAbility,
      question: {
        id: nextQuestion.id,
        text: nextQuestion.text,
        options: nextQuestion.options,
        difficulty: nextQuestion.difficulty,
        topic: nextQuestion.topic,
        prerequisite: nextQuestion.prerequisite,
      },
      reason: reasonText,
      stepNumber: mockSessionIndex + 1,
      isComplete: mockSessionIndex >= 8,
      completed: mockSessionIndex >= 8,
    };
  },

  /**
   * Fetch complete assessment diagnostic results
   * GET /api/assessment/:id/results
   * @param {string} assessmentId
   */
  async getResults(assessmentId) {
    if (!IS_MOCK_MODE) {
      const response = await apiClient.get(API_ENDPOINTS.RESULTS(assessmentId));
      
      // Transform real API response to match UI shapes
      const trajectory = (response.trajectory || []).map((step, idx) => ({
        questionNumber: step.step || idx + 1,
        ability: step.ability,
        difficulty: step.difficulty || step.ability,
        correct: step.correct !== undefined ? step.correct : null,
        topic: step.topic || step.label || "Baseline",
        reason: step.reason,
      }));

      // Map weak topics to learning gaps using actual prerequisite information from questionHistory
      const learningGaps = (response.weakTopics || []).map((topic) => {
        const matchingHistoryItem = (response.questionHistory || []).find(
          (h) => h.topic === topic && !h.correct && h.prerequisite
        );
        const prerequisite = matchingHistoryItem?.prerequisite;
        
        return {
          topic,
          title: topic,
          prerequisite: prerequisite || null,
          description: prerequisite 
            ? `Identified concept gap in ${topic}. Foundational prerequisite topic: ${prerequisite}.` 
            : `Identified concept gap in ${topic} requiring targeted practice.`,
          recommendation: prerequisite 
            ? `Reinforce foundational understanding in ${prerequisite} before advancing in ${topic}.`
            : `Review core principles and practice problems in ${topic}.`,
        };
      });

      // Build topic performance breakdown from questionHistory
      const topicStats = {};
      (response.questionHistory || []).forEach((item) => {
        const t = item.topic || 'General';
        if (!topicStats[t]) topicStats[t] = { correct: 0, total: 0 };
        topicStats[t].total += 1;
        if (item.correct) topicStats[t].correct += 1;
      });

      const topicPerformance = Object.keys(topicStats).map((topic) => {
        const stats = topicStats[topic];
        const score = Math.round((stats.correct / stats.total) * 100);
        return {
          topic,
          score,
          status: score >= 80 ? 'Mastered' : score >= 60 ? 'Competent' : 'Review Required',
        };
      });

      return {
        assessmentId: response.assessmentId,
        competencyScore: response.finalAbility,
        // Short mastery label: Beginner / Intermediate / Proficient / Advanced
        competencyLevel: deriveMasteryLabel(response.finalAbility),
        correctCount: response.correctCount,
        totalQuestions: response.totalAnswered,
        // Use backend's already-computed percentage directly
        accuracyPercentage: response.accuracyPercentage,
        abilityJourney: trajectory,
        topicPerformance: topicPerformance.length > 0 ? topicPerformance : [
          { topic: 'Data Structures & Algorithms', score: response.accuracyPercentage, status: response.accuracyPercentage >= 60 ? 'Competent' : 'Review Required' }
        ],
        learningGaps,
        // Full diagnosis sentence from backend for the "What We Found" section
        diagnosis: response.diagnosis,
        // Raw weak topics array for additional reference
        weakTopicsRaw: response.weakTopics || [],
        questionHistory: response.questionHistory || [],
      };
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    return MOCK_FINAL_RESULTS;
  }
};

export default assessmentService;
