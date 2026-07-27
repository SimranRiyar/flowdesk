export default function UsersLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded" />
      <div className="h-4 w-48 bg-gray-100 rounded mt-2" />

      <div className="mt-6 h-10 bg-gray-100 rounded-lg" />

      <div className="mt-4 bg-white rounded-xl border border-gray-200 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-12 border-b border-gray-100 last:border-0 bg-gray-50/50" />
        ))}
      </div>
    </div>
  );
}