import { useAssessmentContext } from '../context/AssessmentContext';
import { getCompetencyMeta, getDifficultyMeta, formatAbility } from '../utils/helpers';

/**
 * Custom hook exposing assessment state and helper utilities
 */
export function useAssessment() {
  const context = useAssessmentContext();

  const competency = getCompetencyMeta(context.ability);
  const previousCompetency = getCompetencyMeta(context.previousAbility);
  const difficultyMeta = context.currentQuestion ? getDifficultyMeta(context.currentQuestion.difficulty) : null;
  const progressPercentage = Math.round(((context.questionIndex - 1) / context.totalQuestions) * 100);

  const abilityDelta = Number((context.ability - context.previousAbility).toFixed(2));

  return {
    ...context,
    formattedAbility: formatAbility(context.ability),
    formattedPreviousAbility: formatAbility(context.previousAbility),
    competency,
    previousCompetency,
    difficultyMeta,
    progressPercentage,
    abilityDelta,
    isSubmitting: context.status === 'submitting',
    isLoading: context.status === 'loading',
    isComplete: context.status === 'completed',
  };
}

export default useAssessment;
