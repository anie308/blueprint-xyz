import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorStateProps {
  title: string
  message: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({ title, message, onRetry, className }: ErrorStateProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6 text-center">
        <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" size="sm" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export function FeedError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="Unable to load feed"
      message="We couldn't fetch your personalized feed. Please try again."
      onRetry={onRetry}
    />
  )
}

export function StudiosError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="Unable to load studios"
      message="We couldn't fetch featured studios. Please try again."
      onRetry={onRetry}
      className="mb-4"
    />
  )
}
