"use client";

import { useState } from "react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import DarkModeToggle from "./DarkModeToggle";

interface DashboardShellProps {
  role: string;
  children: React.ReactNode;
}

export default function DashboardShell({ role, children }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="md:hidden flex items-center justify-between bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">FlowDesk</span>
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 dark:text-gray-300 text-2xl leading-none"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </div>

      <div className="flex">
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
          />
        )}

        <aside
          className={`
            fixed md:static top-0 left-0 h-full w-56 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
            flex flex-col z-40 transform transition-transform duration-200
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">FlowDesk</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-500 dark:text-gray-400 text-xl leading-none"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            <Link
              href="/dashboard"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Dashboard
            </Link>
            {role === "admin" && (
              <Link
                href="/dashboard/users"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Users
              </Link>
            )}
            {role === "admin" && (
              <Link
                href="/dashboard/audit"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Audit Log
              </Link>
            )}
            <Link
              href="/dashboard/profile"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Profile
            </Link>
          </nav>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <LogoutButton />
            <div className="hidden md:block">
              <DarkModeToggle />
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}