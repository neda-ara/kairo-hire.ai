import { Features } from "@/components/landing/features";
import { HeroSection } from "@/components/landing/hero";
import { Statistics } from "@/components/landing/statistics";

export default function Home() {
  return (
    <div>
      <div className="grid-background" />
      <HeroSection />
      <Features />
      <Statistics />
    </div>
  );
}
