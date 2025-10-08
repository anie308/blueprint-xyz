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
      <CardContent className="p-8 text-center">
        <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export function StudioError({ onRetry }: { onRetry?: () => void }) {
  return (
    <ErrorState
      title="Unable to load studio"
      message="We couldn't fetch the studio data. Please try again."
      onRetry={onRetry}
    />
  )
}
