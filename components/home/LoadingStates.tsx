import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProjectGallerySkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="group overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
            <Skeleton className="w-full h-full" />
          </div>
          <CardContent className="p-4">
            <Skeleton className="h-5 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function TestimonialsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="text-center">
          <CardContent className="p-8">
            <Skeleton className="w-16 h-16 mx-auto mb-4 rounded-full" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <Skeleton className="h-5 w-1/3 mx-auto mb-1" />
            <Skeleton className="h-4 w-1/4 mx-auto" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function StudiosSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex items-center gap-3 p-3 border border-border rounded-lg">
          <Skeleton className="w-12 h-12 rounded-lg" />
          <div className="flex-1">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
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
