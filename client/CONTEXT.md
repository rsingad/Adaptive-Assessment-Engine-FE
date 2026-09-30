# AdaptiLearn — Frontend Redesign Context

> **Scope:** Frontend-only (`client/` directory).
> **Rule:** Backend (`server/`) was **never touched** — all API contracts, scoring algorithms, MongoDB models, and ability-estimation logic remain 100% intact.

---

## Project Overview

**AdaptiLearn** is an adaptive assessment engine built with:

- **Frontend:** React + Vite, Vanilla CSS (custom design tokens in `index.css`)
- **Backend:** Node/Express + MongoDB (untouched)
- **State management:** `AssessmentContext` (`src/context/AssessmentContext.jsx`) + `useAssessment` hook
- **API layer:** `src/services/assessmentService.js`, `authService.js`, `apiClient.js`
- **Key utility:** `src/utils/helpers.js` — maps numeric ability scores to human-readable labels
- **Constants:** `src/utils/constants.js` — `COMPETENCY_LEVELS`, `DIFFICULTY_LEVELS`, `SUBJECTS`, API endpoints

---

## Design System (Tokens — `src/index.css`)

| Token group | Purpose |
|---|---|
| `--brand-{300…950}` (Indigo) | Primary accent — buttons, highlights |
| `--accent-{300…900}` (Teal/Cyan) | Secondary accent — charts, icons |
| `--slate-{50…950}` | Neutral — backgrounds, text |
| `--success-{500}` (Emerald) | Success / Advanced tier indicator |
| **Font** | `Inter` via Google Fonts |
| **Animation** | `@keyframes rulerSweep` — used in `PreparingAssessment` calibration ruler |

### Competency Colour Tiers

Defined in `constants.js` → `COMPETENCY_LEVELS[]` and resolved via `getCompetencyMeta(ability)`.

| Tier | Ability range | Colour |
|---|---|---|
| Beginner | 0.00 – 0.35 | Amber |
| Intermediate | 0.35 – 0.65 | Brand (Indigo) |
| Proficient | 0.65 – 0.85 | Accent (Teal) |
| Advanced | 0.85 – 1.00 | Success (Emerald) |

---

## Philosophy: Human-Friendly Ability Presentation

**Core rule:** Students must **never** see raw ability decimals (`0.52`), theta values, IRT terminology, or `0.0–1.0` scales in the UI.

All student-facing ability numbers are converted via helpers in `src/utils/helpers.js`:

| Helper | Input | Student sees |
|---|---|---|
| `formatAbilityForStudent(v)` | `0.52` | `"Developing"` |
| `getAbilityTrendLabel(delta)` | `+0.12` | `"Improving"` |
| `getMasteryPercent(v)` | `0.52` | `52` (integer %) |
| `getCompetencyMeta(v)` | `0.52` | competency object `{ label, color, bg, border }` |

`formatAbility()` still exists for **internal/debug use only** and must not be rendered in the student-facing UI.

---

## Completed Changes — File by File

### `src/utils/helpers.js`

- Added `formatAbilityForStudent(value)` — maps `0–1` → tier name string (`"Foundational"` / `"Developing"` / `"Proficient"` / `"Advanced"`)
- Added `getAbilityTrendLabel(delta)` — maps numeric delta → `"Improving"` / `"Adjusting"` / `"Stable"`
- Added `getMasteryPercent(ability)` — maps `0–1` → `0–100` integer for progress bars
- Added JSDoc comment to `formatAbility()` marking it internal-only

---

### `src/index.css`

- Added `@keyframes rulerSweep` (teal sweep animation for `PreparingAssessment`)
- All CSS custom properties (brand, accent, slate, success) defined globally here

---

### `src/pages/Home.jsx` ✅ Major redesign

- Two-section hero: left copy panel + right feature card panel
- Dark glassmorphism aesthetic (`bg-slate-950` + gradient orbs)
- Feature grid with icon cards (adaptive intelligence, instant insight, multi-subject)
- Removed placeholder/fake testimonials and fabricated user-count stats
- CTA buttons: **Start Assessment** → `/select-subject`, **Sign In** → `/login`

---

### `src/pages/Login.jsx` ✅ Redesigned

- Two-column layout: left branding panel + right form panel
- Back button removed (per explicit product decision)
- Form: email + password + remember me checkbox + link to `/register`
- Glassmorphism card on dark slate background

---

### `src/pages/Register.jsx` ✅ Redesigned

- Mirrors Login layout (two-column branding + form)
- Back button removed (per explicit product decision)
- Form: name + email + password + link to `/login`

---

### `src/pages/SelectSubject.jsx` ✅ Redesigned + bug fixed

