const Question = require('../models/Question');
const { generateAIQuestion } = require('../ai_engine');

/**
 * Select the next question based on current ability score, previous question correctness, and prerequisite gaps.
 */
async function selectNextQuestion({ targetAbility, excludeQuestionIds = [], lastQuestion = null, lastWasCorrect = true, subject = 'DSA' }) {
  // 1. Check if last answer was incorrect AND last question has a prerequisite
  if (!lastWasCorrect && lastQuestion && lastQuestion.prerequisite) {
    const prereqTopic = lastQuestion.prerequisite;
    
    // Find candidate questions in the prerequisite topic not yet asked
    const prereqCandidates = await Question.find({
      _id: { $nin: excludeQuestionIds },
      subject,
      topic: prereqTopic
    });

    if (prereqCandidates.length > 0) {
      prereqCandidates.sort((a, b) => 
        Math.abs(a.difficulty - targetAbility) - Math.abs(b.difficulty - targetAbility)
      );

      return {
        question: prereqCandidates[0],
        prerequisiteTriggered: true,
        prerequisiteTopic: prereqTopic
      };
    } else {
      // AI Fallback Generation for Prerequisite Topic
      const aiQuestion = await generateAIQuestion({
        subject,
        prerequisiteTopic: prereqTopic,
        targetDifficulty: targetAbility
      });

      return {
        question: aiQuestion,
        prerequisiteTriggered: true,
        prerequisiteTopic: prereqTopic
      };
    }
  }

  // 2. Default adaptive selection: Find unused questions closest to target ability
  const availableQuestions = await Question.find({
    _id: { $nin: excludeQuestionIds },
    subject
  });

  if (availableQuestions.length === 0) {
    // AI Fallback Generation for General Ability Level
    const aiQuestion = await generateAIQuestion({
      subject,
      topic: lastQuestion ? lastQuestion.topic : 'Arrays',
      targetDifficulty: targetAbility
    });

    return {
      question: aiQuestion,
      prerequisiteTriggered: false,
      prerequisiteTopic: null
    };
  }

  // Sort by absolute distance between question difficulty and student ability
  availableQuestions.sort((a, b) => 
    Math.abs(a.difficulty - targetAbility) - Math.abs(b.difficulty - targetAbility)
  );

  return {
    question: availableQuestions[0],
    prerequisiteTriggered: false,
    prerequisiteTopic: null
  };
}

module.exports = {
  selectNextQuestion
};
