"use client"
import { useRouter } from "next/navigation"

export default function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" })
    router.push("/login")
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
    >
      Logout
    </button>
  )
}