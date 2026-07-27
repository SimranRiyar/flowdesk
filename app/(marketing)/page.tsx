import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-16 text-center">
        <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          Built for modern teams
        </span>
        <h1 className="mt-6 text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
          Manage your business<br />
          <span className="text-indigo-600">with clarity</span>
        </h1>
        <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto">
          FlowDesk gives you a clean, powerful dashboard to track
          users, monitor revenue, and understand your growth —
          all in one place.
        </p>
        <div className="mt-10 flex gap-4 justify-center">
          <Link
            href="/register"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Get started free
          </Link>
          <Link
            href="/dashboard"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            View demo
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "User Management", desc: "Track, filter and manage all your users in one place." },
          { title: "Revenue Tracking", desc: "Monitor your monthly revenue and growth trends." },
          { title: "Real-time Stats", desc: "Live metrics updated as your business grows." },
        ].map((f) => (
          <div key={f.title} className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="font-semibold text-gray-900">{f.title}</h3>
            <p className="mt-2 text-sm text-gray-500">{f.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}