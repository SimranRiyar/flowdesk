import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AuditPage() {
  const session = await getSession();
  if (!session || session.role !== "admin") redirect("/dashboard");

  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
      <p className="mt-1 text-sm text-gray-500">Recent account activity</p>

      <div className="mt-6 bg-white rounded-xl border border-gray-200 overflow-x-auto">
        <table className="w-full text-sm min-w-[560px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Actor</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Action</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">Details</th>
              <th className="text-left px-6 py-3 font-medium text-gray-500">When</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                  No activity yet
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-6 py-4 text-gray-900">{log.actorEmail}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{log.details}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(log.createdAt).toLocaleString("en-GB")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}