import { useState, useMemo } from 'react'
import { useGetStudiosQuery, useGetPostsQuery, useGetJobsQuery, useGetProjectsQuery } from '@/lib/store/api'
import { AuthService } from '@/lib/services/authService'

export function useStudioData(slug: string) {
  const [currentPage, setCurrentPage] = useState(1)
  const currentUser = AuthService.getCurrentUser()

  // Fetch studio data by slug using the list endpoint
  // Since the API /studios/:id only accepts IDs, we need to search by slug
  const {
    data: studioData,
    isLoading: isStudioLoading,
    error: studioError,
    refetch: refetchStudio
  } = useGetStudiosQuery({
    page: 1,
    limit: 100, // Fetch more to ensure we find the studio by slug
    search: slug // Search by slug
  }, {
    pollingInterval: 300000, // 5 minutes
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  // Extract the studio from the search results
  // Find exact match by slug (search might return partial matches)
  const studio = useMemo(() => {
    const studios = (studioData as any)?.data || []
    // Find the exact match by slug
    const exactMatch = studios.find((s: any) => s.slug === slug)
    return exactMatch || null
  }, [studioData, slug])
  
  const studioId = studio?._id || studio?.id

  // Fetch studio posts - use studio ID if available, otherwise use slug
  const {
    data: postsData,
    isLoading: isPostsLoading,
    error: postsError,
    refetch: refetchPosts
  } = useGetPostsQuery({
    page: currentPage,
    limit: 10,
    studio: studioId || slug // Use studio ID if available, fallback to slug
  }, {
    skip: !studioId && !slug, // Don't fetch if we don't have studio identifier
    pollingInterval: 300000,
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  // Fetch studio jobs - use studio ID (backend requires ObjectId)
  const {
    data: jobsData,
    isLoading: isJobsLoading,
    error: jobsError,
    refetch: refetchJobs
  } = useGetJobsQuery({
    page: currentPage,
    limit: 10,
    studio: studioId || undefined // Use studio ID, skip if not available
  }, {
    skip: !studioId, // Don't fetch if we don't have studio ID
    pollingInterval: 300000,
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  // Fetch studio projects - use studio ID (backend requires ObjectId)
  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    error: projectsError,
    refetch: refetchProjects
  } = useGetProjectsQuery({
    page: currentPage,
    limit: 10,
    studio: studioId || undefined // Use studio ID, skip if not available
  }, {
    skip: !studioId, // Don't fetch if we don't have studio ID
    pollingInterval: 300000,
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  const allPosts = (postsData as any)?.data || []
  
  // Filter posts to only include those belonging to this studio
  // This ensures we don't show posts from other studios even if API returns them
  const posts = useMemo(() => {
    if (!studioId) return []
    
    return allPosts.filter((post: any) => {
      const postStudioId = post.studioId
      
      // Handle both object and string formats
      if (typeof postStudioId === 'object' && postStudioId !== null) {
        const postStudioIdValue = postStudioId._id || postStudioId.id
        return String(postStudioIdValue) === String(studioId)
      } else if (typeof postStudioId === 'string') {
        return String(postStudioId) === String(studioId)
      }
      
      // Posts without studioId don't belong to any studio
      return false
    })
  }, [allPosts, studioId])
  
  const jobs = (jobsData as any)?.data || []
  const projects = (projectsData as any)?.data || []
  const members = studio?.members || []
  
  // Check if current user is the studio owner
  const isOwner = currentUser?.id === studio?.owner?.id || currentUser?._id === studio?.owner?._id || currentUser?._id === studio?.owner

  const isLoading = isStudioLoading || isPostsLoading || isJobsLoading || isProjectsLoading
  const error = studioError || postsError || jobsError || projectsError

  const refetch = () => {
    refetchStudio()
    refetchPosts()
    refetchJobs()
    refetchProjects()
  }

  return {
    studio,
    posts,
    jobs,
    projects,
    members,
    isOwner,
    isLoading,
    error,
    refetch,
    currentPage,
    setCurrentPage
  }
}
