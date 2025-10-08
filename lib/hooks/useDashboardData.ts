import { useState } from 'react'
import { useGetFeedQuery, useGetStudiosQuery, useGetPostsQuery } from '@/lib/store/api'

export type FeedFilter = 'trending' | 'latest' | 'following'

export function useDashboardData() {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>('latest')

  // Fetch personalized feed
  const {
    data: feedData,
    isLoading: isFeedLoading,
    error: feedError,
    refetch: refetchFeed
  } = useGetFeedQuery({ page: 1, limit: 10 }, {
    pollingInterval: 300000, // 5 minutes
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  // Fetch posts based on filter
  const {
    data: postsData,
    isLoading: isPostsLoading,
    error: postsError,
    refetch: refetchPosts
  } = useGetPostsQuery({
    page: 1,
    limit: 10,
    sort: activeFilter === 'trending' ? 'popular' : 'newest',
    filter: activeFilter === 'following' ? 'following' : undefined
  }, {
    pollingInterval: 300000,
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
    limit: 3,
    sort: 'popular',
    filter: undefined
  }, {
    pollingInterval: 600000, // 10 minutes
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  // Extract data from API responses
  const feedContent = (feedData as any)?.data || []
  const posts = (postsData as any)?.data || []
  const featuredStudios = (studiosData as any)?.data || []

  // Determine which content to show based on filter
  const getDisplayContent = () => {
    switch (activeFilter) {
      case 'trending':
        return feedContent.filter((item: any) => item.type === 'trending')
      case 'latest':
        return posts
      case 'following':
        return feedContent.filter((item: any) => item.type === 'following')
      default:
        return feedContent
    }
  }

  const displayContent = getDisplayContent()

  // Loading states
  const isLoading = isFeedLoading || isPostsLoading || isStudiosLoading
  
  // Error states
  const hasError = feedError || postsError || studiosError
  const errors = {
    feed: feedError,
    posts: postsError,
    studios: studiosError
  }

  console.log(errors, "errors")
  // Empty states
  const isEmpty = !isLoading && !hasError && displayContent.length === 0

  // Refetch functions
  const refetchAll = () => {
    refetchFeed()
    refetchPosts()
    refetchStudios()
  }

  const changeFilter = (filter: FeedFilter) => {
    setActiveFilter(filter)
  }

  return {
    // Data
    displayContent,
    featuredStudios,
    activeFilter,
    
    // States
    isLoading,
    hasError,
    errors,
    isEmpty,
    
    // Actions
    refetchAll,
    refetchFeed,
    refetchPosts,
    refetchStudios,
    changeFilter
  }
}
