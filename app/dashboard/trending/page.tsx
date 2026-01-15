"use client"

import { useState, useMemo } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { TrendingIcon } from "@/components/icons"
import { useGetTrendingQuery } from "@/lib/store/api"
import { ErrorState } from "@/components/dashboard/ErrorStates"
import { EmptyState } from "@/components/dashboard/EmptyStates"
import { formatDistanceToNow } from "date-fns"

export default function TrendingPage() {
  const [timeFilter, setTimeFilter] = useState<"week" | "month" | "all">("week")

  // Fetch trending content from API
  const {
    data: trendingData,
    isLoading,
    error,
    refetch
  } = useGetTrendingQuery({
    page: 1,
    limit: 20
  }, {
    pollingInterval: 300000, // 5 minutes
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  const trendingList = (trendingData as any)?.data || []

  // Filter to only posts for now (trending can include projects/reels too)
  const trendingPosts = useMemo(() => {
    return trendingList
      .filter((item: any) => item.entityType === 'Post' || item.type === 'Post' || !item.entityType)
      .map((item: any) => {
        const post = item.entityType ? item : item // Handle different response formats
        const authorData = post.authorId || post.author || {}
        const authorId = typeof authorData === 'object' && authorData !== null
          ? {
              fullName: authorData.fullName || authorData.name || 'User',
              username: authorData.username || 'user',
              profilePictureUrl: authorData.profilePictureUrl || authorData.profilePicture || authorData.avatar || null,
              _id: authorData._id || authorData.id,
              id: authorData._id || authorData.id,
            }
          : null

        const studioIdData = post.studioId || post.studio || {}
        const studioName = typeof studioIdData === 'object' && studioIdData !== null
          ? studioIdData.name || studioIdData
          : studioIdData || 'General'

        return {
          _id: post._id || post.id,
          id: post._id || post.id,
          authorId: authorId,
          author: post.author,
          studioId: studioIdData,
          studio: studioName,
          title: post.title,
          content: post.content || post.description || '',
          mediaUrl: post.mediaUrl,
          image: post.images?.[0] || post.image,
          images: post.images,
          appreciations: post.likesCount || (Array.isArray(post.likes) ? post.likes.length : post.likes || post.appreciations || 0),
          comments: post.commentsCount || (Array.isArray(post.comments) ? post.comments.length : post.comments || 0),
          createdAt: post.createdAt,
          timestamp: post.createdAt
            ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
            : 'Recently',
          likes: Array.isArray(post.likes) ? post.likes : [],
        }
      })
  }, [trendingList])

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-4xl mx-auto p-4 md:p-6">
            <div className="flex items-center gap-3 mb-8">
              <TrendingIcon className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-balance">Trending</h1>
                <p className="text-muted-foreground leading-relaxed">
                  The most appreciated posts from the community this week
                </p>
              </div>
            </div>

            {/* Time Filter */}
            <div className="flex items-center gap-2 mb-6 border-b border-border pb-4">
              <Button
                variant={timeFilter === "week" ? "default" : "ghost"}
                size="sm"
                className="rounded-sm"
                onClick={() => setTimeFilter("week")}
              >
                This Week
              </Button>
              <Button
                variant={timeFilter === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeFilter("month")}
              >
                This Month
              </Button>
              <Button
                variant={timeFilter === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setTimeFilter("all")}
              >
                All Time
              </Button>
            </div>

            {/* Trending Posts */}
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-12 top-4 hidden md:flex items-center justify-center w-8 h-8 rounded-sm bg-accent text-accent-foreground font-bold text-sm">
                      {i + 1}
                    </div>
                    <div className="border border-border rounded-sm p-6">
                      <div className="flex items-start gap-4">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div className="flex-1 space-y-3">
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <ErrorState
                title="Unable to load trending content"
                message="We couldn't fetch trending posts. Please try again."
                onRetry={() => refetch()}
              />
            ) : trendingPosts.length > 0 ? (
              <div className="space-y-4">
                {trendingPosts.map((post, index) => (
                  <div key={post.id} className="relative">
                    <div className="absolute -left-12 top-4 hidden md:flex items-center justify-center w-8 h-8 rounded-sm bg-accent text-accent-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                    <PostCard {...post} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={TrendingIcon}
                title="No trending content"
                description="Be the first to create engaging content that gets trending"
              />
            )}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
