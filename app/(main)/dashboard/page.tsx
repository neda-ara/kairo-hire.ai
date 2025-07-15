import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/helpers/constants";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export default async function IndustryInsightsPage() {
  const { isOnboarded } = await getUserOnboardingStatus();

  const insights = await getIndustryInsights();

  if (!isOnboarded) {
    redirect(ROUTES.ONBOARDING);
  }

  return (
    <div className="container mx-auto">
      <DashboardView insights={insights} />
    </div>
  );
}
