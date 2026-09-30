import apiClient from './apiClient';
import { API_ENDPOINTS } from '../utils/constants';
import { 
  INITIAL_ASSESSMENT_RESPONSE, 
  MOCK_QUESTIONS_POOL, 
  MOCK_FINAL_RESULTS 
} from '../utils/mockData';

// Configurable flag: defaults to true during frontend phase until backend is running
const IS_MOCK_MODE = import.meta.env.VITE_USE_MOCK !== 'false';

// Internal session tracking for simulated adaptive responses in mock mode
let mockSessionIndex = 0;
let currentMockAbility = 0.50;

/**
 * Service providing assessment actions.
 * Toggling VITE_USE_MOCK=false routes immediately to live backend endpoints.
 */
export const assessmentService = {
  /**
   * Start a new adaptive assessment session
   * POST /api/assessment/start
   */
  async startAssessment() {
    if (!IS_MOCK_MODE) {
      return await apiClient.post(API_ENDPOINTS.START);
    }

    // Mock response simulation
    await new Promise((resolve) => setTimeout(resolve, 350));
    mockSessionIndex = 0;
    currentMockAbility = 0.50;
    return INITIAL_ASSESSMENT_RESPONSE;
  },

  /**
   * Submit an answer for the current question
   * POST /api/assessment/answer
   * @param {Object} payload - { assessmentId, questionId, answer }
   */
  async submitAnswer({ assessmentId, questionId, answer }) {
    if (!IS_MOCK_MODE) {
      return await apiClient.post(API_ENDPOINTS.ANSWER, {
        assessmentId,
        questionId,
        answer,
      });
    }

    // Mock adaptive simulation
    await new Promise((resolve) => setTimeout(resolve, 400));
    mockSessionIndex += 1;

    // Retrieve question data for correctness check in mock mode
    const currentQ = MOCK_QUESTIONS_POOL.find((q) => q.id === questionId) || MOCK_QUESTIONS_POOL[0];
    const isCorrect = Number(answer) === currentQ.correctIndex;

    let nextQuestion;
    let reasonText = "";

    if (isCorrect) {
      // Scenario 1: Correct answer -> Ability increases, harder question served
      const prevAbility = currentMockAbility;
      currentMockAbility = Math.min(0.95, Number((currentMockAbility + 0.12).toFixed(2)));
      nextQuestion = MOCK_QUESTIONS_POOL[Math.min(mockSessionIndex, MOCK_QUESTIONS_POOL.length - 1)];
      reasonText = `You answered correctly! Difficulty increased from ${prevAbility.toFixed(2)} to ${currentMockAbility.toFixed(2)}.`;
    } else {
      // Scenario 2 & 3: Incorrect answer -> Ability drops, check prerequisite
      const prevAbility = currentMockAbility;
      currentMockAbility = Math.max(0.25, Number((currentMockAbility - 0.12).toFixed(2)));
      // Prerequisite branch
      nextQuestion = MOCK_QUESTIONS_POOL.find((q) => q.topic === "Recursion") || MOCK_QUESTIONS_POOL[2];
      reasonText = `Possible prerequisite gap detected in ${nextQuestion.topic}. Before testing ${currentQ.topic} again, we're checking your foundation in ${nextQuestion.topic}.`;
    }

    return {
      correct: isCorrect,
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
    };
  },

  /**
   * Fetch complete assessment diagnostic results
   * @param {string} assessmentId
   */
  async getResults(assessmentId) {
    if (!IS_MOCK_MODE) {
      return await apiClient.get(`/api/assessment/results/${assessmentId}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    return MOCK_FINAL_RESULTS;
  }
};

export default assessmentService;
