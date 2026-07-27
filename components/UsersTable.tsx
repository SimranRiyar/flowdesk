"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./ToastProvider";

interface TableUser {
  id: number;
  name: string;
  email: string;
  role: string;
  emailVerified: boolean;
  createdAt: string | Date;
}

interface UsersTableProps {
  users: TableUser[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [loadingId, setLoadingId] = useState<number | null>(null);

  async function toggleRole(id: number, currentRole: string, name: string) {
    const newRole = currentRole === "admin" ? "user" : "admin";
    setLoadingId(id);

    const res = await fetch(`/api/users/${id}/role`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });

    setLoadingId(null);

    if (res.ok) {
      showToast(`${name} is now ${newRole === "admin" ? "an Admin" : "a User"}`);
      router.refresh();
    } else {
      showToast("Failed to update role", "error");
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto">
      <table className="w-full text-sm min-w-[640px]">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-6 py-3 font-medium text-gray-500">Name</th>
            <th className="text-left px-6 py-3 font-medium text-gray-500">Email</th>
            <th className="text-left px-6 py-3 font-medium text-gray-500">Role</th>
            <th className="text-left px-6 py-3 font-medium text-gray-500">Status</th>
            <th className="text-left px-6 py-3 font-medium text-gray-500">Joined</th>
            <th className="text-left px-6 py-3 font-medium text-gray-500">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 last:border-0">
                <td className="px-6 py-4 text-gray-900 font-medium">{user.name}</td>
                <td className="px-6 py-4 text-gray-500">{user.email}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.role === "admin" ? "Admin" : "User"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {user.emailVerified ? (
                    <span className="text-green-600 text-xs font-medium">✅ Verified</span>
                  ) : (
                    <span className="text-amber-600 text-xs font-medium">⏳ Pending</span>
                  )}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleRole(user.id, user.role, user.name)}
                    disabled={loadingId === user.id}
                    className="text-xs font-medium text-indigo-600 hover:text-indigo-800 disabled:opacity-50"
                  >
                    {loadingId === user.id
                      ? "Updating..."
                      : user.role === "admin"
                      ? "Make User"
                      : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}