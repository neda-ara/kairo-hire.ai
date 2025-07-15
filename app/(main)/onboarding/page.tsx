import { getUserOnboardingStatus } from "@/actions/user";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/helpers/constants";

export default async function OnboardingPage() {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect(ROUTES.DASHBOARD);
  }

  return (
    <main>
      <OnboardingForm />
    </main>
  );
}
