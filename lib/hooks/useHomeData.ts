import { useGetTrendingQuery, useGetProjectsQuery, useGetStudiosQuery } from '@/lib/store/api'

export function useHomeData() {
  // Fetch trending content (posts, projects, reels)
  const {
    data: trendingData,
    isLoading: isTrendingLoading,
    error: trendingError,
    refetch: refetchTrending
  } = useGetTrendingQuery({ page: 1, limit: 6 }, {
    // Cache for 5 minutes
    pollingInterval: 300000,
    // Refetch on window focus
    refetchOnFocus: true,
    // Refetch on reconnect
    refetchOnReconnect: true
  })

  // Fetch featured projects
  const {
    data: projectsData,
    isLoading: isProjectsLoading,
    error: projectsError,
    refetch: refetchProjects
  } = useGetProjectsQuery({ 
    page: 1, 
    limit: 3,
    sort: 'popular',
    filter: undefined
  }, {
    // Cache for 10 minutes (projects change less frequently)
    pollingInterval: 600000,
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  // Fetch featured studios
  const {
    data: studiosData,
    isLoading: isStudiosLoading,
    error: studiosError,
    refetch: refetchStudios
  } = useGetStudiosQuery({ 
    page: 1, 
    limit: 4,
    sort: 'popular',
    filter: undefined
  }, {
    // Cache for 15 minutes (studios change least frequently)
    pollingInterval: 900000,
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  // Extract data from API responses
  const trendingContent = (trendingData as any)?.data || []
  const featuredProjects = (projectsData as any)?.data || []
  const featuredStudios = (studiosData as any)?.data || []

  // Loading states
  const isLoading = isTrendingLoading || isProjectsLoading || isStudiosLoading
  
  // Error states
  const hasError = trendingError || projectsError || studiosError
  const errors = {
    trending: trendingError,
    projects: projectsError,
    studios: studiosError
  }

  // Empty states
  const isEmpty = !isLoading && !hasError && 
    trendingContent.length === 0 && 
    featuredProjects.length === 0 && 
    featuredStudios.length === 0

  // Refetch function
  const refetchAll = () => {
    refetchTrending()
    refetchProjects()
    refetchStudios()
  }

  return {
    // Data
    trendingContent,
    featuredProjects,
    featuredStudios,
    
    // States
    isLoading,
    hasError,
    errors,
    isEmpty,
    
    // Actions
    refetchAll,
    refetchTrending,
    refetchProjects,
    refetchStudios
  }
}
