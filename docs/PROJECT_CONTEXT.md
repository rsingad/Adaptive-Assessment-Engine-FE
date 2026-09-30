# AdaptiLearn Frontend — Project Context

## Project Overview

**AdaptiLearn** is an intelligent, real-time Adaptive Assessment Engine designed to replace rigid, one-size-fits-all tests with an Item Response Theory (IRT)-inspired dynamic assessment experience.

Unlike static exams where every student gets the same fixed question sequence, AdaptiLearn:
1. Evaluates student performance on each question in real time.
2. Modulates difficulty (ability theta calibration: 0.00 to 1.00).
3. Detects prerequisite concept deficiencies (e.g., flagging recursion fundamentals when a student struggles with binary trees).
4. Explains each question selection transparently via a dedicated "Why this question?" explainability feature.
5. Generates a comprehensive post-assessment diagnostic report highlighting domain competencies, prerequisite learning gaps, and the adaptive evolution trajectory.

---

## Current Phase

**Phase 2: Login + Subject Selection (COMPLETED)**

Phase 1 (Project Foundation) also COMPLETED.

---

## Completed Work

1. **Project Scaffolding**: Initialized React 19 + Vite 8 frontend inside `client/` with root proxy `package.json` for seamless execution from both repository root and client folder.
2. **Design System & Tailwind CSS**: Configured Tailwind CSS 3.4 with custom brand tokens (indigo/brand, cyan/accent, emerald/success, amber/warning, rose/danger), Inter typography, glassmorphism utilities (`glass-panel`, `glass-card`), and keyframe micro-animations (`fade-in`, `slide-up`).
3. **Core Dependencies Installed**:
   - `react-router-dom`: Client-side routing across `/`, `/assessment`, `/results`
   - `recharts`: Real-time ability journey line visualization
   - `lucide-react`: Modern icon system
   - `axios`: Dedicated API client layer
   - `tailwindcss`, `postcss`, `autoprefixer`: Styling pipeline
4. **State Management**: Created `AssessmentContext.jsx` and `useAssessment.js` custom hook managing ability score, previous ability, delta, questions, explainable reason strings, history journey array, and completion states.
5. **API & Mock Decoupling Layer**:
   - Built `apiClient.js` (Axios configuration with base URL and response interceptors).
   - Built `assessmentService.js` (clean adapter supporting mock fallback and toggleable live backend connectivity via `VITE_USE_MOCK=false`).
   - Zero hardcoded mock data inside visual components.
6. **Component Foundations**:
   - Reusable UI: `Button.jsx`, `Card.jsx`, `Badge.jsx`, `ProgressBar.jsx`, `LoadingSpinner.jsx`.
   - Assessment UI: `AssessmentHeader.jsx`, `QuestionCard.jsx`, `AnswerOption.jsx`, `AbilityGauge.jsx`, `AbilityChart.jsx`, `WhyQuestion.jsx`.
   - Results UI: `CompetencyScore.jsx`, `TopicPerformance.jsx`, `LearningGaps.jsx`, `AdaptiveTimeline.jsx`.
7. **Pages**:
   - `Home.jsx`: Landing page, problem statement comparison, and CTA.
   - `Assessment.jsx`: Core responsive 2-column workspace integrating live questions, explainability, ability gauge, and Recharts graph.
   - `Results.jsx`: Diagnostic evaluation report with timeline, topic breakdown, and learning gaps.
8. **Documentation & Env**: Created `.env.example`, `.env`, updated `README.md`, and validated build (`npm run build` completed with zero errors).

### Phase 2 — Login + Subject Selection

