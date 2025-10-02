import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface ConversationCardProps {
  id: string
  name: string
  username: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread?: boolean
  online?: boolean
}

export function ConversationCard({
  id,
  name,
  username,
  avatar,
  lastMessage,
  timestamp,
  unread = false,
  online = false,
}: ConversationCardProps) {
  return (
    <Link
      href={`/messages/${username}`}
      className="flex items-start gap-3 p-4 hover:bg-secondary/50 transition-colors border-b border-border"
    >
      <div className="relative">
        <Avatar className="w-12 h-12 rounded-sm border border-border">
          <AvatarImage src={avatar || "/placeholder.svg"} />
          <AvatarFallback className="rounded-sm bg-secondary text-foreground">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        {online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full" />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2 mb-1">
          <h3 className={cn("font-semibold truncate", unread && "text-primary")}>{name}</h3>
          <span className="text-xs text-muted-foreground font-mono flex-shrink-0">{timestamp}</span>
        </div>
        <p className={cn("text-sm truncate", unread ? "text-foreground font-medium" : "text-muted-foreground")}>
          {lastMessage}
        </p>
      </div>

      {unread && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />}
    </Link>
  )
}
