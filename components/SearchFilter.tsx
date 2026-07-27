"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState } from "react";

export default function SearchFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const role = searchParams.get("role") || "all";

  function updateParams(newSearch: string, newRole: string) {
    const params = new URLSearchParams();
    if (newSearch) params.set("search", newSearch);
    if (newRole && newRole !== "all") params.set("role", newRole);
    router.push(`${pathname}?${params.toString()}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateParams(search, role);
  }

  function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    updateParams(search, e.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email..."
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <select
        value={role}
        onChange={handleRoleChange}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="all">All Roles</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
      >
        Search
      </button>
    </form>
  );
}