"use client"

import { useState, useMemo } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { JobCard } from "@/components/job-card"
import { FilterIcon, SearchIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { useGetJobsQuery } from "@/lib/store/api"
import { ErrorState } from "@/components/dashboard/ErrorStates"
import { EmptyState } from "@/components/dashboard/EmptyStates"
import { BriefcaseIcon } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

const jobTypes = ["All", "Full-time", "Part-time", "Contract", "Freelance", "Internship"]
const experienceLevels = ["All", "Entry Level", "Mid Level", "Senior Level", "Lead", "Executive"]
const locations = ["All", "Remote", "On-site", "Hybrid"]

export default function JobsPage() {
  const [selectedType, setSelectedType] = useState("All")
  const [selectedExperience, setSelectedExperience] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)

  // Fetch jobs from API
  const {
    data: jobsData,
    isLoading,
    error,
    refetch
  } = useGetJobsQuery({
    page,
    limit: 20,
    search: searchQuery || undefined,
    sort: 'newest'
  }, {
    pollingInterval: 300000, // 5 minutes
    refetchOnFocus: true,
    refetchOnReconnect: true
  })

  const jobs = (jobsData as any)?.data || []

  // Transform API job data to JobCard props
  const transformedJobs = useMemo(() => {
    return jobs.map((job: any) => {
      const salaryStr = job.salary
        ? `${job.salary.currency || '$'}${job.salary.min?.toLocaleString() || ''}${job.salary.max ? ` - ${job.salary.max.toLocaleString()}` : ''}`
        : undefined

      return {
        id: job._id || job.id,
        title: job.title,
        company: job.company || job.studio?.name || 'Unknown',
        companyLogo: job.studio?.logoUrl,
        location: job.location || 'Location not specified',
        type: job.type || 'Full-time',
        experience: job.experience || 'Mid Level',
        salary: salaryStr,
        postedTime: job.createdAt ? formatDistanceToNow(new Date(job.createdAt), { addSuffix: true }) : 'Recently',
        description: job.description || '',
        skills: job.requirements || []
      }
    })
  }, [jobs])

  // Client-side filtering (can be moved to backend if needed)
  const filteredJobs = useMemo(() => {
    return transformedJobs.filter((job) => {
      const matchesType = selectedType === "All" || job.type === selectedType
      const matchesExperience = selectedExperience === "All" || job.experience === selectedExperience
      const matchesLocation =
        selectedLocation === "All" ||
        (selectedLocation === "Remote" && job.location.toLowerCase().includes("remote")) ||
        (selectedLocation === "On-site" && !job.location.toLowerCase().includes("remote")) ||
        (selectedLocation === "Hybrid" && job.location.toLowerCase().includes("hybrid"))
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((skill: string) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesType && matchesExperience && matchesLocation && matchesSearch
    })
  }, [transformedJobs, selectedType, selectedExperience, selectedLocation, searchQuery])

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          {/* Header */}
          <div className="border-b border-border bg-card sticky top-16 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Architecture Jobs</h1>
                  <p className="text-muted-foreground mt-1">
                    {filteredJobs.length} {filteredJobs.length === 1 ? "position" : "positions"} available
                  </p>
                </div>
                <Button className="gap-2" asChild>
                  <Link href="/dashboard/create/job">
                    <FilterIcon className="w-4 h-4" />
                    Post a Job
                  </Link>
                </Button>
              </div>

              {/* Search */}
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by title, company, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              {/* Job Type Filter */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <FilterIcon className="w-4 h-4" />
                  Job Type
                </h3>
                <div className="space-y-2">
                  {jobTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors ${
                        selectedType === type
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Level Filter */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3">Experience Level</h3>
                <div className="space-y-2">
                  {experienceLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedExperience(level)}
                      className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors ${
                        selectedExperience === level
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h3 className="text-sm font-bold text-foreground mb-3">Location</h3>
                <div className="space-y-2">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      className={`w-full text-left px-3 py-2 rounded-sm text-sm transition-colors ${
                        selectedLocation === location
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedType !== "All" || selectedExperience !== "All" || selectedLocation !== "All") && (
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => {
                    setSelectedType("All")
                    setSelectedExperience("All")
                    setSelectedLocation("All")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </aside>

          {/* Job Listings */}
          <div className="lg:col-span-3 space-y-4">
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="border border-border rounded-sm bg-card p-6">
                    <div className="flex items-start gap-4">
                      <Skeleton className="w-12 h-12 rounded-sm" />
                      <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-20" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <ErrorState
                title="Unable to load jobs"
                message="We couldn't fetch the job listings. Please try again."
                onRetry={() => refetch()}
              />
            ) : filteredJobs.length > 0 ? (
              <>
                {filteredJobs.map((job) => <JobCard key={job.id} {...job} />)}
                {(jobsData as any)?.pagination?.hasNext && (
                  <div className="text-center pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setPage(prev => prev + 1)}
                    >
                      Load More
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <EmptyState
                icon={BriefcaseIcon}
                title="No jobs found"
                description="No jobs match your current filters. Try adjusting your search criteria."
                actionText="Clear Filters"
                actionHref="#"
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
