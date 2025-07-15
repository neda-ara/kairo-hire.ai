import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/helpers/constants";

export default async function IndustryInsightsPage() {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (!isOnboarded) {
    redirect(ROUTES.ONBOARDING);
  }

  return <div>YOOOO</div>;
}
