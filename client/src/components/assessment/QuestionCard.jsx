import React from 'react';
import Card, { CardHeader, CardContent, CardFooter } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import AnswerOption from './AnswerOption';
import { Layers, ArrowRight, BookOpen } from 'lucide-react';
import { getDifficultyMeta } from '../../utils/helpers';

export function QuestionCard({
  question,
  questionNumber = 1,
  selectedAnswer,
  onSelectAnswer,
  onSubmitAnswer,
  isSubmitting = false,
  error,
}) {
  if (!question) {
    return (
      <Card className="p-8 text-center text-slate-400">
        <p>No active question loaded.</p>
      </Card>
    );
  }

  const difficultyMeta = getDifficultyMeta(question.difficulty);

  return (
    <Card className="border-slate-800 shadow-2xl relative overflow-hidden animate-slide-up">
      {/* Decorative top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-600 via-accent-500 to-indigo-500" />

      {/* Header with Topic & Difficulty */}
      <CardHeader className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/40">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="brand" icon={Layers}>
            {question.topic || "Core Knowledge"}
          </Badge>
          {question.prerequisite && (
            <Badge variant="warning" icon={BookOpen}>
              Prerequisite: {question.prerequisite}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Level:</span>
          <span className={`px-2.5 py-0.5 rounded-full font-semibold border ${difficultyMeta.bg} ${difficultyMeta.color} border-current/20`}>
            {difficultyMeta.label}
          </span>
        </div>
      </CardHeader>

      {/* Question Prompt */}
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
            Question {questionNumber}
          </span>
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white tracking-tight leading-snug">
            {question.text}
          </h2>
        </div>

        {/* Options List */}
        <div className="space-y-3 pt-2">
          {question.options?.map((optionText, idx) => (
            <AnswerOption
              key={idx}
              index={idx}
              text={optionText}
              isSelected={selectedAnswer === idx}
              onSelect={onSelectAnswer}
              disabled={isSubmitting}
            />
          ))}
        </div>

        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-300 text-sm">
            {error}
          </div>
        )}
      </CardContent>

      {/* Footer with Submit Button */}
      <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/40">
        <span className="text-xs text-slate-400 hidden sm:inline-block">
          Select an option and submit to advance the adaptive model.
        </span>
        <Button
          variant="primary"
          size="lg"
          className="w-full sm:w-auto min-w-[180px]"
          disabled={selectedAnswer === null || isSubmitting}
          loading={isSubmitting}
          onClick={onSubmitAnswer}
        >
          <span>Submit Answer</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default QuestionCard;
