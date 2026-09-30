# AdaptiLearn — Adaptive Assessment Engine (Frontend)

An intelligent, real-time adaptive assessment web platform built with React, Vite, Tailwind CSS, Recharts, and Lucide React for a 10-hour MERN-stack hackathon.

Unlike traditional static exams where every student faces an identical question sequence, **AdaptiLearn** adapts in real time to the student's latent ability:
- Dynamically scales difficulty up or down based on correctness.
- Detects prerequisite concept deficiencies (e.g. diagnosing recursion fundamentals before testing advanced binary trees).
- Provides complete explainability with the **"Why this question?"** feature.
- Renders real-time ability trajectories using interactive Recharts visualization.
- Produces a comprehensive post-assessment diagnostic evaluation report.

---

## Quick Start

### 1. Installation
Install dependencies in the frontend client:
```bash
cd client
npm install
```
*(Or from the repository root: `npm install`)*

### 2. Run Development Server
```bash
# From repository root
npm run dev

# Or from client/
cd client
npm run dev
```
The application will launch at [http://localhost:5173/](http://localhost:5173/).

### 3. Production Build
```bash
npm run build
```

---

## Backend Integration Guide

The frontend is completely decoupled from the backend and ships with a high-fidelity local mock engine.

To connect to your teammate's Node.js/Express backend:
1. Open `client/.env`.
2. Configure your backend URL and disable mock mode:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   VITE_USE_MOCK=false
   ```
3. Restart the dev server (`npm run dev`).

Zero changes to React components or hooks are required.

### Expected Backend API Endpoints:
- `POST /api/assessment/start`: Initializes session and returns first calibrated question.
- `POST /api/assessment/answer`: Submits answer `{ assessmentId, questionId, answer }` and receives updated ability score, next question, and explainability reasoning.
- `GET /api/assessment/results/:id`: Retrieves final diagnostic breakdown.

---

## Architecture & Project Context

For in-depth architecture details, state management patterns, and phase discipline, read:
- [docs/PROJECT_CONTEXT.md](file:///c:/Users/golu/Desktop/Adaptive-Assessment-Engine-FE/docs/PROJECT_CONTEXT.md)
