
import { QuizQuestion } from "@/types/quiz";
import { generateUniqueId } from "@/lib/utils";

export const quizQuestions: QuizQuestion[] = [
  {
    id: generateUniqueId(),
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1,
    category: "technical"
  },
  {
    id: generateUniqueId(),
    question: "If a train travels 360 kilometers in 4 hours, what is its speed in km/h?",
    options: ["80 km/h", "90 km/h", "85 km/h", "95 km/h"],
    correctAnswer: 0,
    category: "aptitude"
  },
  {
    id: generateUniqueId(),
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    correctAnswer: 2,
    category: "technical"
  },
  {
    id: generateUniqueId(),
    question: "If 3x + 7 = 22, what is x?",
    options: ["5", "7", "3", "15"],
    correctAnswer: 0,
    category: "aptitude"
  }
];
