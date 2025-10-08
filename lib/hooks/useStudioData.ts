import { useState } from 'react'
import { useGetStudiosQuery, useGetPostsQuery, useGetJobsQuery, useGetProjectsQuery } from '@/lib/store/api'
import { AuthService } from '@/lib/services/authService'

export function useStudioData(slug: string) {
  const [currentPage, setCurrentPage] = useState(1)
  const currentUser = AuthService.getCurrentUser()

  // Fetch studio data
  const {
    data: studioData,
    isLoading: isStudioLoading,
    error: studioError,
    refetch: refetchStudio
  } = useGetStudiosQuery({
    page: 1,
    limit: 1,
    slug: slug
  }, {
    pollingInterval: 300000, // 5 minutes
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  // Fetch studio posts
  const {
    data: postsData,
    isLoading: isPostsLoading,
    error: postsError,
    refetch: refetchPosts
  } = useGetPostsQuery({
    page: currentPage,
    limit: 10,
    studio: slug
  }, {
    pollingInterval: 300000,
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  // Fetch studio jobs
  const {
    data: jobsData,
    isLoading: isJobsLoading,
    error: jobsError,
    refetch: refetchJobs
  } = useGetJobsQuery({
    page: currentPage,
    limit: 10,
    studio: slug
  }, {
    pollingInterval: 300000,
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  // Fetch studio projects
  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    error: projectsError,
    refetch: refetchProjects
  } = useGetProjectsQuery({
    page: currentPage,
    limit: 10,
    studio: slug
  }, {
    pollingInterval: 300000,
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  const studio = (studioData as any)?.data?.[0]
  const posts = (postsData as any)?.data || []
  const jobs = (jobsData as any)?.data || []
  const projects = (projectsData as any)?.data || []
  const members = studio?.members || []
  
  // Check if current user is the studio owner
  const isOwner = currentUser?.id === studio?.owner?.id

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