1. **AuthContext** (`src/context/AuthContext.jsx`): Global auth + subject state with mock login/register/logout. Persists user to localStorage. Designed so mock functions can be replaced with real API calls without changing any consuming component.
2. **AuthProvider** wraps all routes in `App.jsx` above `AssessmentProvider`.
3. **Login page** (`src/pages/Login.jsx`): Email + password form, show/hide password toggle, field validation, API error display, redirects to `/select-subject` (or original destination if redirected from a protected route).
4. **Register page** (`src/pages/Register.jsx`): Full name + email + password + confirm fields, live password strength meter, confirm-match indicator, redirects to `/login` after success.
5. **SelectSubject page** (`src/pages/SelectSubject.jsx`): Four responsive subject cards (Mathematics, Physics, Chemistry, Computer Science). Single-select with active highlight. Continue button disabled until selection made. Logout action in header.
6. **Assessment page** (replaced with Phase 2 placeholder): Shows selected subject, explains what Phase 3 will build, provides a back button.
7. **ProtectedRoute** (`src/components/ui/ProtectedRoute.jsx`): Wraps `/select-subject`, `/assessment`, `/results` — redirects unauthenticated users to `/login` with state preserved.
8. **subjectIcons.js** (`src/utils/subjectIcons.js`): Shared icon string → Lucide component map used by SelectSubject and Assessment.
9. **constants.js updated**: Added `SUBJECTS` array and `AUTH_USER` storage key.
10. **Home.jsx updated**: CTA navigates to `/login` instead of `/assessment`; Sign In link added to header.
11. **App.jsx updated**: All six routes wired with `AuthProvider`, correct protected-route wrapping.

---

## Current Folder Structure

```text
c:\Users\golu\Desktop\Adaptive-Assessment-Engine-FE\
├── .git/
├── docs/
│   └── PROJECT_CONTEXT.md
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   └── logo.svg
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── ProgressBar.jsx
│   │   │   │   ├── LoadingSpinner.jsx
│   │   │   │   └── ProtectedRoute.jsx        ← Phase 2
│   │   │   ├── assessment/
│   │   │   │   ├── AssessmentHeader.jsx
│   │   │   │   ├── QuestionCard.jsx
│   │   │   │   ├── AnswerOption.jsx
│   │   │   │   ├── AbilityGauge.jsx
│   │   │   │   ├── AbilityChart.jsx
│   │   │   │   └── WhyQuestion.jsx
│   │   │   └── results/
│   │   │       ├── CompetencyScore.jsx
│   │   │       ├── TopicPerformance.jsx
│   │   │       ├── LearningGaps.jsx
│   │   │       └── AdaptiveTimeline.jsx
│   │   ├── context/
│   │   │   ├── AssessmentContext.jsx
│   │   │   └── AuthContext.jsx               ← Phase 2
│   │   ├── pages/
│   │   │   ├── Home.jsx                      (updated: CTA → /login)
│   │   │   ├── Login.jsx                     ← Phase 2
│   │   │   ├── Register.jsx                  ← Phase 2
│   │   │   ├── SelectSubject.jsx             ← Phase 2
│   │   │   ├── Assessment.jsx                (updated: Phase 2 placeholder)
│   │   │   └── Results.jsx
│   │   ├── services/
│   │   │   ├── apiClient.js
│   │   │   └── assessmentService.js
│   │   ├── hooks/
│   │   │   └── useAssessment.js
│   │   ├── utils/
│   │   │   ├── constants.js                  (updated: SUBJECTS + AUTH_USER key)
│   │   │   ├── helpers.js
│   │   │   ├── mockData.js
│   │   │   └── subjectIcons.js               ← Phase 2
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── package.json
└── README.md
```

---

## Installed Dependencies

From `client/package.json`:
- `react`: `^19.2.8`
- `react-dom`: `^19.2.8`
- `react-router-dom`: `^7.18.4`
- `recharts`: `^3.10.1`
- `lucide-react`: `^1.49.0`
- `axios`: `^1.20.0`
- `tailwindcss`: `^3.4.19`
- `postcss`: `^8.5.28`
- `autoprefixer`: `^10.6.1`
- `vite`: `^8.3.0`
- `@vitejs/plugin-react`: `^6.1.1`

---

## Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Home.jsx` | Landing hero, adaptive vs static comparison, CTA |
| `/assessment` | `Assessment.jsx` | Active adaptive assessment test bench |
| `/results` | `Results.jsx` | Diagnostic post-assessment report |
| `*` | Redirect to `/` | Fallback catch-all |

---

## Components Created

