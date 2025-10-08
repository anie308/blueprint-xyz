import Link from "next/link"
import { Button } from "./ui/button"

interface StudioCardProps {
  _id?: string
  name: string
  slug: string
  description: string
  members?: Array<any> | number
  posts?: Array<any> | number
  icon: string
  memberCount?: number
  postCount?: number
}

export function StudioCard({ 
  _id, 
  name, 
  slug, 
  description, 
  members, 
  posts, 
  icon, 
  memberCount, 
  postCount 
}: StudioCardProps) {
  // Handle different data structures for members and posts
  const memberCountValue = memberCount || (Array.isArray(members) ? members.length : members) || 0
  const postCountValue = postCount || (Array.isArray(posts) ? posts.length : posts) || 0

  return (
    <div className="border border-border rounded-sm bg-card p-6 hover:border-primary/30 transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-sm bg-secondary flex items-center justify-center text-2xl flex-shrink-0">
          {icon || "🏗️"}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
            <span className="font-mono">{memberCountValue} members</span>
            <span>•</span>
            <span className="font-mono">{postCountValue} posts</span>
          </div>
          <Button asChild size="sm" className="rounded-sm">
            <Link href={`/studios/${slug || _id}`}>Join Studio</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
