"use client";

import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  DEMAND_LEVEL_STYLES,
  MARKET_OUTLOOK_STYLES,
} from "@/lib/helpers/constants";
import {
  Brain,
  BriefcaseIcon,
  Lightbulb,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { IndustryInsight } from "@/lib/generated/prisma";
import { Progress } from "../ui/progress";
import { InsightCard } from "./insight-card";
import { SalaryBarChart } from "./salary-bar-chart";

export type SalaryRange = {
  role: string;
  min: number;
  max: number;
  median: number;
  location: string;
};

export const DashboardView = ({ insights }: { insights: IndustryInsight }) => {
  const salaryData = (insights.salaryRanges as SalaryRange[]).map(
    (range: SalaryRange) => ({
      role: range.role,
      min: range.min / 1000,
      max: range.max / 1000,
      median: range.median / 1000,
      location: range.location,
    })
  );

  const lastUpdatedAt = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    {
      addSuffix: true,
    }
  );

  const OutlookIcon = MARKET_OUTLOOK_STYLES[insights.marketOutlook].icon;
  const outlookColor = MARKET_OUTLOOK_STYLES[insights.marketOutlook].color;
  const demandColor = DEMAND_LEVEL_STYLES[insights.demandLevel].color;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Badge variant="outline" className="px-2 py-1.5">
          Last Updated: {lastUpdatedAt}
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InsightCard
          title="Market Outlook"
          icon={<OutlookIcon className={`h-4 aspect-square ${outlookColor}`} />}
          content={
            <>
              <div className="text-2xl font-bold">{insights.marketOutlook}</div>
              <p className="text-xs text-muted-foreground">
                Next update {nextUpdateDistance}
              </p>
            </>
          }
        />
        <InsightCard
          title="Industry Growth"
          icon={
            <TrendingUp className="h-4 aspect-square text-muted-foreground" />
          }
          content={
            <>
              <div className="text-2xl font-bold">
                {insights.growthRate.toFixed(1)}%
              </div>
              <Progress value={insights.growthRate} className="mt-2" />
            </>
          }
        />
        <InsightCard
          title="Demand Level"
          icon={
            <BriefcaseIcon className="h-4 aspect-square text-muted-foreground" />
          }
          content={
            <>
              <div className="text-2xl font-bold">{insights.demandLevel}</div>
              <div className={`h-2 w-full rounded-full mt-2 ${demandColor}`} />
            </>
          }
        />
        <InsightCard
          title="Top Skills"
          icon={<Brain className="h-4 aspect-square text-muted-foreground" />}
          content={
            <div className="flex flex-wrap gap-1">
              {insights.topSkills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          }
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Salary Ranges by Role</CardTitle>
          <CardDescription>
            Displaying minimum, median, and maximum salaries (in thousands)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <SalaryBarChart salaryData={salaryData} />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="w-5 h-5 text-violet-300" />
              Emerging Industry Trends
            </CardTitle>
            <CardDescription>
              What’s shaping the industry right now — stay ahead of the curve.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 list-none">
              {insights.keyTrends.map((trend, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <span className="text-sm text-muted-foreground">{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="w-5 h-5 text-yellow-200" />
              Recommended Skills
            </CardTitle>
            <CardDescription>
              The most valuable skills to build in your industry today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.recommendedSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
