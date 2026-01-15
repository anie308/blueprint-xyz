

"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { StudioHeader } from "@/components/studio/StudioHeader"
import { StudioTabs } from "@/components/studio/StudioTabs"
import { StudioPosts } from "@/components/studio/StudioPosts"
import { StudioMembers } from "@/components/studio/StudioMembers"
import { StudioJobs } from "@/components/studio/StudioJobs"
import { StudioProjects } from "@/components/studio/StudioProjects"
import { StudioSettings } from "@/components/studio/StudioSettings"
import { useStudioData } from "@/lib/hooks/useStudioData"
import { StudioSkeleton } from "@/components/studio/LoadingStates"
import { StudioError } from "@/components/studio/ErrorStates"

export default function StudioPage() {
  const params = useParams()
  const slug = params.slug as string
  const [activeTab, setActiveTab] = useState<'posts' | 'members' | 'jobs' | 'projects' | 'settings'>('posts')

  const {
    studio,
    posts,
    members,
    jobs,
    projects,
    isOwner,
    isLoading,
    error,
    refetch
  } = useStudioData(slug)

  console.log(posts, "posts")
  console.log(studio, "studio")
  console.log(isOwner, "isOwner")
  console.log(members, "members")
  console.log(jobs, "jobs")
  console.log(projects, "projects")
  console.log(isLoading, "isLoading")
  console.log(error, "error")
  console.log(refetch, "refetch")
  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Sidebar />
        <div className="md:ml-64">
          <Header />
          <main className="pb-20 md:pb-8">
            <div className="max-w-6xl mx-auto p-4 md:p-6">
              <StudioSkeleton />
            </div>
          </main>
        </div>
        <MobileNav />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Sidebar />
        <div className="md:ml-64">
          <Header />
          <main className="pb-20 md:pb-8">
            <div className="max-w-6xl mx-auto p-4 md:p-6">
              <StudioError onRetry={refetch} />
            </div>
          </main>
        </div>
        <MobileNav />
      </div>
    )
  }

  if (!studio) {
    return (
      <div className="min-h-screen">
        <Sidebar />
        <div className="md:ml-64">
          <Header />
          <main className="pb-20 md:pb-8">
            <div className="max-w-6xl mx-auto p-4 md:p-6">
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-2">Studio not found</h1>
                <p className="text-muted-foreground">The studio you're looking for doesn't exist or has been removed.</p>
              </div>
            </div>
          </main>
        </div>
        <MobileNav />
      </div>
    )
  }


  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-6xl mx-auto p-4 md:p-6">
            <StudioHeader studio={studio} isOwner={isOwner} postsCount={posts.length} />
            
            <StudioTabs 
              activeTab={activeTab} 
              setActiveTab={setActiveTab}
              isOwner={isOwner}
            />

            <div className="mt-6">
              {activeTab === 'posts' && (
                <StudioPosts 
                  posts={posts} 
                  studio={studio} 
                  onPostCreated={refetch}
                  onPostDeleted={refetch}
                />
              )}
              {activeTab === 'members' && (
                <StudioMembers members={members} studio={studio} isOwner={isOwner} />
              )}
              {activeTab === 'jobs' && (
                <StudioJobs jobs={jobs} studio={studio} isOwner={isOwner} />
              )}
              {activeTab === 'projects' && (
                <StudioProjects projects={projects} studio={studio} isOwner={isOwner} />
              )}
              {activeTab === 'settings' && isOwner && (
                <StudioSettings studio={studio} />
              )}
            </div>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
