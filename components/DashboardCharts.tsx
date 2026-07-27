"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartPoint {
  date: string;
  value: number;
}

interface DashboardChartsProps {
  growthData: ChartPoint[];
  revenueData: ChartPoint[];
}

export default function DashboardCharts({ growthData, revenueData }: DashboardChartsProps) {
  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-sm font-semibold text-gray-900">User Growth</h3>
        <p className="text-xs text-gray-400 mb-4">New signups, last 7 days</p>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-sm font-semibold text-gray-900">Revenue</h3>
        <p className="text-xs text-gray-400 mb-4">
          Placeholder data — connects to Stripe later
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
            <Tooltip />
            <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}