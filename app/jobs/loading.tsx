export default function JobsLoading() {
  return (
    <div className="min-h-screen pb-20 md:pb-8">
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="h-8 w-48 bg-secondary rounded animate-pulse mb-2" />
          <div className="h-4 w-32 bg-secondary rounded animate-pulse" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-secondary rounded animate-pulse" />
              ))}
            </div>
          </div>
          <div className="lg:col-span-3 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-secondary rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
