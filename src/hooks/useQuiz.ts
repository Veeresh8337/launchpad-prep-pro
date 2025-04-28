
import { useState, useCallback } from 'react';
import { QuizQuestion, QuizState, QuizAttempt } from '@/types/quiz';
import { generateUniqueId } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export const useQuiz = (questions: QuizQuestion[]) => {
  const { toast } = useToast();
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    timeStarted: Date.now(),
    isCompleted: false,
  });

  const submitAnswer = useCallback((answerIndex: number) => {
    setState(prev => ({
      ...prev,
      answers: [...prev.answers, answerIndex],
      currentQuestion: prev.currentQuestion + 1,
      isCompleted: prev.currentQuestion + 1 >= questions.length,
    }));
  }, [questions.length]);

  const calculateScore = useCallback(() => {
    let correct = 0;
    state.answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) correct++;
    });
    return correct;
  }, [questions, state.answers]);

  const saveAttempt = useCallback(() => {
    if (!state.isCompleted) return;

    const score = calculateScore();
    const timeSpent = Math.floor((Date.now() - state.timeStarted) / 1000);
    
    const attempt: QuizAttempt = {
      id: generateUniqueId(),
      date: new Date().toISOString(),
      category: questions[0].category,
      score,
      totalQuestions: questions.length,
      timeSpent,
    };

    // Save to localStorage
    const attempts = JSON.parse(localStorage.getItem('quiz_attempts') || '[]');
    localStorage.setItem('quiz_attempts', JSON.stringify([...attempts, attempt]));

    toast({
      title: "Quiz Completed!",
      description: `You scored ${score} out of ${questions.length}`,
    });

    return attempt;
  }, [state, questions, calculateScore, toast]);

  return {
    currentQuestion: questions[state.currentQuestion],
    questionNumber: state.currentQuestion + 1,
    totalQuestions: questions.length,
    isCompleted: state.isCompleted,
    submitAnswer,
    saveAttempt,
  };
};
