import { LineChart, TrendingDown, TrendingUp } from "lucide-react";

export const ROUTES = {
  COVER_LETTER: "cover-letter",
  DASHBOARD: "/dashboard",
  INTERVIEW: "/interview",
  MOCK_INTERVIEW: "/interview/mock",
  ONBOARDING: "/onboarding",
  RESUME: "/resume",
};

export const DEMAND_LEVEL_STYLES = {
  LOW: {
    icon: "",
    color: "bg-red-500",
  },
  MEDIUM: {
    icon: "",
    color: "bg-yellow-500",
  },
  HIGH: {
    icon: "",
    color: "bg-green-500",
  },
};

export const MARKET_OUTLOOK_STYLES = {
  POSITIVE: {
    icon: TrendingUp,
    color: "text-green-500",
  },
  NEUTRAL: {
    icon: LineChart,
    color: "text-yellow-500",
  },
  NEGATIVE: {
    icon: TrendingDown,
    color: "text-red-500",
  },
};
