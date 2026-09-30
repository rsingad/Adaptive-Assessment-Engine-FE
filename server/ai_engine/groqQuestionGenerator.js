const Groq = require('groq-sdk');
const Question = require('../models/Question');

const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

/**
 * AI Question Generator via Groq API (fallback when pre-seeded database questions run out)
 * Uses ultra-fast Llama-3 / Mixtral models via Groq SDK.
 */
async function generateAIQuestion({ subject = 'DSA', topic, prerequisiteTopic, targetDifficulty }) {
  const selectedTopic = topic || prerequisiteTopic || 'Arrays';
  console.log(`[Groq AI Generator] Generating question for Subject: ${subject}, Topic: ${selectedTopic}, Difficulty: ${targetDifficulty}`);

  if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== 'your_groq_api_key_here') {
    try {
      const prompt = `You are an expert computer science evaluator. Generate a multiple-choice question for:
Subject: ${subject}
Topic: ${selectedTopic}
Difficulty Level: ${targetDifficulty} (on a scale of 0.1 Easy to 1.0 Expert)

Return strictly a raw valid JSON object with NO markdown formatting, NO backticks, and NO surrounding text. Use this exact schema:
{
  "question": "Question text here",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctAnswer": 0,
  "explanation": "Short explanation of correct answer"
}`;

      const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'qwen/qwen3.8-27b',
        temperature: 0.5,
        response_format: { type: 'json_object' }
      });

      const responseText = chatCompletion.choices[0]?.message?.content;
      const parsedData = JSON.parse(responseText);

      const newQuestion = await Question.create({
        subject,
        question: parsedData.question,
        options: parsedData.options,
        correctAnswer: Number(parsedData.correctAnswer),
        topic: selectedTopic,
        prerequisite: prerequisiteTopic || null,
        difficulty: targetDifficulty,
        explanation: parsedData.explanation || 'Dynamically generated via Groq Llama-3 AI.'
      });

      return newQuestion;
    } catch (error) {
      console.error('Error calling Groq API, falling back to local dynamic generator:', error.message);
    }
  }

  // Local static fallback generator if GROQ_API_KEY is missing/invalid
  const dynamicTopics = {
    'Arrays': { text: 'What is the time complexity of searching an element in a 2D sorted matrix of size M x N using Binary Search?', options: ['O(M + N)', 'O(log(M * N))', 'O(M * N)', 'O(1)'], ans: 1 },
    'Queues': { text: 'How can a Circular Queue overcome the limitation of a standard Linear Queue array implementation?', options: ['By increasing array capacity automatically', 'By reusing vacant spaces at the front when elements are dequeued', 'By converting to a Stack', 'By sorting elements'], ans: 1 },
    'Stacks': { text: 'Which data structure is required to evaluate a Postfix mathematical expression?', options: ['Queue', 'Stack', 'Tree', 'Graph'], ans: 1 },
    'Searching': { text: 'What is the worst-case time complexity of Jump Search on a sorted array of size N with step size sqrt(N)?', options: ['O(sqrt(N))', 'O(N)', 'O(log N)', 'O(1)'], ans: 0 },
    'Sorting': { text: 'Which sorting algorithm guarantees O(N log N) worst-case time complexity while maintaining O(1) auxiliary space?', options: ['Merge Sort', 'Quick Sort', 'Heap Sort', 'Bubble Sort'], ans: 2 },
    'Trees': { text: 'In a Red-Black Tree, what is the maximum ratio of the longest path from root to leaf to the shortest path?', options: ['1:1', '2:1', '3:1', 'N:1'], ans: 1 },
    'Graphs': { text: 'What algorithm is best suited for detecting negative weight cycles in a directed graph?', options: ['Dijkstra Algorithm', 'Bellman-Ford Algorithm', 'BFS Algorithm', 'Kruskal Algorithm'], ans: 1 }
  };

  const topicData = dynamicTopics[selectedTopic] || dynamicTopics['Arrays'];

  const fallbackQuestion = await Question.create({
    subject,
    question: `[Dynamic Fallback] ${topicData.text}`,
    options: topicData.options,
    correctAnswer: topicData.ans,
    topic: selectedTopic,
    prerequisite: prerequisiteTopic || null,
    difficulty: targetDifficulty,
    explanation: 'Generated dynamically based on student ability level.'
  });

  return fallbackQuestion;
}

module.exports = {
  generateAIQuestion
};
