"use client"

import { useMemo } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { LinkIcon, MapPinIcon, BriefcaseIcon, GlobeIcon } from "@/components/icons"
import { Mail } from "lucide-react"
import Image from "next/image"
import { useGetMeQuery, useGetProjectsQuery } from "@/lib/store/api"
import { ErrorState } from "@/components/dashboard/ErrorStates"
import { EmptyState } from "@/components/dashboard/EmptyStates"
import { GridIcon } from "lucide-react"
import Link from "next/link"

export default function PortfolioPage() {
  // Get current user
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
    pollingInterval: 300000, // 5 minutes
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  const projectsList = (projectsData as any)?.data || []

  // Transform API project data to ProjectCard props
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

  const isLoading = isUserLoading || isProjectsLoading
  const error = userError || projectsError

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto p-4 md:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
              {/* Left Column - User Profile Info */}
              <div className="lg:sticky lg:top-6 lg:self-start">
                <div className="border border-border rounded-sm p-6 bg-card">
                  {/* Profile Picture */}
                  <div className="mb-6">
                    {isUserLoading ? (
                      <div className="space-y-4">
                        <Skeleton className="w-32 h-32 mx-auto rounded-sm" />
                        <Skeleton className="h-6 w-32 mx-auto" />
                        <Skeleton className="h-4 w-24 mx-auto" />
                      </div>
                    ) : user ? (
                      <>
                        <div className="relative w-32 h-32 mx-auto mb-4">
                          <Image
                            src={user.profilePicture || user.profilePictureUrl || "/placeholder-user.jpg"}
                            alt={user.fullName || user.name || "Profile"}
                            fill
                            className="rounded-sm object-cover"
                          />
                        </div>
                        <h2 className="text-xl font-bold text-center mb-1">{user.fullName || user.name || "User"}</h2>
                        <p className="text-sm text-muted-foreground text-center font-mono">@{user.username}</p>
                        {user.email && (
                          <p className="text-xs text-muted-foreground/70 text-center mt-1">{user.email}</p>
                        )}
                      </>
                    ) : (
                      <div className="text-center text-muted-foreground">No user data</div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
                    {isUserLoading ? (
                      <>
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                        <Skeleton className="h-8 w-full" />
                      </>
                    ) : (
                      <>
                        <div className="text-center">
                          <div className="font-bold text-lg">{projects.length}</div>
                          <div className="text-xs text-muted-foreground">Projects</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">
                            {user?.followers?.length ? (user.followers.length / 1000).toFixed(1) + 'K' : '0'}
                          </div>
                          <div className="text-xs text-muted-foreground">Followers</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-lg">
                            {user?.following?.length || 0}
                          </div>
                          <div className="text-xs text-muted-foreground">Following</div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Bio */}
                  {user?.bio && (
                    <div className="mb-6 pb-6 border-b border-border">
                      <h3 className="text-sm font-semibold mb-2">About</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{user.bio}</p>
                    </div>
                  )}

                  {/* Location */}
                  {user?.location && (
                    <div className="mb-4 flex items-start gap-3">
                      <MapPinIcon className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Location</div>
                        <div className="text-sm text-muted-foreground">{user.location}</div>
                      </div>
                    </div>
                  )}

                  {/* Website */}
                  {user?.website && (
                    <div className="mb-4 flex items-start gap-3">
                      <GlobeIcon className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Website</div>
                        <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                          {user.website.replace(/^https?:\/\//, '')}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  {user?.email && (
                    <div className="mb-4 flex items-start gap-3">
                      <Mail className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Email</div>
                        <a href={`mailto:${user.email}`} className="text-sm text-primary hover:underline">
                          {user.email}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Social Links - Only show if user has social links */}
                  {user?.socialLinks && Array.isArray(user.socialLinks) && user.socialLinks.length > 0 && (
                    <div className="mb-6 pb-6 border-b border-border flex items-start gap-3">
                      <LinkIcon className="w-4 h-4 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="text-sm font-medium mb-2">Social Links</div>
                        <div className="space-y-1">
                          {user.socialLinks.map((link: string, index: number) => (
                            <a 
                              key={index}
                              href={link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline block"
                            >
                              {link.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full rounded-sm bg-transparent" 
                      asChild
                    >
                      <Link href="/dashboard/profile/settings">
                        Edit Profile
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full rounded-sm bg-transparent">
                      Share Portfolio
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column - Projects Grid */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold">Projects</h1>
                  <Button className="rounded-sm" asChild>
                    <a href="/dashboard/create/project">Add Project</a>
                  </Button>
                </div>
                {isProjectsLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
                    title="Unable to load projects"
                    message="We couldn't fetch your projects. Please try again."
                    onRetry={() => refetchProjects()}
                  />
                ) : projects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <ProjectCard key={project.id} {...project} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={GridIcon}
                    title="No projects yet"
                    description="Start showcasing your architectural work by creating your first project"
                    actionText="Create Project"
                    actionHref="/dashboard/create/project"
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
