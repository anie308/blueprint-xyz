import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Users, TrendingUp, Plus } from "lucide-react"
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
      <CardContent className="p-6 text-center">
        <Icon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        {actionText && actionHref && (
          <Link href={actionHref}>
            <Button size="sm">{actionText}</Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}

export function FeedEmpty({ filter }: { filter: string }) {
  const getEmptyContent = () => {
    switch (filter) {
      case 'trending':
        return {
          icon: TrendingUp,
          title: "No trending content",
          description: "Be the first to create engaging content that gets trending.",
          actionText: "Create Post",
          actionHref: "/dashboard/create/post"
        }
      case 'latest':
        return {
          icon: FileText,
          title: "No recent posts",
          description: "Start sharing your architectural insights with the community.",
          actionText: "Create Post",
          actionHref: "/dashboard/create/post"
        }
      case 'following':
        return {
          icon: Users,
          title: "No posts from followed users",
          description: "Follow some architects to see their latest posts in your feed.",
          actionText: "Discover Architects",
          actionHref: "/dashboard/trending"
        }
      default:
        return {
          icon: FileText,
          title: "No posts yet",
          description: "Start sharing your architectural work with the community.",
          actionText: "Create Post",
          actionHref: "/dashboard/create/post"
        }
    }
  }

  const content = getEmptyContent()
  
  return <EmptyState {...content} />
}

export function StudiosEmpty() {
  return (
    <EmptyState
      icon={Users}
      title="No featured studios"
      description="Join some studios to see them here, or create your own studio."
      actionText="Browse Studios"
      actionHref="/dashboard/studios"
      className="mb-4"
    />
  )
}
