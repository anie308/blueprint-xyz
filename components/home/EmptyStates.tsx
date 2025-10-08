import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  actionText?: string
  actionHref?: string
  className?: string
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  actionText, 
  actionHref, 
  className 
}: EmptyStateProps) {
  return (
    <Card className={className}>
      <CardContent className="p-8 text-center">
        <Icon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        {actionText && actionHref && (
          <Link href={actionHref}>
            <Button>{actionText}</Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}

export function ProjectGalleryEmpty() {
  return (
    <EmptyState
      icon={FileText}
      title="No projects yet"
      description="Be the first to share your architectural work with the community."
      actionText="Share Your Project"
      actionHref="/dashboard/create/project"
      className="col-span-full"
    />
  )
}

export function TestimonialsEmpty() {
  return (
    <EmptyState
      icon={Users}
      title="No testimonials yet"
      description="Join the community and share your experience with Blueprint.xyz."
      actionText="Join Community"
      actionHref="/auth/signup"
      className="col-span-full"
    />
  )
}

export function TrendingEmpty() {
  return (
    <EmptyState
      icon={TrendingUp}
      title="No trending content"
      description="Start creating content to see what's trending in the community."
      actionText="Create Content"
      actionHref="/dashboard/create"
      className="col-span-full"
    />
  )
}
