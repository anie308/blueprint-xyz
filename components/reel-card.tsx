"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { MessageIcon, BookmarkIcon } from "./icons"
import { cn } from "@/lib/utils"

interface ReelCardProps {
  id: string
  author: {
    name: string
    username: string
    avatar?: string
  }
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  likes: number
  comments: number
  isActive?: boolean
}

export function ReelCard({
  author,
  title,
  description,
  thumbnail,
  likes: initialLikes,
  comments,
  isActive = false,
}: ReelCardProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1)
      setIsLiked(false)
    } else {
      setLikes(likes + 1)
      setIsLiked(true)
    }
  }

  return (
    <div className="relative w-full h-full snap-start snap-always">
      {/* Video Container */}
      <div className="relative w-full h-full bg-black rounded-sm overflow-hidden">
        {/* Placeholder for video - in production this would be a video element */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${thumbnail})` }}>
          {/* Blueprint grid overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div
            className={cn("absolute inset-0 transition-opacity duration-300", isActive ? "opacity-100" : "opacity-0")}
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(30, 77, 139, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 77, 139, 0.1) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
          <div className="flex gap-4">
            {/* Left side - Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-10 h-10 rounded-sm border-2 border-white">
                  <AvatarImage src={author.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="rounded-sm bg-primary text-primary-foreground">
                    {author.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-white text-sm">{author.name}</p>
                  <p className="text-white/80 text-xs">@{author.username}</p>
                </div>
                <Button size="sm" variant="secondary" className="ml-2 rounded-sm">
                  Follow
                </Button>
              </div>

              <h3 className="font-bold text-white text-lg mb-2 text-balance">{title}</h3>
              <p className="text-white/90 text-sm leading-relaxed line-clamp-2">{description}</p>
            </div>

            {/* Right side - Actions */}
            <div className="flex flex-col items-center gap-4 flex-shrink-0">
              <button
                onClick={handleLike}
                className="flex flex-col items-center gap-1 transition-transform hover:scale-110"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-sm flex items-center justify-center transition-colors",
                    isLiked ? "bg-accent text-white" : "bg-white/20 backdrop-blur-sm text-white",
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={isLiked ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="square"
                    strokeLinejoin="miter"
                    className="w-6 h-6"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <span className="text-white text-xs font-semibold font-mono">{likes}</span>
              </button>

              <button className="flex flex-col items-center gap-1 transition-transform hover:scale-110">
                <div className="w-12 h-12 rounded-sm bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                  <MessageIcon className="w-6 h-6" />
                </div>
                <span className="text-white text-xs font-semibold font-mono">{comments}</span>
              </button>

              <button
                onClick={() => setIsSaved(!isSaved)}
                className="flex flex-col items-center gap-1 transition-transform hover:scale-110"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-sm flex items-center justify-center transition-colors",
                    isSaved ? "bg-primary text-white" : "bg-white/20 backdrop-blur-sm text-white",
                  )}
                >
                  <BookmarkIcon className="w-6 h-6" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
