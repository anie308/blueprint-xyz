export default function Loading() {
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-white font-mono text-sm">Loading reels...</p>
      </div>
    </div>
  )
}
