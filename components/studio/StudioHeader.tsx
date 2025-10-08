import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Users, MessageSquare, Settings, Crown } from "lucide-react"
import Link from "next/link"

interface StudioHeaderProps {
  studio: any
  isOwner: boolean
}

export function StudioHeader({ studio, isOwner }: StudioHeaderProps) {
  return (
    <Card className="border border-border rounded-sm bg-card overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-sm bg-secondary flex items-center justify-center text-3xl flex-shrink-0">
              {studio?.icon || "🏗️"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{studio?.name}</h1>
                {isOwner && (
                  <Badge variant="secondary" className="gap-1">
                    <Crown className="w-3 h-3" />
                    Owner
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {studio?.description}
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span className="font-mono">{studio?.memberCount || studio?.members?.length || 0} members</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span className="font-mono">{studio?.postCount || 0} posts</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-mono">Created {new Date(studio?.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isOwner ? (
              <Button variant="outline" className="gap-2">
                <Settings className="w-4 h-4" />
                Manage Studio
              </Button>
            ) : (
              <Button className="gap-2">
                <Users className="w-4 h-4" />
                Join Studio
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {studio?.rules && (
        <CardContent className="p-4 border-t border-border">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-sm bg-secondary flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
              📋
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">Studio Rules</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {studio.rules}
              </p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
