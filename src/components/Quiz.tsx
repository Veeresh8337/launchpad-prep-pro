
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizQuestion } from '@/types/quiz';
import { useQuiz } from '@/hooks/useQuiz';
import { Timer, MessageSquareCheck } from 'lucide-react';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete?: () => void;
}

const Quiz = ({ questions, onComplete }: QuizProps) => {
  const { currentQuestion, questionNumber, totalQuestions, isCompleted, submitAnswer, saveAttempt } = useQuiz(questions);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    submitAnswer(selectedAnswer);
    setSelectedAnswer(null);

    if (questionNumber === totalQuestions) {
      saveAttempt();
      onComplete?.();
    }
  };

  if (isCompleted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquareCheck className="w-5 h-5" />
            Quiz Completed!
          </CardTitle>
          <CardDescription>
            Great job! Check your results in the dashboard.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Question {questionNumber} of {totalQuestions}</span>
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5" />
            <span className="text-sm">Time Started</span>
          </div>
        </CardTitle>
        <CardDescription>{currentQuestion.question}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === index ? "default" : "outline"}
              className="justify-start h-auto py-3 px-4 text-left"
              onClick={() => setSelectedAnswer(index)}
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="flex justify-end pt-4">
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
          >
            {questionNumber === totalQuestions ? "Finish" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Quiz;
