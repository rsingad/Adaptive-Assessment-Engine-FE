# Adaptive Assessment Engine - Backend Architecture & Feature Specification

## 📌 Project Overview
The **Adaptive Assessment Engine** is a lightweight, high-impact backend service built with **Node.js, Express, and MongoDB**. It evaluates a student's real-time skill level using an adaptive difficulty algorithm and prerequisite gap detection.

Instead of traditional linear testing, the engine dynamically adjusts question difficulty up or down based on student performance and diagnoses foundational gaps when a student struggles with complex topics.

---

## 🎯 Core Features & Scope

### ✅ What IS Included (In Scope)

1. **User Authentication (Login / Register)**:
   - Registration endpoint (`POST /api/auth/register`) and Login endpoint (`POST /api/auth/login`).
   - MongoDB `User` model (`name`, `email`, `password`).

2. **User Analytics Dashboard API**:
   - Endpoint (`GET /api/user/:userId/dashboard`) retrieving total assessments completed, overall average ability, recent assessment sessions, and overall weak vs. strong topic breakdown.

3. **Fallback Dynamic Question Generator (Groq Cloud AI)**:
   - Integrated dynamic fallback service (`aiGenerator.js`) powered by **Groq Cloud SDK (`groq-sdk`)** using ultra-fast `llama3-8b-8192` model.
   - Automatically generates targeted multiple-choice questions on-the-fly when pre-seeded database questions are exhausted.

4. **Deterministic Adaptive Ability Algorithm**:
   - Baseline starting student ability: `0.50` (on a scale of `0.10` to `1.00`).
   - Correct answer: Increases ability by `+0.12`.
   - Incorrect answer: Decreases ability by `-0.12`.
   - Dynamic bounds enforce ability values within `[0.10, 1.00]`.

2. **Prerequisite Foundation Gap Detection**:
   - Every question carries a `topic` and an optional `prerequisite` topic (e.g., `Graphs` requires `Queues`, `Recursion` requires `Stacks`).
   - If a student answers a high-level question incorrectly, the engine detects the prerequisite topic and immediately serves a fundamental question from that prerequisite area.

3. **Question Selection & Dynamic Generation Basis**:
   - **Pre-seeded Database**: Selected via absolute mathematical distance `|question.difficulty - student.ability|`.
   - **Fallback Dynamic AI Generator Basis**: When no suitable question is found in DB, an AI prompt consumes `{ subject, targetAbility, topic, prerequisiteTopic }` to generate a targeted multiple-choice question.

3. **Dynamic Explanation & Reason Generation**:
   - Each response contains a human-readable `reason` string explaining *why* the specific question was chosen (e.g., *"Incorrect answer on Graphs. Recalibrating foundation with Queues"*).

4. **Assessment Session Management**:
   - Tracks session status (`in_progress` vs `completed`).
   - Tracks a 10-question evaluation limit per assessment session.
   - Logs `questionHistory` with timestamps, ability trajectories (`abilityBefore` → `abilityAfter`), and answers.

5. **Results & Ability Trajectory Analysis**:
   - Generates accuracy statistics (`accuracyPercentage`, `correctCount`, `totalAnswered`).
   - Identifies weak topics for student diagnosis.
   - Provides full step-by-step trajectory data formatted for frontend UI charting (`AbilityChart.jsx`).

6. **DSA Seed Dataset**:
   - Built-in dataset of 18 questions spanning Data Structures & Algorithms (Arrays, Queues, Stacks, Searching, Sorting, Trees, Graphs).

---

### ❌ What is NOT Included (Out of Scope for Hackathon MVP)

To ensure maximum focus on core adaptive functionality during a hackathon, the following are intentionally omitted:
- ❌ User Login / JWT Authentication (uses simple `guest_user` IDs).
- ❌ Heavy Item Response Theory (IRT) 3PL Math (replaced with clean deterministic step logic).
- ❌ WebSockets / Real-time streams (standard REST API is used).
- ❌ Admin CMS Panel for creating questions manually.
- ❌ External LLM calls during live quiz execution (guarantees sub-50ms API latency).

---

## 🏗 System Architecture & Flow

```
+------------------+         REST API         +-------------------+
|                  | -----------------------> |                   |
|  React Frontend  |                          |  Express Backend  |
|  (Client App)    | <----------------------- |  (Port 5000)      |
+------------------+                          +---------+---------+
                                                        |
                                            +-----------+-----------+
                                            |                       |
                                            v                       v
                                  +-------------------+   +-------------------+
                                  |  Adaptive Engine  |   |  MongoDB Database |
                                  |  & Selector       |   |  (Questions &     |
                                  |  Services         |   |   Assessments)    |
                                  +-------------------+   +-------------------+
```

---

## 📡 API Endpoints Reference

### 1. Start Assessment
- **Endpoint**: `POST /api/assessment/start`
- **Payload**: `{ "userId": "guest_user" }`
- **Function**: Initializes a new session and returns the initial baseline question (Difficulty ~`0.50`).

### 2. Submit Answer
- **Endpoint**: `POST /api/assessment/answer`
- **Payload**:
```json
{
  "assessmentId": "<ASSESSMENT_ID>",
  "questionId": "<QUESTION_ID>",
  "selectedAnswer": 1
}
```
- **Function**: Evaluates answer correctness, updates ability score, checks for prerequisite gaps, and returns the next adaptive question along with explanation logic.

### 3. Get Final Results
- **Endpoint**: `GET /api/assessment/:id/results`
- **Function**: Retrieves final score, weak topic analysis, diagnosis statement, and ability trajectory history for visual chart rendering.

---

## 📁 Backend Directory Structure

```
server/
├── config/
│   └── db.js                 # MongoDB connection setup
├── controllers/
│   └── assessmentController.js# API handlers for start, answer, results
├── models/
│   ├── Question.js           # Schema for questions, options, topics, prerequisites
│   └── Assessment.js         # Schema for user session & question history
├── routes/
│   └── assessmentRoutes.js   # Route endpoints mapping
├── services/
│   ├── adaptiveEngine.js     # Ability updates & reason generation
│   └── questionSelector.js   # Adaptive question selection algorithm
├── utils/
│   └── seedQuestions.js      # Database seeder with 18 DSA questions
├── .env                      # Environment config (PORT, MONGODB_URI)
├── package.json              # Server dependencies
└── server.js                 # Express server entry point
```
