/**
 * AI Engine Index Exporter
 * Dedicated modular entry point for all AI-related services & LLM integrations.
 */
const { generateAIQuestion, generateTopicsForSubject } = require('./groqQuestionGenerator');

module.exports = {
  generateAIQuestion,
  generateTopicsForSubject
};
