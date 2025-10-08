import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function StudioHeaderSkeleton() {
  return (
    <Card className="border border-border rounded-sm bg-card overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Skeleton className="w-16 h-16 rounded-sm" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex items-center gap-6">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </Card>
  )
}

export function StudioTabsSkeleton() {
  return (
    <div className="flex items-center gap-1 border-b border-border">
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="h-10 w-24" />
      ))}
    </div>
  )
}

export function StudioPostsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      
      <div className="flex gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-40" />
      </div>
      
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="border border-border rounded-sm bg-card">
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <Skeleton className="w-10 h-10 rounded-sm" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="p-4 space-y-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="flex items-center gap-1 px-4 pb-4 border-t border-border pt-3">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-16" />
              <div className="flex-1" />
              <Skeleton className="h-8 w-8" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function StudioMembersSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      
      <div className="flex gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-40" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="border border-border rounded-sm bg-card">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="w-12 h-12 rounded-sm" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                  <div className="flex gap-4">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="w-8 h-8" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function StudioJobsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      
      <div className="flex gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-32" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border border-border rounded-sm bg-card">
            <CardHeader className="pb-3">
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-12" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-28" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-8 w-24" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function StudioProjectsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      
      <div className="flex gap-4">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-40" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="border border-border rounded-sm bg-card">
            <Skeleton className="aspect-video w-full" />
            <CardContent className="p-4">
              <div className="space-y-2 mb-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
              <div className="flex gap-1 mb-3">
                <Skeleton className="h-5 w-12" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-14" />
              </div>
              <div className="flex gap-4 mb-3">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="flex gap-4 mb-4">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-3 w-12" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export function StudioSkeleton() {
  return (
    <div className="space-y-6">
      <StudioHeaderSkeleton />
      <StudioTabsSkeleton />
      <StudioPostsSkeleton />
    </div>
  )
}
