"use server";

import { cleanText } from "@/lib/helpers/helpers";
import { db } from "@/lib/prisma";
import {
  getImprovementTipPrompt,
  getInterviewQuestionsPrompt,
} from "@/lib/helpers/getPrompts";
import { getLoggedInUser } from "./user";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export async function generateQuiz() {
  const { user } = await getLoggedInUser();

  try {
    const prompt = getInterviewQuestionsPrompt(user?.industry!, user?.skills);
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanResponseText = cleanText(responseText);

    const quiz = JSON.parse(cleanResponseText);
    return quiz.questions;
  } catch (error) {
    console.error("Error occurred while generating quiz: ", error);
    throw new Error("Failed to generate quiz questions");
  }
}

export async function saveQuizResult(
  questions: Question[],
  answers: string[],
  score: number
) {
  const { user } = await getLoggedInUser();

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);
  let improvementTip = "";

  if (wrongAnswers.length > 0) {
    const wrongQuestionsContext = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}\nUser's Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    try {
      const prompt = getImprovementTipPrompt(
        user?.industry!,
        wrongQuestionsContext
      );
      const result = await model.generateContent(prompt);
      improvementTip = result.response.text().trim();
    } catch (error) {
      console.error("Error occurred while generating improvement tip: ", error);
      throw new Error("Failed to generate improvement tip");
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: 199,
        questions: questionResults as unknown as object[],
        category: "Technical",
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving quiz result: ", error);
    throw new Error("Failed to save quiz result");
  }
}

export async function getAssessments() {
  const { user } = await getLoggedInUser();

  try {
    const assessments = await db.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return assessments;
  } catch (error) {
    console.error("Error occurred while fetching assessments", error);
    throw new Error("Failed to fetch assessments");
  }
}
