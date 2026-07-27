import { prisma } from "../../lib/prisma";
import { getSession } from "../../lib/auth";
import { redirect } from "next/navigation";
import StatsCard from "../../components/StatsCard";
import DashboardCharts from "../../components/DashboardCharts";
import ActivityFeed from "../../components/ActivityFeed";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  if (session.role !== "admin") {
    return (
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back, {session.name}
        </p>
        <div className="mt-8 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 max-w-md">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You&apos;re logged in as a standard user.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Visit your profile to manage your account.
          </p>
        </div>
      </div>
    );
  }

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const [totalUsers, activeUsers, newToday, recentUsers, recentLogs] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { emailVerified: true } }),
    prisma.user.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.user.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    }),
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  const verifiedRate = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;

  const growthData = [];
  const revenueData = [];
  const mockRevenue = [820, 940, 1010, 980, 1250, 1400, 1580];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });

    const dayStart = new Date(d);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(d);
    dayEnd.setHours(23, 59, 59, 999);

    const count = recentUsers.filter(
      (u) => u.createdAt >= dayStart && u.createdAt <= dayEnd
    ).length;

    growthData.push({ date: label, value: count });
    revenueData.push({ date: label, value: mockRevenue[6 - i] });
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Welcome back to FlowDesk</p>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatsCard title="Total Users" value={totalUsers} description="All registered users" />
        <StatsCard title="Active Users" value={activeUsers} description="Verified accounts" />
        <StatsCard title="New Today" value={newToday} description="Registered today" />
        <StatsCard
          title="Verified Rate"
          value={`${verifiedRate}%`}
          description="Verified vs total users"
        />
      </div>

      <DashboardCharts growthData={growthData} revenueData={revenueData} />

      <div className="mt-6">
        <ActivityFeed logs={recentLogs} />
      </div>
    </div>
  );
}