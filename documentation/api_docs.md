# 🔌 API Documentation for Frontend Integration

**Base URL**: `http://localhost:5000/api/assessment`

This document details all API endpoints, required request payloads, and response formats needed for frontend integration.

---

## 📍 Table of Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Backend server health & status check |
| `POST` | `/api/auth/register` | Register a new user account |
| `POST` | `/api/auth/login` | Login user and return user object |
| `GET` | `/api/user/:userId/dashboard` | Fetch overall user progress stats, average ability & weak/strong topics |
| `POST` | `/api/assessment/start` | Start a new assessment session |
| `POST` | `/api/assessment/answer` | Submit an answer for the current question |
| `GET` | `/api/assessment/:id/results` | Fetch final assessment summary & chart trajectory |

---

## 🏥 Health Check API

### Get Server Health Status
- **Endpoint**: `GET /health`

#### 📤 Response Payload:
```json
{
  "status": "ok",
  "message": "Adaptive Assessment Engine Backend API is running"
}
```

---

## 📊 User Dashboard API

### Get User Dashboard Statistics
- **Endpoint**: `GET /api/user/:userId/dashboard`
- **Params**: `:userId` (e.g. `guest_user` or registered User `_id`)

#### 📤 Response Payload:
```json
{
  "userId": "guest_user",
  "totalAssessmentsCompleted": 3,
  "averageAbility": 0.68,
  "recentAssessments": [
    {
      "assessmentId": "651f8a7e2b109c1234567890",
      "subject": "DSA",
      "finalAbility": 0.74,
      "status": "completed",
      "totalQuestions": 10,
      "startedAt": "2026-09-30T11:20:00.000Z",
      "completedAt": "2026-09-30T11:25:00.000Z"
    }
  ],
  "weakTopicsOverall": [
    { "topic": "Graphs", "accuracy": 33.3 }
  ],
  "strongTopicsOverall": [
    { "topic": "Searching", "accuracy": 100.0 },
    { "topic": "Arrays", "accuracy": 80.0 }
  ]
}
```

---

## 🔐 Auth Endpoints

### 1. Register User
- **Endpoint**: `POST /api/auth/register`
- **Headers**: `Content-Type: application/json`

#### 📥 Request Payload:
```json
{
  "name": "Rahul Kumar",
  "email": "rahul@example.com",
  "password": "password123"
}
```

