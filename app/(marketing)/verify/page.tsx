"use client"
import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"

function VerifyForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const email = searchParams.get("email") || ""
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      setLoading(false)
      return
    }

    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl border border-gray-200 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900">Check your email</h1>
        <p className="mt-2 text-sm text-gray-500">
          We sent a 4-digit code to <strong>{email}</strong>
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            maxLength={4}
            placeholder="Enter 4-digit code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading || code.length !== 4}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Verifying..." : "Verify email"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyForm />
    </Suspense>
  )
}