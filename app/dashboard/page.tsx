"use client"

import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { CreatePost } from "@/components/create-post"
import { PostCard } from "@/components/post-card"
import { StudioCard } from "@/components/studio-card"
import { Button } from "@/components/ui/button"
import { TrendingIcon } from "@/components/icons"
import { useDashboardData } from "@/lib/hooks/useDashboardData"
import { FeedSkeleton, StudiosSkeleton, StatsSkeleton } from "@/components/dashboard/LoadingStates"
import { FeedError, StudiosError } from "@/components/dashboard/ErrorStates"
import { FeedEmpty, StudiosEmpty } from "@/components/dashboard/EmptyStates"

export default function DashboardPage() {
  const {
    displayContent,
    featuredStudios,
    activeFilter,
    isLoading,
    hasError,
    errors,
    isEmpty,
    refetchFeed,
    refetchStudios,
    changeFilter
  } = useDashboardData()

  console.log(displayContent, "displayContent")
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-6xl mx-auto p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                <CreatePost />

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 border-b border-border">
                <Button 
                    variant="ghost" 
                    className={`rounded-none ${activeFilter === 'latest' ? 'border-b-2 border-primary' : ''}`}
                    onClick={() => changeFilter('latest')}
                  >
                    Latest
                  </Button>
                  <Button 
                    variant="ghost" 
                    className={`rounded-none ${activeFilter === 'trending' ? 'border-b-2 border-primary' : ''}`}
                    onClick={() => changeFilter('trending')}
                  >
                    <TrendingIcon className="w-4 h-4 mr-2" />
                    Trending
                  </Button>
                 
                  <Button 
                    variant="ghost" 
                    className={`rounded-none ${activeFilter === 'following' ? 'border-b-2 border-primary' : ''}`}
                    onClick={() => changeFilter('following')}
                  >
                    Following
                  </Button>
                </div>

                {/* Posts */}
                <div className="space-y-4">
                  {isLoading ? (
                    <FeedSkeleton />
                  ) : errors.feed || errors.posts ? (
                    <FeedError onRetry={refetchFeed} />
                  ) : isEmpty ? (
                    <FeedEmpty filter={activeFilter} />
                  ) : (
                    displayContent.map((post: any) => (
                      <PostCard key={post._id} {...post} />
                    ))
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Featured Studios */}
                <div className="border border-border rounded-sm bg-card p-4">
                  <h2 className="font-bold text-lg mb-4">Featured Studios</h2>
                  {isLoading ? (
                    <StudiosSkeleton />
                  ) : errors.studios ? (
                    <StudiosError onRetry={refetchStudios} />
                  ) : featuredStudios.length === 0 ? (
                    <StudiosEmpty />
                  ) : (
                    <div className="space-y-4">
                      {featuredStudios.map((studio: any) => (
                        <StudioCard key={studio._id} {...studio} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="border border-border rounded-sm bg-card p-4">
                  <h2 className="font-bold text-lg mb-4">Community Stats</h2>
                  {isLoading ? (
                    <StatsSkeleton />
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Members</span>
                        <span className="font-mono font-semibold">47,892</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Active Studios</span>
                        <span className="font-mono font-semibold">156</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Posts Today</span>
                        <span className="font-mono font-semibold">1,234</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