#### 📤 Response Payload:
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "651f9a7e2b109c1234567899",
    "name": "Rahul Kumar",
    "email": "rahul@example.com"
  }
}
```

---

### 2. Login User
- **Endpoint**: `POST /api/auth/login`
- **Headers**: `Content-Type: application/json`

#### 📥 Request Payload:
```json
{
  "email": "rahul@example.com",
  "password": "password123"
}
```

#### 📤 Response Payload:
```json
{
  "message": "Login successful",
  "user": {
    "id": "651f9a7e2b109c1234567899",
    "name": "Rahul Kumar",
    "email": "rahul@example.com"
  }
}
```

---


## 1. Start Assessment

Initializes a new assessment session and returns the initial baseline question (Difficulty ~`0.50`).

- **Endpoint**: `POST /api/assessment/start`
- **Headers**: `Content-Type: application/json`

### 📥 Request Payload (What Frontend Sends):
```json
{
  "userId": "guest_user",
  "subject": "DSA"
}
```
*(Note: `userId` defaults to `"guest_user"`, `subject` defaults to `"DSA"` if omitted)*

### 📤 Response Payload (What Backend Returns):
```json
{
  "assessmentId": "651f8a7e2b109c1234567890",
  "ability": 0.5,
  "questionCount": 1,
  "totalQuestions": 10,
  "question": {
    "id": "651f8b1e2b109c1234567891",
    "text": "What is the worst-case time complexity of Binary Search on a sorted array of size n?",
    "options": [
      "O(n)",
      "O(log n)",
      "O(n²)",
      "O(1)"
    ],
    "difficulty": 0.5,
    "topic": "Searching",
    "prerequisite": "Arrays"
  },
  "reason": "Starting assessment with medium difficulty baseline (0.50)."
}
```

---

## 2. Submit Answer

Submits the student's selected option index for the current question. The backend evaluates correctness, updates the student ability score, checks for prerequisite gaps, and selects the next appropriate question.

- **Endpoint**: `POST /api/assessment/answer`
- **Headers**: `Content-Type: application/json`

### 📥 Request Payload (What Frontend Sends):
```json
{
  "assessmentId": "651f8a7e2b109c1234567890",
  "questionId": "651f8b1e2b109c1234567891",
  "selectedAnswer": 1
}
```
*(Note: `selectedAnswer` is the 0-based array index of the chosen option from the `options` array, e.g. `0` for first option, `1` for second option)*

### 📤 Response Payload (What Backend Returns):

#### Standard Response (When quiz is still in progress):
```json
{
  "assessmentId": "651f8a7e2b109c1234567890",
  "correct": true,
  "explanation": "Binary search repeatedly halves the search interval, yielding logarithmic complexity O(log n).",
  "abilityBefore": 0.5,
  "abilityAfter": 0.62,
  "completed": false,
  "questionCount": 1,
  "totalQuestions": 10,
  "reason": "Correct answer! Increasing student ability score from 0.50 → 0.62. Selecting next question with matching higher difficulty.",
  "nextQuestion": {
    "id": "651f8c2e2b109c1234567892",
    "text": "What is the average time complexity of Merge Sort?",
    "options": [
      "O(n log n)",
      "O(n²)",
      "O(n)",
      "O(2^n)"
    ],
    "difficulty": 0.65,
    "topic": "Sorting",
    "prerequisite": "Searching"
  }
}
```

#### Final Response (When 10 questions complete):
```json
{
  "assessmentId": "651f8a7e2b109c1234567890",
  "correct": false,
  "explanation": "BFS explores all immediate neighbors level-by-level using a FIFO Queue.",
  "abilityBefore": 0.62,
  "abilityAfter": 0.5,
  "completed": true,
  "questionCount": 10,
  "totalQuestions": 10,
  "reason": "Incorrect answer. Decreasing student ability score from 0.62 → 0.50. Selecting lower difficulty question to recalibrate.",
  "nextQuestion": null
}
```

---

## 3. Get Final Results

Retrieves final diagnosis, weak topics, accuracy percentage, and full step-by-step ability trajectory for rendering the history graph.

- **Endpoint**: `GET /api/assessment/:id/results`
- **Params**: `:id` = `assessmentId` (from step 1 or 2)

### 📥 Request (URL Params):
`GET /api/assessment/651f8a7e2b109c1234567890/results`

### 📤 Response Payload (What Backend Returns):
```json
{
  "assessmentId": "651f8a7e2b109c1234567890",
  "finalAbility": 0.74,
  "status": "completed",
  "totalAnswered": 10,
  "correctCount": 7,
  "accuracyPercentage": 70.0,
  "weakTopics": [
    "Graphs"
  ],
  "diagnosis": "Intermediate competency. Solid understanding of foundational topics with minor gaps in advanced structures.",
  "trajectory": [
    {
      "step": 0,
      "ability": 0.5,
      "label": "Initial Baseline"
    },
    {
      "step": 1,
      "ability": 0.62,
      "correct": true,
      "topic": "Searching",
      "difficulty": 0.5,
      "reason": "Correct answer! Increasing student ability score from 0.50 → 0.62."
    },
    {
      "step": 2,
      "ability": 0.5,
      "correct": false,
      "topic": "Graphs",
      "difficulty": 0.7,
      "reason": "Incorrect answer detected on topic 'Graphs'. Checking prerequisite foundation in 'Queues'."
    }
  ],
  "questionHistory": [
    {
      "questionId": "651f8b1e2b109c1234567891",
      "questionText": "What is the worst-case time complexity of Binary Search on a sorted array of size n?",
      "topic": "Searching",
      "prerequisite": "Arrays",
      "difficulty": 0.5,
      "selectedAnswer": 1,
      "correctAnswer": 1,
      "correct": true,
      "abilityBefore": 0.5,
      "abilityAfter": 0.62,
      "reason": "Correct answer! Increasing student ability score from 0.50 → 0.62."
    }
  ]
}
```
