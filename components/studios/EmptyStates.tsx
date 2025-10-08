import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Search } from "lucide-react"
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

export function StudiosEmpty({ searchQuery }: { searchQuery: string }) {
  if (searchQuery) {
    return (
      <EmptyState
        icon={Search}
        title="No studios found"
        description={`No studios match "${searchQuery}". Try a different search term.`}
        className="col-span-full"
      />
    )
  }

  return (
    <EmptyState
      icon={Users}
      title="No studios yet"
      description="Be the first to create a studio and start building a community around your architectural interests."
      actionText="Create Studio"
      actionHref="/dashboard/create/studio"
      className="col-span-full"
    />
  )
}