- **Bug fixed:** Missing `Link` import from `react-router-dom` (was causing `ReferenceError` crash on load)
- Subject cards grid: Mathematics, Physics, Chemistry, Computer Science
- Each card: gradient icon badge, description, **Start Assessment** CTA
- Hover lift + glow effect per subject colour
- Subject data sourced from `SUBJECTS` constant — no hardcoded content

---

### `src/pages/Assessment.jsx` ✅ Layout refinement

- Integrated `PreparingAssessment` phase between subject selection and first question
- Question-first layout: `QuestionCard` at full width, live metrics in supporting sidebar
- `AbilityGauge` + `AbilityChart` used as live progress companions during assessment

---

### `src/components/assessment/PreparingAssessment.jsx` ✅ Created (new file)

- Shown between subject selection and first question delivery
- Animated calibration ruler with teal `rulerSweep` sweep animation
- Three preparation steps with staggered fade-in
- Auto-advances after animation completes

---

### `src/components/assessment/QuestionCard.jsx` ✅ Cleaned up

- Difficulty label now uses `getDifficultyMeta()` → `"Foundational"` / `"Intermediate"` / `"Advanced"` (not raw decimal)
- Clean answer option grid via `AnswerOption` component

---

### `src/components/assessment/AbilityGauge.jsx` ✅ Human-friendly redesign

| | Before | After |
|---|---|---|
| Header | `"Estimated Real-Time Theta"` | `"Live Mastery Estimate"` |
| Main score | `0.63 / 1.00` | `"Proficient"` (tier label) |
| Delta | `+0.12` (raw number) | `"Improving"` (trend pill with icon) |
| Ruler labels | `0.00 · 0.50 · 1.00` | `Foundational · Developing · Proficient · Advanced` |
| Progress bar | — | Mastery % bar with `52%` label |

---

### `src/components/assessment/AbilityChart.jsx` ✅ Human-friendly redesign

| | Before | After |
|---|---|---|
| Y-axis ticks | `0 / 0.25 / 0.5 / 0.75 / 1.0` | `Foundational / Developing / Proficient / Advanced` |
| Tooltip | `Ability: 0.52` | `Understanding: Developing` |
| Reference line | `Median` | `Mid-point` |
| Card title | `"How Your Understanding Calibrated"` | `"How Your Understanding Developed"` |

---

### `src/components/results/CompetencyScore.jsx` ✅ Human-friendly redesign

- Heading: `"{Level} Understanding"` (e.g. `"Proficient Understanding"`)
- Mastery Tier pill: `"Proficient Mastery Tier"` with Zap icon + tier colour
- Progress bar: `0–100%` range, tier labels below (`Foundational · Developing · Proficient · Advanced`)
- Metric grid: **Mastery Score %** · **Accuracy %** · **Correct / Total**
- No raw ability decimals surfaced anywhere

---

### `src/components/results/AdaptiveTimeline.jsx` ✅ Human-friendly redesign

| | Before | After |
|---|---|---|
| Step value | `"0.52"` (raw decimal) + `"Ability"` text | Coloured mastery tier pill (`"Developing"`, `"Proficient"`, …) |
| Card subtitle | `"Step-by-Step Calibration Sequence"` | `"Your Step-by-Step Learning Path"` |

---

### `src/components/results/QuestionReview.jsx` ✅ Redesigned

- Clean list layout per question answered
- Shows correct/incorrect status, topic, selected answer vs correct answer
- No technical scoring numbers surfaced

---

### `src/components/results/LearningGaps.jsx` — Reviewed, no changes needed

### `src/components/results/TopicPerformance.jsx` — Reviewed, no changes needed

---

## What Was NOT Changed (Backend — Strictly Off-Limits)

```
server/
├── controllers/    ← scoring, ability estimation (IRT/CAT), question selection
├── models/         ← MongoDB schemas
├── routes/         ← API endpoints
├── middleware/     ← auth, validation
└── config/         ← DB connection, env config
```

The following remain **completely unmodified**:

- Ability estimation algorithm (theta / IRT)
- Adaptive question-selection logic (CAT branching)
- Scoring calculations
- API response structure and contracts
- MongoDB data models
- Authentication backend

---

## Build Status

```
npm run build  →  ✓ 2560 modules transformed. Exit code 0. No errors.
```

> ⚠️ A chunk-size warning (`> 500 kB`) exists for the vendor/Recharts bundle. This is pre-existing and non-blocking for production.

---

## Known TODOs / Next Steps

- [ ] Code-split Recharts import to reduce bundle size (performance improvement)
- [ ] Add loading skeleton states for Results page while data fetches
- [ ] Add `ErrorBoundary` component (React production best practice)
- [ ] Responsive testing at `1366×768` laptop viewport (confirmed target)
- [ ] Accessibility audit: ARIA labels on chart elements, focus ring visibility on all interactive elements
