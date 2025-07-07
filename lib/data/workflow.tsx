import { ReactNode } from "react";
import { UserPlus, FileEdit, Users, LineChart } from "lucide-react";

export type WorkflowItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

const iconClasses = "w-8 h-8 text-primary";

export const workflow = [
  {
    title: "Tailored Onboarding",
    description:
      "Select your industry and skillset to receive personalized career support.",
    icon: <UserPlus className={iconClasses} />,
  },
  {
    title: "Build Standout Documents",
    description:
      "Generate optimized resumes and persuasive cover letters with AI assistance.",
    icon: <FileEdit className={iconClasses} />,
  },
  {
    title: "Ace the Interview",
    description:
      "Sharpen your responses with role-specific, AI-driven mock interviews.",
    icon: <Users className={iconClasses} />,
  },
  {
    title: "Measure Your Growth",
    description:
      "Track your readiness with performance insights and analytics over time.",
    icon: <LineChart className={iconClasses} />,
  },
];
