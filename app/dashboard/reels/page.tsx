"use client"

import { useState, useEffect, useMemo } from "react"
import { ReelCard } from "@/components/reel-card"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { SearchIcon } from "@/components/icons"
import { useGetReelsQuery } from "@/lib/store/api"
import { ErrorState } from "@/components/dashboard/ErrorStates"
import { EmptyState } from "@/components/dashboard/EmptyStates"
import { PlayIcon } from "lucide-react"

export default function ReelsPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [page, setPage] = useState(1)

  // Fetch reels from API
  const {
    data: reelsData,
    isLoading,
    error,
    refetch
  } = useGetReelsQuery({
    page,
    limit: 20,
    sort: 'newest'
  }, {
    pollingInterval: 300000, // 5 minutes
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  const reelsList = (reelsData as any)?.data || []

  // Transform API reel data to ReelCard props
  const reels = useMemo(() => {
    return reelsList.map((reel: any) => {
      const author = reel.author || {}
      const authorName = typeof author === 'string' 
        ? 'User' 
        : author.fullName || author.name || 'User'
      const authorUsername = typeof author === 'string'
        ? 'user'
        : author.username || 'user'
      const authorAvatar = typeof author === 'string'
        ? undefined
        : author.profilePicture || author.profilePictureUrl || author.avatar

      return {
        id: reel._id || reel.id,
        author: {
          name: authorName,
          username: authorUsername,
          avatar: authorAvatar,
        },
        title: reel.title || reel.caption || 'Untitled Reel',
        description: reel.description || reel.caption || '',
        videoUrl: reel.videoUrl || '',
        thumbnail: reel.thumbnailUrl || reel.thumbnail || '/placeholder.svg',
        likes: Array.isArray(reel.likes) ? reel.likes.length : reel.likes || 0,
        comments: Array.isArray(reel.comments) ? reel.comments.length : reel.comments || 0,
      }
    })
  }, [reelsList])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const newIndex = Math.round(scrollPosition / windowHeight)
      setActiveIndex(newIndex)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between h-16 px-4">
          <h1 className="text-xl font-bold text-white">Reels</h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <SearchIcon className="w-5 h-5" />
          </Button>
        </div>
      </header>

      {/* Reels Container */}
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <div className="space-y-4 w-full max-w-md">
            <Skeleton className="h-[600px] w-full rounded-sm" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
        </div>
      ) : error ? (
        <div className="h-screen flex items-center justify-center p-4">
          <ErrorState
            title="Unable to load reels"
            message="We couldn't fetch the reels. Please try again."
            onRetry={() => refetch()}
          />
        </div>
      ) : reels.length > 0 ? (
        <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
          {reels.map((reel, index) => (
            <div key={reel.id} className="h-screen w-full">
              <ReelCard {...reel} isActive={index === activeIndex} />
            </div>
          ))}
          {(reelsData as any)?.pagination?.hasNext && (
            <div className="h-screen flex items-center justify-center">
              <Button
                variant="outline"
                onClick={() => setPage(prev => prev + 1)}
                className="bg-black/50 text-white border-white/20"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="h-screen flex items-center justify-center p-4">
          <EmptyState
            icon={PlayIcon}
            title="No reels yet"
            description="Start sharing your architectural work in video format"
          />
        </div>
      )}

      <MobileNav />
    </div>
  )
}
