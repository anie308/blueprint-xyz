import { useState } from 'react'
import { useGetStudiosQuery } from '@/lib/store/api'

export function useStudiosData() {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'oldest'>('popular')

  // Fetch studios with search and pagination
  const {
    data: studiosData,
    isLoading,
    error,
    refetch
  } = useGetStudiosQuery({
    page: currentPage,
    limit: 12,
    sort: sortBy,
    search: searchQuery || undefined
  }, {
    pollingInterval: 300000, // 5 minutes
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  const studios = (studiosData as any)?.data || []
  const totalPages = (studiosData as any)?.pagination?.totalPages || 1
  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleSort = (sort: 'popular' | 'newest' | 'oldest') => {
    setSortBy(sort)
    setCurrentPage(1) // Reset to first page when sorting
  }

  const nextPage = () => {
    if (hasNextPage) {
      setCurrentPage(prev => prev + 1)
    }
  }

  const prevPage = () => {
    if (hasPrevPage) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return {
    // Data
    studios,
    searchQuery,
    currentPage,
    sortBy,
    totalPages,
    hasNextPage,
    hasPrevPage,
    
    // States
    isLoading,
    error,
    
    // Actions
    handleSearch,
    handleSort,
    nextPage,
    prevPage,
    goToPage,
    refetch
  }
}
