import { getUserOnboardingStatus } from "@/actions/user";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const { isOnboarded } = await getUserOnboardingStatus();

  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnboardingForm />
    </main>
  );
}
