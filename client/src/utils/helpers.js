import { COMPETENCY_LEVELS, DIFFICULTY_LEVELS } from './constants';

/**
 * Format numeric ability score to 2 decimal places (e.g. 0.62)
 */
export function formatAbility(value) {
  if (typeof value !== 'number' || isNaN(value)) return '0.50';
  return Math.max(0, Math.min(1, value)).toFixed(2);
}

/**
 * Convert ability score (0-1) to competency level object
 */
export function getCompetencyMeta(ability) {
  const score = typeof ability === 'number' ? ability : 0.50;
  for (const level of COMPETENCY_LEVELS) {
    if (score >= level.min && score <= level.max) {
      return level;
    }
  }
  return COMPETENCY_LEVELS[1];
}

/**
 * Get difficulty meta based on 0-1 difficulty scale
 */
export function getDifficultyMeta(difficulty) {
  const diff = typeof difficulty === 'number' ? difficulty : 0.5;
  if (diff < 0.4) return DIFFICULTY_LEVELS.EASY;
  if (diff < 0.7) return DIFFICULTY_LEVELS.MEDIUM;
  return DIFFICULTY_LEVELS.HARD;
}

/**
 * Helper to combine class names safely
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
