"use client";

import { useState } from "react";
import { useToast } from "./ToastProvider";

export default function PasswordForm() {
  const { showToast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/profile/password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      showToast(data.error || "Something went wrong", "error");
      return;
    }

    showToast("Password updated successfully");
    setCurrentPassword("");
    setNewPassword("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 space-y-3 max-w-sm">
      <div>
        <label className="text-sm font-medium text-gray-700">Current password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">New password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={6}
          className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}