import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Features } from "@/components/landing/features";
import { FrequentlyAskedQuestions } from "@/components/landing/faqs";
import { HeroSection } from "@/components/landing/hero";
import { ROUTES } from "@/lib/helpers/constants";
import { Statistics } from "@/components/landing/statistics";
import { Testimonials } from "@/components/landing/testimonials";
import { Workflow } from "@/components/landing/workflow";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="grid-background" />
      <HeroSection />
      <Features />
      <Statistics />
      <Workflow />
      <Testimonials />
      <FrequentlyAskedQuestions />

      <section className="w-full px-4 sm:px-0">
        <div className="mx-auto px-4 pt-24 pb-16 bg-gradient-to-br from-zinc-900 via-neutral-800 to-zinc-700 rounded-2xl shadow-xl max-w-5xl">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              Ready to Accelerate Your Career?
            </h2>
            <p className="mx-auto max-w-[600px] text-white/70 md:text-xl">
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </p>
            <Image
              src="/assets/robo-guide.png"
              width={175}
              height={175}
              alt="RoboCoach"
              className="max-w-full rounded-full"
              priority
            />
            <Link href={ROUTES.DASHBOARD} passHref>
              <Button
                size={"lg"}
                variant={"outline"}
                className="h-11 mt-4 transition-transform animate-bounce"
              >
                Start Your Journey Today <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
