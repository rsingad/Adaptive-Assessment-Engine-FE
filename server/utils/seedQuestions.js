const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Question = require('../models/Question');

dotenv.config({ path: path.join(__dirname, '../.env') });

const questions = [
  // --- Arrays (Prerequisite: None) ---
  {
    subject: "DSA",
    question: "What is the time complexity to access an element by index in a contiguous array?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correctAnswer: 0,
    topic: "Arrays",
    prerequisite: null,
    difficulty: 0.2,
    explanation: "Array elements are stored sequentially in memory, enabling constant time direct index calculation O(1)."
  },
  {
    question: "Which operation on an unsorted array takes O(n) time in the worst case?",
    options: ["Index lookup", "Appending to end (with spare capacity)", "Linear search for a target value", "Getting array length"],
    correctAnswer: 2,
    topic: "Arrays",
    prerequisite: null,
    difficulty: 0.35,
    explanation: "Searching an unsorted array requires scanning elements one by one from start to end, resulting in O(n)."
  },

  // --- Queues (Prerequisite: Arrays) ---
  {
    question: "What data structure operates on a First-In, First-Out (FIFO) policy?",
    options: ["Stack", "Queue", "Binary Tree", "Heap"],
    correctAnswer: 1,
    topic: "Queues",
    prerequisite: "Arrays",
    difficulty: 0.3,
    explanation: "Queues maintain FIFO ordering, where the first element inserted is the first element removed."
  },
  {
    question: "What is the primary queue operation used to insert an element at the rear?",
    options: ["Dequeue", "Enqueue", "Pop", "Peek"],
    correctAnswer: 1,
    topic: "Queues",
    prerequisite: "Arrays",
    difficulty: 0.4,
    explanation: "Enqueue adds an item to the back of the queue."
  },

  // --- Stacks (Prerequisite: Arrays) ---
  {
    question: "Which data structure follows the Last-In, First-Out (LIFO) order?",
    options: ["Queue", "Stack", "Linked List", "Graph"],
    correctAnswer: 1,
    topic: "Stacks",
    prerequisite: "Arrays",
    difficulty: 0.3,
    explanation: "Stacks strictly follow LIFO order where the last pushed item is popped first."
  },
  {
    question: "Which of the following application structures relies heavily on a Stack?",
    options: ["CPU Scheduling FIFO Queue", "Function Call Stack (Recursion tracking)", "Breadth-First Search Queue", "Print Job Spooler"],
    correctAnswer: 1,
    topic: "Stacks",
    prerequisite: "Arrays",
    difficulty: 0.45,
    explanation: "Program call stacks use LIFO stack logic to track active stack frames during recursive execution."
  },

  // --- Searching (Prerequisite: Arrays) ---
  {
    question: "What is the worst-case time complexity of Binary Search on a sorted array of size n?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1,
    topic: "Searching",
    prerequisite: "Arrays",
    difficulty: 0.5,
    explanation: "Binary search repeatedly halves the search interval, yielding logarithmic complexity O(log n)."
  },
  {
    question: "Binary search can ONLY be applied directly on which type of collection?",
    options: ["Unsorted Array", "Sorted Array", "Unsorted Doubly Linked List", "Hash Map"],
    correctAnswer: 1,
    topic: "Searching",
    prerequisite: "Arrays",
    difficulty: 0.55,
    explanation: "Binary search relies on element ordering (sorted data) and random access indexing."
  },

  // --- Recursion (Prerequisite: Stacks) ---
  {
    question: "What essential condition prevents infinite recursion in a recursive function?",
    options: ["Recursive Step", "Base Case", "Iterative Loop", "Tail Call"],
    correctAnswer: 1,
    topic: "Recursion",
    prerequisite: "Stacks",
    difficulty: 0.55,
    explanation: "The base case provides a terminating condition that stops recursive calls."
  },
  {
    question: "If a recursive function lacks a base case, what runtime exception occurs?",
    options: ["Buffer Overflow", "Stack Overflow", "Null Pointer Exception", "Out of Memory Exception"],
    correctAnswer: 1,
    topic: "Recursion",
    prerequisite: "Stacks",
    difficulty: 0.65,
    explanation: "Infinite recursive calls exhaust available call stack memory, leading to a stack overflow error."
  },

  // --- Sorting (Prerequisite: Searching) ---
  {
    question: "What is the average time complexity of Merge Sort?",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(2^n)"],
    correctAnswer: 0,
    topic: "Sorting",
    prerequisite: "Searching",
    difficulty: 0.65,
    explanation: "Merge Sort splits the array logarithmically and merges in linear time, total O(n log n)."
  },
  {
    question: "Which sorting algorithm employs a Divide-and-Conquer strategy using a pivot element?",
    options: ["Bubble Sort", "Selection Sort", "Quick Sort", "Insertion Sort"],
    correctAnswer: 2,
    topic: "Sorting",
    prerequisite: "Searching",
    difficulty: 0.70,
    explanation: "Quick Sort partitions arrays around a chosen pivot recursively."
  },

  // --- Trees (Prerequisite: Recursion) ---
  {
    question: "In a Binary Search Tree (BST), where are values smaller than the root node located?",
    options: ["Right subtree", "Left subtree", "Parent node", "Sibling node"],
    correctAnswer: 1,
    topic: "Trees",
    prerequisite: "Recursion",
    difficulty: 0.6,
    explanation: "In a valid BST, all keys in the left subtree are less than the node's key."
  },
  {
    question: "Which tree traversal yields elements of a Binary Search Tree in sorted ascending order?",
    options: ["Pre-order Traversal", "In-order Traversal", "Post-order Traversal", "Level-order Traversal"],
    correctAnswer: 1,
    topic: "Trees",
    prerequisite: "Recursion",
    difficulty: 0.75,
    explanation: "In-order traversal (Left, Root, Right) processes BST nodes in non-decreasing order."
  },

  // --- Graphs (Prerequisite: Queues) ---
  {
    question: "Which graph traversal strategy uses a Queue to visit nodes level-by-level?",
    options: ["Depth-First Search (DFS)", "Breadth-First Search (BFS)", "Dijkstra's Algorithm", "Kruskal's Algorithm"],
    correctAnswer: 1,
    topic: "Graphs",
    prerequisite: "Queues",
    difficulty: 0.70,
    explanation: "BFS explores all immediate neighbors level-by-level using a FIFO Queue."
  },
  {
    question: "Which traversal technique uses a Stack (or recursion) to explore as deep as possible before backtracking?",
    options: ["BFS", "DFS", "Topological Sort", "Prim's Algorithm"],
    correctAnswer: 1,
    topic: "Graphs",
    prerequisite: "Queues",
    difficulty: 0.80,
    explanation: "DFS traverses down branches to leaf nodes using a stack mechanism before backtracking."
  },

  // --- Advanced Graphs & Trees (Expert Level) ---
  {
    question: "What algorithm finds the shortest path between a single source node and all other nodes in a weighted graph with non-negative edge weights?",
    options: ["Bellman-Ford Algorithm", "Dijkstra's Algorithm", "Floyd-Warshall Algorithm", "Kruskal's Algorithm"],
    correctAnswer: 1,
    topic: "Graphs",
    prerequisite: "Queues",
    difficulty: 0.88,
    explanation: "Dijkstra's algorithm efficiently computes single-source shortest paths using a priority queue."
  },
  {
    question: "What is the maximum height of a self-balancing AVL Tree with N nodes?",
    options: ["O(N)", "O(log N)", "O(N²)", "O(1)"],
    correctAnswer: 1,
    topic: "Trees",
    prerequisite: "Recursion",
    difficulty: 0.95,
    explanation: "AVL trees maintain strict height balancing guarantees, keeping tree height bounded at O(log N)."
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/adaptive_db';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    await Question.deleteMany({});
    console.log('Existing questions cleared.');

    const inserted = await Question.insertMany(questions);
    console.log(`Successfully seeded ${inserted.length} questions!`);

    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding questions:', error);
    process.exit(1);
  }
};

seedDB();
