"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export function CreatePost() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border border-border rounded-sm bg-card p-4">
      <div className="flex gap-3">
        <Avatar className="w-10 h-10 rounded-sm flex-shrink-0">
          <AvatarFallback className="rounded-sm bg-secondary text-foreground">AR</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full text-left px-4 py-3 rounded-sm bg-secondary text-muted-foreground hover:bg-secondary/80 transition-colors"
            >
              Share your thoughts, projects, or questions...
            </button>
          ) : (
            <div className="space-y-3">
              <Input placeholder="Post title" className="font-semibold bg-secondary border-border" />
              <Select>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select a studio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sustainable">Sustainable Housing</SelectItem>
                  <SelectItem value="brutalism">Brutalism Lovers</SelectItem>
                  <SelectItem value="residential">Residential Design</SelectItem>
                  <SelectItem value="commercial">Commercial Projects</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Share your thoughts, add images, or start a discussion..."
                className="min-h-32 bg-secondary border-border resize-none"
              />
              <div className="flex items-center gap-2">
                <Button size="sm" className="rounded-sm">
                  Post
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setIsExpanded(false)}>
                  Cancel
                </Button>
                <div className="flex-1" />
                <Button size="sm" variant="ghost">
                  Add Image
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
