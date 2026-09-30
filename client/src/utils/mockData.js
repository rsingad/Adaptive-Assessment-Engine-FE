/**
 * AdaptiLearn Mock Data Foundation
 * Realistic questions and adaptive state transitions supporting offline/prototype assessment
 */

export const INITIAL_ASSESSMENT_RESPONSE = {
  assessmentId: "mock-session-001",
  question: {
    id: "q1",
    text: "What is the time complexity of searching in a balanced Binary Search Tree (BST)?",
    options: [
      "O(n)",
      "O(log n)",
      "O(n²)",
      "O(1)"
    ],
    difficulty: 0.50,
    topic: "Binary Trees",
    prerequisite: "Recursion"
  },
  ability: 0.50,
  reason: "Starting with a medium difficulty question to calibrate baseline ability."
};

export const MOCK_QUESTIONS_POOL = [
  {
    id: "q1",
    text: "What is the time complexity of searching in a balanced Binary Search Tree (BST)?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctIndex: 1,
    difficulty: 0.50,
    topic: "Binary Trees",
    prerequisite: "Recursion"
  },
  {
    id: "q2_hard",
    text: "In an AVL tree with height h, what is the maximum permissible difference between the heights of the left and right subtrees of any node?",
    options: ["0", "1", "2", "log(h)"],
    correctIndex: 1,
    difficulty: 0.65,
    topic: "Binary Trees",
    prerequisite: "Recursion"
  },
  {
    id: "q2_prereq",
    text: "Which of the following is essential to avoid infinite loops in a recursive function?",
    options: ["A loop counter", "A base case termination condition", "A global pointer", "Dynamic memory allocation"],
    correctIndex: 1,
    difficulty: 0.40,
    topic: "Recursion",
    prerequisite: null
  },
  {
    id: "q3_adv",
    text: "What is the amortized time complexity of finding an element in a Hash Table with good universal hashing?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
    correctIndex: 2,
    difficulty: 0.72,
    topic: "Data Structures",
    prerequisite: "Arrays"
  },
  {
    id: "q4_tree_revisit",
    text: "When performing an in-order traversal on a Binary Search Tree, in what order are the keys visited?",
    options: ["Decreasing order", "Sorted ascending order", "Level by level", "Reverse post-order"],
    correctIndex: 1,
    difficulty: 0.55,
    topic: "Binary Trees",
    prerequisite: "Recursion"
  },
  {
    id: "q5_graph",
    text: "Which traversal algorithm is guaranteed to find the shortest path in an unweighted graph?",
    options: ["Depth First Search (DFS)", "Breadth First Search (BFS)", "Topological Sort", "Preorder traversal"],
    correctIndex: 1,
    difficulty: 0.68,
    topic: "Graphs",
    prerequisite: "Queues"
  },
  {
    id: "q6_recursion_deep",
    text: "What data structure does the call stack fundamentally emulate during recursive execution?",
    options: ["Queue (FIFO)", "Stack (LIFO)", "Priority Queue", "Circular Buffer"],
    correctIndex: 1,
    difficulty: 0.48,
    topic: "Recursion",
    prerequisite: null
  },
  {
    id: "q7_dynamic_prog",
    text: "What are the two core properties that indicate a problem can be solved using Dynamic Programming?",
    options: [
      "Greedy choice & linear time",
      "Optimal substructure & overlapping subproblems",
      "Divide-and-conquer & sorting",
      "Breadth-first search & recursion"
    ],
    correctIndex: 1,
    difficulty: 0.78,
    topic: "Algorithms",
    prerequisite: "Recursion"
  },
  {
    id: "q8_final",
    text: "What is the worst-case time complexity of QuickSort when the pivot is consistently chosen as the smallest element in an already sorted array?",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
    correctIndex: 1,
    difficulty: 0.75,
    topic: "Sorting & Arrays",
    prerequisite: "Arrays"
  }
];

export const MOCK_FINAL_RESULTS = {
  competencyScore: 0.78,
  competencyLevel: "Advanced Competency",
  totalQuestions: 8,
  correctCount: 6,
  abilityJourney: [
    { questionNumber: 1, ability: 0.50, difficulty: 0.50, correct: true, topic: "Binary Trees" },
    { questionNumber: 2, ability: 0.62, difficulty: 0.65, correct: false, topic: "Binary Trees" },
    { questionNumber: 3, ability: 0.50, difficulty: 0.40, correct: true, topic: "Recursion" },
    { questionNumber: 4, ability: 0.58, difficulty: 0.48, correct: true, topic: "Recursion" },
    { questionNumber: 5, ability: 0.66, difficulty: 0.55, correct: true, topic: "Binary Trees" },
    { questionNumber: 6, ability: 0.74, difficulty: 0.68, correct: true, topic: "Graphs" },
    { questionNumber: 7, ability: 0.71, difficulty: 0.78, correct: false, topic: "Algorithms" },
    { questionNumber: 8, ability: 0.78, difficulty: 0.75, correct: true, topic: "Sorting & Arrays" },
  ],
  topicPerformance: [
    { topic: "Arrays & Sorting", score: 90, total: 2, status: "Mastered" },
    { topic: "Graphs", score: 85, total: 1, status: "Proficient" },
    { topic: "Binary Trees", score: 70, total: 3, status: "Developing" },
    { topic: "Recursion", score: 55, total: 2, status: "Prerequisite Gap" },
  ],
  learningGaps: [
    {
      topic: "Recursion",
      severity: "warning",
      title: "Prerequisite Gap Identified: Recursive Base Conditions",
      description: "Multiple hesitations and errors on recursive branching in Binary Trees trace back to mental models around stack unwinding.",
      recommendation: "Review Call Stack execution diagrams and divide-and-conquer base case structures."
    },
    {
      topic: "Dynamic Programming",
      severity: "info",
      title: "Optimization Technique: Overlapping Subproblems",
      description: "Struggled with recognizing memoization opportunities from brute-force recursion.",
      recommendation: "Practice memoized top-down recursion before attempting bottom-up tabulation."
    }
  ]
};
