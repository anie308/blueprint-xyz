import { Button } from "@/components/ui/button"
import { CrownIcon } from "@/components/icons"
import Link from "next/link"

interface SubscriptionLimitBannerProps {
  messagesUsed: number
  messagesLimit: number
}

export function SubscriptionLimitBanner({ messagesUsed, messagesLimit }: SubscriptionLimitBannerProps) {
  const isNearLimit = messagesUsed >= messagesLimit * 0.8
  const isAtLimit = messagesUsed >= messagesLimit

  if (!isNearLimit) return null

  return (
    <div className="border border-accent bg-accent/10 rounded-sm p-4 mb-4">
      <div className="flex items-start gap-3">
        <CrownIcon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{isAtLimit ? "Message Limit Reached" : "Approaching Message Limit"}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {isAtLimit
              ? `You've used all ${messagesLimit} messages this month. Upgrade to Blueprint Pro for unlimited messaging.`
              : `You've used ${messagesUsed} of ${messagesLimit} messages this month. Upgrade for unlimited access.`}
          </p>
          <Button asChild size="sm" className="rounded-sm bg-accent hover:bg-accent/90">
            <Link href="/pricing">
              <CrownIcon className="w-4 h-4 mr-2" />
              Upgrade to Pro
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
