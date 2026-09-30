/**
 * AdaptiLearn Application Constants
 */

export const APP_NAME = "AdaptiLearn";
export const APP_TAGLINE = "Adaptive Assessment Engine";

export const TOTAL_ASSESSMENT_QUESTIONS = 10;
export const DEFAULT_INITIAL_ABILITY = 0.50;

export const COMPETENCY_LEVELS = [
  { min: 0.0, max: 0.35, label: "Beginner", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  { min: 0.35, max: 0.65, label: "Intermediate", color: "text-brand-400", bg: "bg-brand-500/10", border: "border-brand-500/30" },
  { min: 0.65, max: 0.85, label: "Proficient", color: "text-accent-400", bg: "bg-accent-500/10", border: "border-accent-500/30" },
  { min: 0.85, max: 1.0, label: "Advanced", color: "text-success-500", bg: "bg-success-500/10", border: "border-success-500/30" },
];

export const DIFFICULTY_LEVELS = {
  EASY: { label: "Foundational", range: [0.0, 0.4], color: "text-emerald-400", bg: "bg-emerald-500/15" },
  MEDIUM: { label: "Intermediate", range: [0.4, 0.7], color: "text-indigo-400", bg: "bg-indigo-500/15" },
  HARD: { label: "Advanced", range: [0.7, 1.0], color: "text-purple-400", bg: "bg-purple-500/15" },
};

export const API_ENDPOINTS = {
  START: '/api/assessment/start',
  ANSWER: '/api/assessment/answer',
};

export const STORAGE_KEYS = {
  ASSESSMENT_SESSION: 'adaptilearn_session_v1',
  AUTH_USER: 'adaptilearn_auth_user_v1',
};

export const SUBJECTS = [
  {
    id: 'mathematics',
    label: 'Mathematics',
    description: 'Test your mathematical concepts and identify learning gaps in algebra, calculus, and discrete math.',
    icon: 'Calculator',
    gradient: 'from-violet-600 to-indigo-600',
    glow: 'shadow-violet-500/20',
    border: 'border-violet-500/30',
    accent: 'text-violet-300',
    bg: 'bg-violet-500/10',
  },
  {
    id: 'physics',
    label: 'Physics',
    description: 'Evaluate your understanding of mechanics, electromagnetism, thermodynamics, and modern physics.',
    icon: 'Atom',
    gradient: 'from-sky-600 to-cyan-600',
    glow: 'shadow-sky-500/20',
    border: 'border-sky-500/30',
    accent: 'text-sky-300',
    bg: 'bg-sky-500/10',
  },
  {
    id: 'chemistry',
    label: 'Chemistry',
    description: 'Assess your understanding of organic chemistry, stoichiometry, bonding, and periodic trends.',
    icon: 'FlaskConical',
    gradient: 'from-emerald-600 to-teal-600',
    glow: 'shadow-emerald-500/20',
    border: 'border-emerald-500/30',
    accent: 'text-emerald-300',
    bg: 'bg-emerald-500/10',
  },
  {
    id: 'computer_science',
    label: 'Computer Science',
    description: 'Evaluate your programming fundamentals, data structures, algorithms, and CS theory.',
    icon: 'Code2',
    gradient: 'from-brand-600 to-accent-600',
    glow: 'shadow-brand-500/20',
    border: 'border-brand-500/30',
    accent: 'text-brand-300',
    bg: 'bg-brand-500/10',
  },
];
