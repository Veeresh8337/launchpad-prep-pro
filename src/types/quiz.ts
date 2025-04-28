
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: 'aptitude' | 'technical';
}

export interface QuizAttempt {
  id: string;
  date: string;
  category: 'aptitude' | 'technical';
  score: number;
  totalQuestions: number;
  timeSpent: number; // in seconds
}

export interface QuizState {
  currentQuestion: number;
  answers: number[];
  timeStarted: number;
  isCompleted: boolean;
}
