/**
 * AI Engine Index Exporter
 * Dedicated modular entry point for all AI-related services & LLM integrations.
 */
const { generateAIQuestion } = require('./groqQuestionGenerator');

module.exports = {
  generateAIQuestion
};
