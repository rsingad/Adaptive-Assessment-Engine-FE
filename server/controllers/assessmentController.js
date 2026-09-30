const Assessment = require('../models/Assessment');
const Question = require('../models/Question');
const { updateAbility, generateReason } = require('../services/adaptiveEngine');
const { selectNextQuestion } = require('../services/questionSelector');

// Initial starting ability score
const INITIAL_ABILITY = 0.50;
const MAX_QUESTIONS = 10;

/**
 * POST /api/assessment/start
 * Starts a new adaptive assessment session
 */
exports.startAssessment = async (req, res) => {
  try {
    const { userId = 'guest_user', subject = 'DSA' } = req.body;

    // Get initial starting question closest to INITIAL_ABILITY (0.50)
    const { question } = await selectNextQuestion({
      targetAbility: INITIAL_ABILITY,
      excludeQuestionIds: [],
      subject
    });

    if (!question) {
      return res.status(404).json({ error: 'No questions available in database. Run seed script.' });
    }

    const assessment = await Assessment.create({
      userId,
      subject,
      ability: INITIAL_ABILITY,
      currentQuestion: question._id,
      status: 'in_progress',
      totalQuestions: MAX_QUESTIONS,
      questionHistory: []
    });

    res.status(201).json({
      assessmentId: assessment._id,
      ability: INITIAL_ABILITY,
      questionCount: 1,
      totalQuestions: MAX_QUESTIONS,
      question: {
        id: question._id,
        text: question.question,
        options: question.options,
        difficulty: question.difficulty,
        topic: question.topic,
        prerequisite: question.prerequisite
      },
      reason: "Starting assessment with medium difficulty baseline (0.50)."
    });
  } catch (error) {
    console.error('Error starting assessment:', error);
    res.status(500).json({ error: 'Failed to start assessment' });
  }
};

/**
 * POST /api/assessment/answer
 * Processes answer for current question, updates ability, selects next question
 */
exports.submitAnswer = async (req, res) => {
  try {
    const { assessmentId, questionId, selectedAnswer } = req.body;

    if (!assessmentId || !questionId || selectedAnswer === undefined) {
      return res.status(400).json({ error: 'Missing required parameters: assessmentId, questionId, selectedAnswer' });
    }

    const assessment = await Assessment.findById(assessmentId);
    if (!assessment) {
      return res.status(404).json({ error: 'Assessment session not found' });
    }

    if (assessment.status === 'completed') {
      return res.status(400).json({ error: 'Assessment already completed' });
    }

    const currentQuestion = await Question.findById(questionId);
    if (!currentQuestion) {
      return res.status(404).json({ error: 'Question not found' });
    }

    // Check correctness
    const isCorrect = (Number(selectedAnswer) === currentQuestion.correctAnswer);

    // Ability calculation
    const abilityBefore = assessment.ability;
    const abilityAfter = updateAbility(abilityBefore, isCorrect);

    // List of already answered question IDs
    const answeredQuestionIds = assessment.questionHistory.map(h => h.questionId.toString());
    answeredQuestionIds.push(currentQuestion._id.toString());

    // Select next question
    const { question: nextQuestion, prerequisiteTriggered, prerequisiteTopic } = await selectNextQuestion({
      targetAbility: abilityAfter,
      excludeQuestionIds: answeredQuestionIds,
      lastQuestion: currentQuestion,
      lastWasCorrect: isCorrect,
      subject: assessment.subject || 'DSA'
    });

    // Generate rationale
    const reason = generateReason({
      isCorrect,
      abilityBefore,
      abilityAfter,
      prerequisiteTriggered,
      prerequisiteTopic,
      topic: currentQuestion.topic
    });

    // Save step to history
    assessment.questionHistory.push({
      questionId: currentQuestion._id,
      questionText: currentQuestion.question,
      topic: currentQuestion.topic,
      prerequisite: currentQuestion.prerequisite,
      difficulty: currentQuestion.difficulty,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      correct: isCorrect,
      abilityBefore,
      abilityAfter,
      reason
    });

    // Check completion condition (reached max questions or no questions remaining)
    const isCompleted = (assessment.questionHistory.length >= MAX_QUESTIONS) || !nextQuestion;

    assessment.ability = abilityAfter;
    if (isCompleted) {
      assessment.status = 'completed';
      assessment.completedAt = new Date();
      assessment.currentQuestion = null;
    } else {
      assessment.currentQuestion = nextQuestion._id;
    }

    await assessment.save();

    res.status(200).json({
      assessmentId: assessment._id,
      correct: isCorrect,
      explanation: currentQuestion.explanation,
      abilityBefore,
      abilityAfter,
      completed: isCompleted,
      questionCount: assessment.questionHistory.length,
      totalQuestions: MAX_QUESTIONS,
      reason,
      nextQuestion: isCompleted ? null : {
        id: nextQuestion._id,
        text: nextQuestion.question,
        options: nextQuestion.options,
        difficulty: nextQuestion.difficulty,
        topic: nextQuestion.topic,
        prerequisite: nextQuestion.prerequisite
      }
    });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
};

/**
 * GET /api/assessment/:id/results
 * Fetches final assessment summary, diagnosis, and ability trajectory history
 */
exports.getResults = async (req, res) => {
  try {
    const { id } = req.params;

    const assessment = await Assessment.findById(id).populate('questionHistory.questionId');
    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }

    const history = assessment.questionHistory;
    const totalAnswered = history.length;
    const correctCount = history.filter(h => h.correct).length;
    const accuracy = totalAnswered > 0 ? Number(((correctCount / totalAnswered) * 100).toFixed(1)) : 0;

    // Identify weak topics (where student got questions incorrect)
    const weakTopicsMap = {};
    history.forEach(item => {
      if (!item.correct) {
        weakTopicsMap[item.topic] = (weakTopicsMap[item.topic] || 0) + 1;
      }
    });

    const weakTopics = Object.keys(weakTopicsMap);

    // Ability trajectory data for frontend chart
    const trajectory = [
      { step: 0, ability: INITIAL_ABILITY, label: 'Initial Baseline' },
      ...history.map((item, idx) => ({
        step: idx + 1,
        ability: item.abilityAfter,
        correct: item.correct,
        topic: item.topic,
        difficulty: item.difficulty,
        reason: item.reason
      }))
    ];

    // Final skill diagnosis based on final ability
    let diagnosis = '';
    const finalAbility = assessment.ability;
    if (finalAbility >= 0.80) {
      diagnosis = 'Advanced mastery in Data Structures & Algorithms. Demonstrates high problem-solving capacity.';
    } else if (finalAbility >= 0.60) {
      diagnosis = 'Intermediate competency. Solid understanding of foundational topics with minor gaps in advanced structures.';
    } else if (finalAbility >= 0.40) {
      diagnosis = 'Basic proficiency. Recommended to review prerequisite core concepts like Arrays and Queues.';
    } else {
      diagnosis = 'Foundational level gap detected. Intensive review on core data structure prerequisites advised.';
    }

    res.status(200).json({
      assessmentId: assessment._id,
      finalAbility: assessment.ability,
      status: assessment.status,
      totalAnswered,
      correctCount,
      accuracyPercentage: accuracy,
      weakTopics,
      diagnosis,
      trajectory,
      questionHistory: history
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Failed to retrieve assessment results' });
  }
};