### Reusable UI (`src/components/ui/`)
- `Button.jsx`: Accessible button with variants (`primary`, `secondary`, `outline`, `ghost`, `accent`), loading spinner, and keyboard states.
- `Card.jsx`: Glassmorphic container with optional hover elevations (`CardHeader`, `CardContent`, `CardFooter`).
- `Badge.jsx`: Semantic pill component for topics, difficulty, and statuses.
- `ProgressBar.jsx`: Smooth CSS gradient progress bar with custom heights and color mappings.
- `LoadingSpinner.jsx`: Glowing dual-ring loader with pulsating status messages.

### Assessment-Specific (`src/components/assessment/`)
- `AssessmentHeader.jsx`: Sticky glass header displaying product logo, question counter (`Q4 / 10`), progress meter, and reset action.
- `QuestionCard.jsx`: Main stem card with topic pill, difficulty rating, multiple choice options, and submit action.
- `AnswerOption.jsx`: Interactive selectable option with key badges (A, B, C, D), radio circle, and active gradient glow.
- `AbilityGauge.jsx`: Displays calculated ability (e.g. 0.68 / 1.00), competency standing ("Intermediate"), delta badge (+0.12), and calibrated visual meter.
- `AbilityChart.jsx`: Responsive Recharts line chart illustrating real-time ability fluctuations across question indices with custom dark tooltips.
- `WhyQuestion.jsx`: Explainability USP card explaining why difficulty changed or why a prerequisite check was triggered.

### Results-Specific (`src/components/results/`)
- `CompetencyScore.jsx`: Hero competency card with large theta score, proficiency badge, and calibration accuracy metrics.
- `TopicPerformance.jsx`: Per-topic mastery breakdown bars (Arrays, Trees, Recursion, Graphs).
- `LearningGaps.jsx`: Identified prerequisite concept gaps with prescriptive action recommendations.
- `AdaptiveTimeline.jsx`: Step-by-step horizontal timeline displaying question order, success/failure, and ability progression.

---

## State Management

Managed via React Context in `AssessmentContext.jsx` and consumed via `useAssessment.js`:
- `assessmentId`: Current active session ID
- `currentQuestion`: Active question object (`id`, `text`, `options`, `difficulty`, `topic`, `prerequisite`)
- `ability`: Current estimated student ability (0.00 – 1.00)
- `previousAbility`: Ability prior to most recent submission (for delta computation)
- `questionIndex`: Current question counter
- `totalQuestions`: Target questions per assessment session (default: 10)
- `reason`: Real-time backend/mock rationale string for "Why this question?"
- `abilityHistory`: Array of `{ questionNumber, ability, difficulty, correct, topic }` for charts
- `selectedAnswer`: Zero-indexed integer of user selection
- `status`: `'idle' | 'loading' | 'in-progress' | 'submitting' | 'completed' | 'error'`
- `lastFeedback`: `{ correct, reason }`
- `results`: Comprehensive final diagnostic data object

---

## API Layer

The frontend is strictly decoupled from the backend. The backend teammate develops the Node.js/Express service independently.
- `apiClient.js`: Configured Axios client using `VITE_API_BASE_URL` (default: `http://localhost:5000`).
- `assessmentService.js`: High-level service with methods:
  - `startAssessment()`
  - `submitAnswer({ assessmentId, questionId, answer })`
  - `getResults(assessmentId)`
- Seamless Mock Toggle:
  - When `VITE_USE_MOCK=true` (default), realistic local simulations run with realistic network latency (300–400ms).
  - When `VITE_USE_MOCK=false`, calls immediately dispatch to real backend endpoints without modifying ANY React component or hook!

---

## Mock Data

Defined in `src/utils/mockData.js`:
- **Scenario 1 (Correct Answer)**: Ability increases `0.50 → 0.62`, difficulty increases, served harder question.
- **Scenario 2 (Incorrect Answer)**: Ability decreases `0.62 → 0.50`, reason explains prerequisite detection.
- **Scenario 3 (Prerequisite Detection)**: Serves fundamental concept question in `Recursion` before continuing `Binary Trees`.
- Includes complete question bank with realistic CS/Data Structures concepts and pre-configured final diagnostic results.

