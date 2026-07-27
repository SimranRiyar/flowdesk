"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./ToastProvider";

interface ProfileFormProps {
  currentName: string;
}

export default function ProfileForm({ currentName }: ProfileFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setLoading(false);

    if (res.ok) {
      showToast("Name updated successfully");
      router.refresh();
    } else {
      showToast("Something went wrong", "error");
    }
  }

  return (
    <div className="mt-3">
      <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700">Full name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}