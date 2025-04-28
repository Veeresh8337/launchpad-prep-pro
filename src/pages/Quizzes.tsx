
import { useState } from 'react';
import { quizQuestions } from '@/data/quizzes';
import Quiz from '@/components/Quiz';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Quizzes = () => {
  const [activeQuiz, setActiveQuiz] = useState<'aptitude' | 'technical' | null>(null);

  const startQuiz = (category: 'aptitude' | 'technical') => {
    setActiveQuiz(category);
  };

  if (activeQuiz) {
    const questions = quizQuestions.filter(q => q.category === activeQuiz);
    return (
      <div className="container py-8 space-y-8">
        <Quiz 
          questions={questions}
          onComplete={() => setActiveQuiz(null)}
        />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Choose a Quiz</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Aptitude Quiz</CardTitle>
            <CardDescription>Test your problem-solving and mathematical skills</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => startQuiz('aptitude')}>Start Quiz</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Technical Quiz</CardTitle>
            <CardDescription>Test your technical knowledge and programming concepts</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => startQuiz('technical')}>Start Quiz</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quizzes;
