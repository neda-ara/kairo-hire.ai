"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { generateInsights } from "./dashboard";

export async function updateUser(data: any) {
  const { user } = await getLoggedInUser();

  try {
    const result = await db.$transaction(
      async (tx) => {
        // Find if industry exists
        let industryInsight = await tx.industryInsight.findUnique({
          where: {
            industry: data.industry,
          },
        });

        // If not, get AI generated industry insights
        if (!industryInsight) {
          const aiGeneratedInsights = await generateInsights(data.industry);

          industryInsight = await db.industryInsight.create({
            data: {
              industry: data.industry!,
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              ...aiGeneratedInsights,
            },
          });
        }

        // Update user
        const updatedUser = await tx.user.update({
          where: {
            id: user.id,
          },
          data: {
            industry: data.industry,
            experience: data.experience,
            bio: data.bio,
            skills: data.skills,
          },
        });

        return { user: updatedUser, industryInsight };
      },
      {
        timeout: 10000,
      }
    );

    return { success: true, ...result };
  } catch (error) {
    console.error("Error occurred while updating user profile", error);
    throw new Error("Failed to update user profile");
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await getLoggedInUser();

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    return { isOnboarded: !!user?.industry };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get user onboarding status");
  }
}

export async function getLoggedInUser(includeIndustryInsight?: boolean) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
    include: {
      industryInsight: !!includeIndustryInsight,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return { user, userId };
}
