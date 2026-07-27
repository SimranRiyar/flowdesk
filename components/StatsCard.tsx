interface StatsCardProps {
  title: string;
  value: number | string;
  description: string;
}

export default function StatsCard({ title, value, description }: StatsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow min-w-[140px]">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">{title}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">{description}</p>
    </div>
  );
}