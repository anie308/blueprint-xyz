"use client"

import { useMemo } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectCard } from "@/components/project-card"
import { PostCard } from "@/components/post-card"
import { GridIcon, ReelsIcon, MessageIcon } from "@/components/icons"
import Link from "next/link"
import Image from "next/image"
import { useGetMeQuery, useGetProjectsQuery, useGetPostsQuery, useGetReelsQuery } from "@/lib/store/api"
import { ErrorState } from "@/components/dashboard/ErrorStates"
import { EmptyState } from "@/components/dashboard/EmptyStates"
import { formatDistanceToNow } from "date-fns"

export default function ProfilePage() {
  // Get current user (profile page shows current user's profile)
  const { data: userData, isLoading: isUserLoading, error: userError } = useGetMeQuery()

  const user = (userData as any)?.data

  // Fetch user's projects
  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    error: projectsError,
    refetch: refetchProjects
  } = useGetProjectsQuery({
    page: 1,
    limit: 50,
    authorId: user?._id || user?.id
  }, {
    skip: !user?._id && !user?.id,
    pollingInterval: 300000,
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  // Fetch user's posts
  const {
    data: postsData,
    isLoading: isPostsLoading,
    error: postsError,
    refetch: refetchPosts
  } = useGetPostsQuery({
    page: 1,
    limit: 20,
    authorId: user?._id || user?.id
  }, {
    skip: !user?._id && !user?.id,
    pollingInterval: 300000,
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  // Fetch user's reels
  const {
    data: reelsData,
    isLoading: isReelsLoading,
    error: reelsError
  } = useGetReelsQuery({
    page: 1,
    limit: 20,
    authorId: user?._id || user?.id
  }, {
    skip: !user?._id && !user?.id,
    pollingInterval: 300000,
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  const projectsList = (projectsData as any)?.data || []
  const postsList = (postsData as any)?.data || []
  const reelsList = (reelsData as any)?.data || []

  // Transform data
  const projects = useMemo(() => {
    return projectsList.map((project: any) => ({
      id: project._id || project.id,
      title: project.title,
      category: project.tags?.[0] || project.category || 'Architecture',
      thumbnail: project.images?.[0] || project.thumbnail || '/placeholder.svg',
      likes: Array.isArray(project.likes) ? project.likes.length : project.likes || 0,
      views: project.views || 0,
    }))
  }, [projectsList])

  const posts = useMemo(() => {
    return postsList.map((post: any) => {
      const authorData = post.authorId || post.author || user || {}
      const authorId = typeof authorData === 'object' && authorData !== null
        ? {
            fullName: authorData.fullName || authorData.name || 'User',
            username: authorData.username || 'user',
            profilePictureUrl: authorData.profilePictureUrl || authorData.profilePicture || null,
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
        appreciations: post.likesCount || (Array.isArray(post.likes) ? post.likes.length : post.likes || 0),
        comments: post.commentsCount || (Array.isArray(post.comments) ? post.comments.length : post.comments || 0),
        createdAt: post.createdAt,
        timestamp: post.createdAt
          ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
          : 'Recently',
        likes: Array.isArray(post.likes) ? post.likes : [],
      }
    })
  }, [postsList, user])

  const isLoading = isUserLoading || isProjectsLoading || isPostsLoading || isReelsLoading
  const error = userError || projectsError || postsError || reelsError

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          {/* Profile Header */}
          <div className="border-b border-border bg-card">
            <div className="max-w-6xl mx-auto p-4 md:p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {isUserLoading ? (
                  <div className="flex flex-col md:flex-row gap-6 w-full">
                    <Skeleton className="w-32 h-32 rounded-sm" />
                    <div className="flex-1 space-y-4">
                      <Skeleton className="h-8 w-48" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-20 w-full" />
                      <Skeleton className="h-6 w-64" />
                    </div>
                  </div>
                ) : user ? (
                  <>
                    <Avatar className="w-32 h-32 rounded-sm border-2 border-border">
                      <AvatarImage src={user.profilePicture || user.profilePictureUrl || "/placeholder-user.jpg"} />
                      <AvatarFallback className="rounded-sm bg-secondary text-foreground text-3xl">
                        {(user.fullName || user.name || 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                        <div>
                          <h1 className="text-2xl font-bold mb-1">{user.fullName || user.name || "User"}</h1>
                          <p className="text-muted-foreground font-mono">@{user.username}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="rounded-sm bg-transparent" asChild>
                            <Link href="/dashboard/profile/settings">
                              Edit Profile
                            </Link>
                          </Button>
                          <Button variant="outline" className="rounded-sm bg-transparent">
                            Share
                          </Button>
                        </div>
                      </div>

                      {user.bio && (
                        <p className="text-foreground leading-relaxed mb-4 max-w-2xl">{user.bio}</p>
                      )}

                      <div className="flex flex-wrap gap-6 text-sm">
                        <div>
                          <span className="font-bold font-mono">{projects.length}</span>
                          <span className="text-muted-foreground ml-1">Projects</span>
                        </div>
                        <div>
                          <span className="font-bold font-mono">
                            {user.followers?.length ? (user.followers.length / 1000).toFixed(1) + 'K' : '0'}
                          </span>
                          <span className="text-muted-foreground ml-1">Followers</span>
                        </div>
                        <div>
                          <span className="font-bold font-mono">{user.following?.length || 0}</span>
                          <span className="text-muted-foreground ml-1">Following</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <ErrorState
                    title="Unable to load profile"
                    message="We couldn't fetch your profile data. Please try again."
                    onRetry={() => window.location.reload()}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="max-w-6xl mx-auto p-4 md:p-6">
            <Tabs defaultValue="projects" className="w-full">
              <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="projects"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  <GridIcon className="w-4 h-4 mr-2" />
                  Projects
                </TabsTrigger>
                <TabsTrigger
                  value="reels"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  <ReelsIcon className="w-4 h-4 mr-2" />
                  Reels
                </TabsTrigger>
                <TabsTrigger
                  value="posts"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  Posts
                </TabsTrigger>
                <TabsTrigger
                  value="about"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  About
                </TabsTrigger>
              </TabsList>

              <TabsContent value="projects" className="mt-6">
                {isProjectsLoading ? (
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
                ) : projectsError ? (
                  <ErrorState
                    title="Unable to load projects"
                    message="We couldn't fetch your projects. Please try again."
                    onRetry={() => refetchProjects()}
                  />
                ) : projects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <ProjectCard key={project.id} {...project} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={GridIcon}
                    title="No projects yet"
                    description="Start showcasing your architectural work"
                    actionText="Create Project"
                    actionHref="/dashboard/create/project"
                  />
                )}
              </TabsContent>

              <TabsContent value="reels" className="mt-6">
                {isReelsLoading ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <Skeleton key={i} className="aspect-[9/16] w-full rounded-sm" />
                    ))}
                  </div>
                ) : reelsError ? (
                  <ErrorState
                    title="Unable to load reels"
                    message="We couldn't fetch your reels. Please try again."
                  />
                ) : reelsList.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {reelsList.map((reel: any) => (
                      <div
                        key={reel._id || reel.id}
                        className="relative aspect-[9/16] rounded-sm overflow-hidden border border-border bg-secondary"
                      >
                        <Image
                          src={reel.thumbnailUrl || reel.thumbnail || '/placeholder.svg'}
                          alt={reel.title || 'Reel'}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-2 left-2 text-white text-xs font-mono bg-black/50 px-2 py-1 rounded-sm">
                          {reel.views || 0} views
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={ReelsIcon}
                    title="No reels yet"
                    description="Start sharing your architectural work in video format"
                  />
                )}
              </TabsContent>

              <TabsContent value="posts" className="mt-6">
                {isPostsLoading ? (
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
                ) : postsError ? (
                  <ErrorState
                    title="Unable to load posts"
                    message="We couldn't fetch your posts. Please try again."
                    onRetry={() => refetchPosts()}
                  />
                ) : posts.length > 0 ? (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <PostCard 
                        key={post._id || post.id} 
                        {...post} 
                        onDeleted={refetchPosts}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={MessageIcon}
                    title="No posts yet"
                    description="Start sharing your architectural insights"
                    actionText="Create Post"
                    actionHref="/dashboard/create/post"
                  />
                )}
              </TabsContent>

              <TabsContent value="about" className="mt-6">
                <div className="max-w-3xl space-y-6">
                  <div className="border border-border rounded-sm bg-card p-6">
                    <h3 className="font-bold text-lg mb-4">About</h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Location</span>
                        <p className="font-medium">Portland, Oregon, USA</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Education</span>
                        <p className="font-medium">M.Arch, University of Oregon</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Certifications</span>
                        <p className="font-medium">LEED AP BD+C, Passive House Designer</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Specializations</span>
                        <p className="font-medium">Sustainable Design, Biophilic Architecture, Passive House</p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-border rounded-sm bg-card p-6">
                    <h3 className="font-bold text-lg mb-4">Experience</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold">Senior Architect</p>
                        <p className="text-sm text-muted-foreground">Green Space Architecture • 2020 - Present</p>
                      </div>
                      <div>
                        <p className="font-semibold">Project Architect</p>
                        <p className="text-sm text-muted-foreground">Sustainable Design Studio • 2017 - 2020</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
