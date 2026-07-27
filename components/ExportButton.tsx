"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useToast } from "./ToastProvider";

export default function ExportButton() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleExport() {
    setLoading(true);
    const params = new URLSearchParams();
    const search = searchParams.get("search");
    const role = searchParams.get("role");
    if (search) params.set("search", search);
    if (role) params.set("role", role);

    const res = await fetch(`/api/users/export?${params.toString()}`);
    setLoading(false);

    if (!res.ok) {
      showToast("Failed to export users", "error");
      return;
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flowdesk-users.csv";
    a.click();
    window.URL.revokeObjectURL(url);
    showToast("Users exported");
  }

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
    >
      {loading ? "Exporting..." : "Export CSV"}
    </button>
  );
}