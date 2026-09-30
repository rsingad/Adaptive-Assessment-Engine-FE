import { COMPETENCY_LEVELS, DIFFICULTY_LEVELS } from './constants';

/**
 * Format numeric ability score to 2 decimal places (e.g. 0.62)
 * NOTE: Keep for internal use / debug only. Do NOT surface in student UI.
 */
export function formatAbility(value) {
  if (typeof value !== 'number' || isNaN(value)) return '0.50';
  return Math.max(0, Math.min(1, value)).toFixed(2);
}

/**
 * Convert ability score (0-1) to a short, human-readable mastery tier label.
 * Students see: "Foundational", "Developing", "Proficient", "Advanced"
 *
 * These map directly to COMPETENCY_LEVELS labels but are intentionally
 * presented in pedagogical language instead of raw decimals.
 */
export function formatAbilityForStudent(value) {
  const score = typeof value === 'number' && !isNaN(value) ? value : 0.5;
  if (score < 0.35) return 'Foundational';
  if (score < 0.65) return 'Developing';
  if (score < 0.85) return 'Proficient';
  return 'Advanced';
}

/**
 * Convert a numeric ability delta (ability - previousAbility) to a
 * human-readable trend string shown to students in the live assessment view.
 * e.g.  +0.12 → "Improving"  |  -0.08 → "Adjusting"  |  0 → "Stable"
 */
export function getAbilityTrendLabel(delta) {
  if (typeof delta !== 'number' || isNaN(delta)) return 'Stable';
  if (delta > 0.05) return 'Improving';
  if (delta < -0.05) return 'Adjusting';
  return 'Stable';
}

/**
 * Express ability as 0–100 mastery percentage for student progress bars.
 */
export function getMasteryPercent(ability) {
  const score = typeof ability === 'number' && !isNaN(ability) ? ability : 0.5;
  return Math.round(Math.max(0, Math.min(1, score)) * 100);
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
