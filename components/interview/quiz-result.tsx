"use client";

import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { CheckCircle2, Trophy, XCircle } from "lucide-react";
import { Progress } from "../ui/progress";

type QuizQuestion = {
  question: string;
  isCorrect: boolean;
  userAnswer: string;
  answer: string;
  explanation: string;
};

export const QuizResult = ({
  result,
  hideStartNew = false,
  onStartNew,
}: {
  result: any;
  hideStartNew?: boolean;
  onStartNew: () => void;
}) => {
  if (!result) {
    return <></>;
  }

  console.log("result", result);

  return (
    <Card className="mx-auto p-4">
      <h1 className="flex items-center gap-2 text-3xl gradient-title">
        <Trophy className="h-6 aspect-square text-yellow-500" />
        Quiz Results
      </h1>

      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">{result.quizScore.toFixed(1)}%</h3>
          <Progress value={result.quizScore} className="w-full" />
        </div>

        {result.improvementTip && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-medium">Improvement Tip:</p>
            <p className="text-muted-foreground">{result.improvementTip}</p>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="font-medium">Question Review</h3>
          {result.questions.map((q: QuizQuestion, idx: number) => (
            <div key={idx} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 aspect-square text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 aspect-square text-red-500 flex-shrink-0" />
                )}
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  <b>You answer:</b> {q.userAnswer}
                </p>
                {!q.isCorrect && (
                  <p>
                    <b>Correct Answer:</b> {q.answer}
                  </p>
                )}
              </div>

              <div className="text-sm bg-muted p-2 rounded">
                <p className="font-medium">Explanation:</p>
                <p>{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter>
          <Button onClick={onStartNew} className="w-full">
            Start New Quiz
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
