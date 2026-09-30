# 🎤 Hackathon Demo Script & Presentation Guide

Use this script to present your **Adaptive Assessment Engine** backend to judges, team members, or evaluators within **2 to 3 minutes**.

---

## ⏱ Minute 1: The Problem & The Solution

> **"Hello everyone! Traditional assessment systems give every student the exact same set of questions regardless of their individual skill level. If a student struggles with an advanced question, traditional systems just mark it wrong without understanding *why*."**

> **"We built the Adaptive Assessment Engine — an intelligent backend system that dynamically evaluates student competency in real-time, diagnoses foundational gaps, and tailors the evaluation path."**

---

## ⏱ Minute 2: Key Highlights & Core Logic Demo

> **"Our core system runs on 3 primary components:"**

1. **Real-time Competency Estimation**:
   - *"We baseline every student at a `0.50` competency score. Correct answers increase ability score (`+0.12`), dynamically unlocking higher difficulty questions."*

2. **Prerequisite Gap Detection (Our Secret Weapon)**:
   - *"When a student gets a question wrong—for example, on `Graphs`—our engine analyzes whether the failure was due to a missing prerequisite, such as `Queues`. It immediately serves a prerequisite check to verify if their core foundation is broken."*

3. **Transparent Decision Rationale**:
   - *"Along with every question, our API provides an explicit `reason` string explaining why that specific question was selected. This powers the 'Why This Question?' UI component for complete transparency."*

---

## ⏱ Minute 3: Architecture & Live API Execution

> **"Architecturally, we keep latency under 50ms by pairing Node.js & Express with MongoDB, avoiding heavy external API blocking calls during evaluation."**

### Live Demo Step Walkthrough:
1. **Trigger `POST /api/assessment/start`**:
   - Show initial baseline question (Difficulty 0.50).
2. **Trigger `POST /api/assessment/answer` (Wrong Answer)**:
   - Show how ability drops, and the reason explicitly highlights: *"Prerequisite gap detected in Queues"*.
3. **Trigger `GET /api/assessment/:id/results`**:
   - Show the JSON response containing **Accuracy**, **Weak Topics**, **Diagnosis**, and **Trajectory Chart Data**.

---

## ❓ Frequently Asked Questions (FAQ) & Judge Answers

**Q1: How does this differ from traditional IRT (Item Response Theory)?**
> *"Standard 3PL IRT requires offline calibration with thousands of student parameters. For hackathon execution speed and deterministic reliability, we built a lightweight step-adaptive engine bounded between 0.10 and 1.00 with explicit dependency-graph prerequisite traversal."*

**Q2: What happens if a student runs out of pre-seeded questions?**
> *"Our question selector dynamically retrieves unused questions closest to target ability. In future iterations, when no pre-seeded question matches, an fallback AI generation module (Gemini/OpenAI) can dynamically generate a validated question on the fly."*
