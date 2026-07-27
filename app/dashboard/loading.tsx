export default function DashboardLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-40 bg-gray-200 rounded" />
      <div className="h-4 w-56 bg-gray-100 rounded mt-2" />

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-8 w-16 bg-gray-200 rounded mt-3" />
            <div className="h-3 w-24 bg-gray-100 rounded mt-2" />
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-6 h-64" />
        ))}
      </div>
    </div>
  );
}