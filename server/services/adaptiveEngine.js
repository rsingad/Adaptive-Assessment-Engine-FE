/**
 * Calculate updated student ability based on whether the answer was correct or wrong.
 * Ability score is bounded between 0.10 and 1.00.
 */
function updateAbility(currentAbility, isCorrect) {
  let step = 0.12;
  let newAbility;

  if (isCorrect) {
    newAbility = currentAbility + step;
  } else {
    newAbility = currentAbility - step;
  }

  // Keep ability strictly within range [0.10, 1.00]
  return Number(Math.max(0.10, Math.min(1.00, newAbility)).toFixed(2));
}

/**
 * Generate human-readable reason for why a question was selected.
 */
function generateReason({ isCorrect, abilityBefore, abilityAfter, prerequisiteTriggered, prerequisiteTopic, topic }) {
  if (prerequisiteTriggered) {
    return `Incorrect answer detected on topic '${topic}'. Checking prerequisite foundation in '${prerequisiteTopic}'. Difficulty adjusted to match prerequisite level.`;
  }

  if (isCorrect) {
    return `Correct answer! Increasing student ability score from ${abilityBefore.toFixed(2)} → ${abilityAfter.toFixed(2)}. Selecting next question with matching higher difficulty.`;
  }

  return `Incorrect answer. Decreasing student ability score from ${abilityBefore.toFixed(2)} → ${abilityAfter.toFixed(2)}. Selecting lower difficulty question to recalibrate.`;
}

module.exports = {
  updateAbility,
  generateReason
};
