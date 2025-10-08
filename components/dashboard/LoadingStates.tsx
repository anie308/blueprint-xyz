import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PostCardSkeleton() {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-12" />
          </div>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex items-center gap-4 mt-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-12" />
          </div>
        </div>
      </div>
    </Card>
  )
}

export function FeedSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <PostCardSkeleton key={index} />
      ))}
    </div>
  )
}

export function StudioCardSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
      <Skeleton className="w-12 h-12 rounded-lg" />
      <div className="flex-1">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-6 w-16 rounded-full" />
    </div>
  )
}

export function StudiosSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <StudioCardSkeleton key={index} />
      ))}
    </div>
  )
}

export function StatsSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>
      ))}
    </div>
  )
}
