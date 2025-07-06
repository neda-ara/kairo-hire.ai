import { BrainCircuit, Briefcase, LineChart, ScrollText } from "lucide-react";
import { JSX } from "react";

export type Feature = {
  icon: JSX.Element;
  title: string;
  description: string;
};

const iconClasses = "w-10 h-10 mb-4 text-primary";

export const features: Feature[] = [
  {
    icon: <BrainCircuit className={iconClasses} />,
    title: "Smart Career Guidance",
    description:
      "AI-driven recommendations tailored to your goals, skills, and timing — not just job listings.",
  },
  {
    icon: <Briefcase className={iconClasses} />,
    title: "Interview Preparation",
    description:
      "Sharpen your answers with AI-powered mock interviews, question banks, and role-specific tips.",
  },
  {
    icon: <LineChart className={iconClasses} />,
    title: "Industry Insights",
    description:
      "Stay ahead with up-to-date trends, skill demands, and real-world salary benchmarks.",
  },
  {
    icon: <ScrollText className={iconClasses} />,
    title: "Resume & Cover Letter Builder",
    description:
      "Craft tailored, ATS-friendly resumes and cover letters in minutes — guided by AI.",
  },
];
