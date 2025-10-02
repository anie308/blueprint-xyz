"use client"

import { useState } from "react"
import { MessageIcon, BookmarkIcon } from "./icons"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import Image from "next/image"

interface PostCardProps {
  id: string
  author: {
    name: string
    username: string
    avatar?: string
  }
  studio: string
  title: string
  content?: string
  image?: string
  appreciations: number
  comments: number
  timestamp: string
}

export function PostCard({
  author,
  studio,
  title,
  content,
  image,
  appreciations: initialAppreciations,
  comments,
  timestamp,
}: PostCardProps) {
  const [appreciations, setAppreciations] = useState(initialAppreciations)
  const [isAppreciated, setIsAppreciated] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleAppreciate = () => {
    if (isAppreciated) {
      setAppreciations(appreciations - 1)
      setIsAppreciated(false)
    } else {
      setAppreciations(appreciations + 1)
      setIsAppreciated(true)
    }
  }

  return (
    <article className="border border-border rounded-sm bg-card overflow-hidden hover:border-primary/30 transition-colors">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <Avatar className="w-10 h-10 rounded-sm">
          <AvatarImage src={author.avatar || "/placeholder.svg"} />
          <AvatarFallback className="rounded-sm bg-secondary text-foreground">
            {author.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm truncate">{author.name}</span>
            <Badge variant="secondary" className="text-xs font-mono rounded-sm">
              {studio}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>@{author.username}</span>
            <span>•</span>
            <span>{timestamp}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-balance">{title}</h3>
        {content && <p className="text-muted-foreground leading-relaxed mb-4">{content}</p>}
        {image && (
          <div className="relative w-full aspect-video rounded-sm overflow-hidden border border-border">
            <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 px-4 pb-4 border-t border-border pt-3">
        <Button variant="ghost" size="sm" onClick={handleAppreciate} className={isAppreciated ? "text-accent" : ""}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isAppreciated ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="w-5 h-5 mr-2"
          >
            <path d="M7 10v12" />
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
          </svg>
          <span className="font-medium">{appreciations}</span>
        </Button>

        <Button variant="ghost" size="sm">
          <MessageIcon className="w-5 h-5 mr-2" />
          <span className="font-medium">{comments}</span>
        </Button>

        <div className="flex-1" />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSaved(!isSaved)}
          className={isSaved ? "text-primary" : ""}
        >
          <BookmarkIcon className="w-5 h-5" />
        </Button>
      </div>
    </article>
  )
}
