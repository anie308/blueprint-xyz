"use client"

import { useState, useMemo } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { PostCard } from "@/components/post-card"
import { ProjectCard } from "@/components/project-card"
import { ReelCard } from "@/components/reel-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { BookmarkIcon } from "@/components/icons"
import { useGetSavedItemsQuery } from "@/lib/store/api"
import { useGetProjectsQuery, useGetPostsQuery, useGetReelsQuery } from "@/lib/store/api"
import { ErrorState } from "@/components/dashboard/ErrorStates"
import { EmptyState } from "@/components/dashboard/EmptyStates"
import { formatDistanceToNow } from "date-fns"

export default function SavedPage() {
  const [activeTab, setActiveTab] = useState<"posts" | "projects" | "reels">("posts")

  // Fetch saved items from API
  const {
    data: savedData,
    isLoading: isSavedLoading,
    error: savedError,
    refetch: refetchSaved
  } = useGetSavedItemsQuery({
    page: 1,
    limit: 100
  }, {
    pollingInterval: 300000, // 5 minutes
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  const savedItems = (savedData as any)?.data || []

  // Separate saved items by type
  const savedPosts = savedItems.filter((item: any) => item.entityType === 'Post')
  const savedProjects = savedItems.filter((item: any) => item.entityType === 'Project')
  const savedReels = savedItems.filter((item: any) => item.entityType === 'Reel')

  // Fetch actual post/project/reel data for saved items
  // Note: This is a simplified approach. In production, you might want to fetch all at once
  const postIds = savedPosts.map((item: any) => item.entityId)
  const projectIds = savedProjects.map((item: any) => item.entityId)
  const reelIds = savedReels.map((item: any) => item.entityId)

  // For now, we'll use the saved items data directly
  // In a real implementation, you'd fetch the full entity data
  const isLoading = isSavedLoading
  const error = savedError

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-6xl mx-auto p-4 md:p-6">
            <div className="flex items-center gap-3 mb-8">
              <BookmarkIcon className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-balance">Saved</h1>
                <p className="text-muted-foreground leading-relaxed">
                  Your bookmarked posts, projects, and inspiration
                </p>
              </div>
            </div>

            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto mb-6">
                <TabsTrigger
                  value="posts"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Posts
                </TabsTrigger>
                <TabsTrigger
                  value="projects"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="reels"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Reels
                </TabsTrigger>
              </TabsList>

              <TabsContent value="posts">
                {isLoading ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="border border-border rounded-sm p-6">
                        <div className="flex items-start gap-4">
                          <Skeleton className="w-12 h-12 rounded-full" />
                          <div className="flex-1 space-y-3">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <ErrorState
                    title="Unable to load saved posts"
                    message="We couldn't fetch your saved posts. Please try again."
                    onRetry={() => refetchSaved()}
                  />
                ) : savedPosts.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {savedPosts.length} saved {savedPosts.length === 1 ? 'post' : 'posts'}
                    </p>
                    {/* Note: You'll need to fetch full post data using postIds */}
                    <EmptyState
                      icon={BookmarkIcon}
                      title="Saved posts"
                      description="Fetching saved post details..."
                    />
                  </div>
                ) : (
                  <EmptyState
                    icon={BookmarkIcon}
                    title="No saved posts"
                    description="Save posts you want to revisit later"
                  />
                )}
              </TabsContent>

              <TabsContent value="projects">
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="border border-border rounded-sm overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <div className="p-4 space-y-2">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <ErrorState
                    title="Unable to load saved projects"
                    message="We couldn't fetch your saved projects. Please try again."
                    onRetry={() => refetchSaved()}
                  />
                ) : savedProjects.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {savedProjects.length} saved {savedProjects.length === 1 ? 'project' : 'projects'}
                    </p>
                    {/* Note: You'll need to fetch full project data using projectIds */}
                    <EmptyState
                      icon={BookmarkIcon}
                      title="Saved projects"
                      description="Fetching saved project details..."
                    />
                  </div>
                ) : (
                  <EmptyState
                    icon={BookmarkIcon}
                    title="No saved projects"
                    description="Save projects you want to revisit later"
                  />
                )}
              </TabsContent>

              <TabsContent value="reels">
                {isLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <Skeleton key={i} className="aspect-[9/16] w-full rounded-sm" />
                    ))}
                  </div>
                ) : error ? (
                  <ErrorState
                    title="Unable to load saved reels"
                    message="We couldn't fetch your saved reels. Please try again."
                    onRetry={() => refetchSaved()}
                  />
                ) : savedReels.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {savedReels.length} saved {savedReels.length === 1 ? 'reel' : 'reels'}
                    </p>
                    {/* Note: You'll need to fetch full reel data using reelIds */}
                    <EmptyState
                      icon={BookmarkIcon}
                      title="Saved reels"
                      description="Fetching saved reel details..."
                    />
                  </div>
                ) : (
                  <EmptyState
                    icon={BookmarkIcon}
                    title="No saved reels"
                    description="Save reels you want to revisit later"
                  />
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
