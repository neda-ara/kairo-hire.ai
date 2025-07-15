import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SalaryRange } from "./dashboard-view";

export const SalaryBarChart = ({
  salaryData,
}: {
  salaryData: SalaryRange[];
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={salaryData}
        margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        barGap={6}
        barCategoryGap="20%"
      >
        <CartesianGrid stroke="#2c2c2c" strokeDasharray="3 3" />
        <XAxis
          dataKey="role"
          stroke="#a0aec0"
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          stroke="#a0aec0"
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(255, 255, 255, 0.08)" }}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-muted border border-border text-foreground rounded-lg p-3 shadow-xl space-y-1 text-sm">
                  <div className="font-semibold mb-3 min-w-24">{label}</div>
                  {payload.map((item) => (
                    <div
                      key={item.name}
                      className="flex justify-between gap-x-4 text-xs"
                    >
                      <span>{item.name}</span>
                      <span>${item.value}K</span>
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          }}
        />
        <Bar
          dataKey="min"
          name="Minimum"
          fill="#4FD1C5"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="median"
          name="Median"
          fill="#667eea"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="max"
          name="Maximum"
          fill="#f6ad55"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
