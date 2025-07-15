import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type InsightCardProps = {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
};

export const InsightCard = ({ title, icon, content }: InsightCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>{content}</CardContent>
  </Card>
);
