import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function StudioCardSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <Skeleton className="w-12 h-12 rounded-sm" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </Card>
  )
}

export function StudiosGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <StudioCardSkeleton key={index} />
      ))}
    </div>
  )
}

export function SearchSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Skeleton className="h-10 flex-1" />
      <Skeleton className="h-10 w-20" />
      <Skeleton className="h-10 w-32" />
    </div>
  )
}
