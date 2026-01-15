"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { StudioCard } from "@/components/studio-card"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useStudiosData } from "@/lib/hooks/useStudiosData"
import { StudiosGridSkeleton, SearchSkeleton } from "@/components/studios/LoadingStates"
import { StudiosError } from "@/components/studios/ErrorStates"
import { StudiosEmpty } from "@/components/studios/EmptyStates"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function StudiosPage() {
  const {
    studios,
    searchQuery,
    currentPage,
    sortBy,
    totalPages,
    hasNextPage,
    hasPrevPage,
    isLoading,
    error,
    handleSearch,
    handleSort,
    nextPage,
    prevPage,
    goToPage,
    refetch
  } = useStudiosData()

  console.log(studios, "studios")

  const [localSearchQuery, setLocalSearchQuery] = useState('')

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(localSearchQuery)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchQuery(e.target.value)
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-6xl mx-auto p-4 md:p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 text-balance">Explore Studios</h1>
              <p className="text-muted-foreground leading-relaxed">
                Join communities around specific architectural topics and connect with like-minded professionals
              </p>
            </div>

            {/* Search and Filter */}
            {isLoading ? (
              <SearchSkeleton />
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <form onSubmit={handleSearchSubmit} className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    type="search" 
                    placeholder="Search studios..." 
                    className="pl-10 bg-secondary border-border"
                    value={localSearchQuery}
                    onChange={handleSearchChange}
                  />
                </form>
                <Select value={sortBy} onValueChange={(value: 'popular' | 'newest' | 'oldest') => handleSort(value)}>
                  <SelectTrigger className="w-32 bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                  </SelectContent>
                </Select>
                <Button asChild>
                  <Link href="/dashboard/create/studio">Create Studio</Link>
                </Button>
              </div>
            )}

            {/* Studios Grid */}
            {isLoading ? (
              <StudiosGridSkeleton />
            ) : error ? (
              <StudiosError onRetry={refetch} />
            ) : studios.length === 0 ? (
              <StudiosEmpty searchQuery={searchQuery} />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studios.map((studio: any) => (
                    <StudioCard key={studio._id || studio.slug} {...studio} />
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevPage}
                      disabled={!hasPrevPage}
                      className="gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const pageNum = i + 1
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => goToPage(pageNum)}
                            className="w-8 h-8 p-0"
                          >
                            {pageNum}
                          </Button>
                        )
                      })}
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextPage}
                      disabled={!hasNextPage}
                      className="gap-1"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
