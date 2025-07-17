import { getAssessments } from "@/actions/interview";
import { JsonValue } from "@prisma/client/runtime/library";
import { PerformanceChart } from "@/components/interview/performance-chart";
import { QuizList } from "@/components/interview/quiz-list";
import { StatsCard } from "@/components/interview/stats-card";

export type AssessmentResult = {
  id: string;
  userId: string;
  quizScore: number;
  category: string;
  improvementTip?: string | null | undefined;
  createdAt: Date;
  updatedAt: Date;
  questions: JsonValue[];
};

export default async function InterviewPage() {
  const assessments = await getAssessments();

  return (
    <div>
      <h1 className="text-6xl font-bold gradient-title mb-5">
        Interview Preparation
      </h1>
      <div className="space-y-6">
        <StatsCard assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
}
