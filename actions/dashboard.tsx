"use server";

import { cleanText } from "@/lib/helpers/helpers";
import { db } from "@/lib/prisma";
import { DemandLevel, MarketOutlook } from "@/lib/generated/prisma";
import { getIndustryInsightPrompt } from "@/lib/helpers/getPrompts";
import { getLoggedInUser } from "./user";
import { GoogleGenerativeAI } from "@google/generative-ai";

export type AIGeneratedInsights = {
  salaryRanges: any[];
  growthRate: number;
  demandLevel: DemandLevel;
  topSkills: string[];
  marketOutlook: MarketOutlook;
  keyTrends: string[];
  recommendedSkills: string[];
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export const generateInsights = async (
  industry: string | null
): Promise<AIGeneratedInsights> => {
  if (!industry) {
    throw new Error("Industry is missing");
  }

  const prompt = getIndustryInsightPrompt(industry);
  const result = await model.generateContent(prompt);
  const responseText = result.response.text();
  const cleanResponseText = cleanText(responseText);

  return JSON.parse(cleanResponseText) as AIGeneratedInsights;
};

export async function getIndustryInsights() {
  const { user } = await getLoggedInUser(true);

  if (!user.industryInsight) {
    const aiGeneratedInsights = await generateInsights(user.industry);

    const industryInsights = db.industryInsight.create({
      data: {
        industry: user.industry!,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        ...aiGeneratedInsights,
      },
    });

    return industryInsights;
  }

  return user.industryInsight;
}