---

## Design System

- **Background Base**: `#090D16` (Deep slate night)
- **Brand Primary**: Indigo `#4F46E5` / `#6366F1`
- **Accent**: Cyan `#06B6D4`
- **Semantic Success**: Emerald `#10B981`
- **Semantic Warning**: Amber `#F59E0B`
- **Semantic Error**: Rose `#F43F5E`
- **Typography**: Google Font `Inter`, sans-serif, crisp letter-spacing
- **Glassmorphism**: Backdrop blur (12px–16px), subtle border `rgba(255, 255, 255, 0.08)`
- **Radius**: Modern `rounded-xl` (buttons/inputs) and `rounded-2xl` (cards/panels)

---

## Responsive Design

- **Desktop (>= 1024px)**: 2-column split layout. Left 7-column workspace for questions and "Why this question?" explainability; right 5-column dashboard for Ability Gauge and Recharts trajectory.
- **Tablet (768px – 1023px)**: Fluid layout with comfortable touch targets and adaptive chart resizing.
- **Mobile (< 768px)**: Unified single-column flow: Header with progress → Ability Gauge → Why Question Card → Question Card with options → Submit CTA → Ability History Chart. Zero horizontal scrolling.

---

## API Contract

Expected backend format (for partner's reference):

### 1. Start Assessment
- **POST** `/api/assessment/start`
- **Response**:
```json
{
  "assessmentId": "abc123",
  "question": {
    "id": "q1",
    "text": "What is the time complexity of binary search?",
    "options": ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    "difficulty": 0.5,
    "topic": "Searching",
    "prerequisite": null
  },
  "ability": 0.5,
  "reason": "Starting with a medium difficulty question."
}
```

### 2. Submit Answer
- **POST** `/api/assessment/answer`
- **Request**:
```json
{
  "assessmentId": "abc123",
  "questionId": "q1",
  "answer": 1
}
```
- **Response**:
```json
{
  "correct": true,
  "ability": 0.62,
  "question": {
    "id": "q2",
    "text": "...",
    "options": ["...", "...", "...", "..."],
    "difficulty": 0.62,
    "topic": "Searching",
    "prerequisite": null
  },
  "reason": "You answered correctly, so the difficulty increased from 0.50 to 0.62."
}
```

---

## Important Decisions

1. **Dual Execution Support**: Created root `package.json` with workspace and script proxying to `client/`. Running `npm run dev` or `npm run build` at root works automatically without needing manual directory changes.
2. **Adapter Architecture for API**: Put API logic into `assessmentService.js` instead of direct component fetch/axios calls. Allows switching from local mock engine to live MongoDB/Express backend via one `.env` flag (`VITE_USE_MOCK=false`).
3. **No Heavy Global State Libraries**: Kept state lean using native React Context + custom hooks instead of introducing Redux or Zustand, ensuring fast compilation and clean hackathon maintainability.

---

## Known Issues

- None. Vite production bundle builds cleanly (`✓ built in 15.53s`), and dev server runs without errors on `http://localhost:5173/`.

---

## Next Phase

**Phase 2: Core Assessment UI/UX Polish, Adaptive Transitions & Interactions**
- Build smooth micro-interactions when ability score animates between answers (`0.50 → 0.62`).
- Polish question transition animations so questions slide or fade gracefully instead of jarring instant replacement.
- Enhance option selection feedback and submit loading state.
- Expand visual polish of Recharts tooltip and responsive legend.

---

## Do Not Break

1. **API Service Abstraction**: All components and hooks MUST call `useAssessment` or `assessmentService.js`. Never invoke raw `axios.post` directly from visual components.
2. **Mock Toggle Compatibility**: Keep `VITE_USE_MOCK` support operational so UI development never blocks if the backend server is offline or being migrated.
3. **Responsive Grid**: Maintain the 7/5 column desktop ratio and mobile single-column stacking in `Assessment.jsx`.
4. **Theme Tokens**: Keep Tailwind brand colors (`brand`, `accent`, `success`, `warning`, `danger`) uniform across cards and badges.
