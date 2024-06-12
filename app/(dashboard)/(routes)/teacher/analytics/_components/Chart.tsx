"use client";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  data: {
    name: string;
    total: number;
  }[];
}
const Chart = ({ data }: Props) => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip />
          <Bar dataKey="total" fill="#0369a1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default Chart;
