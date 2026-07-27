interface ActivityItem {
  id: number;
  actorEmail: string;
  action: string;
  details: string;
  createdAt: string | Date;
}

interface ActivityFeedProps {
  logs: ActivityItem[];
}

const actionLabels: Record<string, string> = {
  register: "🆕",
  login: "🔑",
  role_change: "🛡️",
  password_change: "🔒",
};

export default function ActivityFeed({ logs }: ActivityFeedProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">Latest signups and actions</p>

      {logs.length === 0 ? (
        <p className="text-sm text-gray-400 dark:text-gray-500">No activity yet</p>
      ) : (
        <ul className="space-y-3">
          {logs.map((log) => (
            <li key={log.id} className="flex items-start gap-3 text-sm">
              <span className="text-base leading-none">{actionLabels[log.action] || "•"}</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-700 dark:text-gray-300 truncate">{log.details}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {new Date(log.createdAt).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}