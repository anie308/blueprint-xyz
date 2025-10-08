import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, Plus, MapPin, Clock, DollarSign, Users, Briefcase } from "lucide-react"
import Link from "next/link"

interface StudioJobsProps {
  jobs: any[]
  studio: any
  isOwner: boolean
}

export function StudioJobs({ jobs, studio, isOwner }: StudioJobsProps) {
  console.log(jobs, "jobs")
  console.log(studio, "studio")
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'full-time' | 'part-time' | 'contract' | 'freelance'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'open' | 'closed'>('all')

  const filteredJobs = jobs?.filter(job => {
    const matchesSearch = job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          job.company?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = filterType === 'all' || job.type === filterType
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  }) || []

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'bg-green-100 text-green-800'
      case 'part-time':
        return 'bg-blue-100 text-blue-800'
      case 'contract':
        return 'bg-purple-100 text-purple-800'
      case 'freelance':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800'
      case 'closed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Jobs Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Studio Jobs</h2>
          <p className="text-sm text-muted-foreground">
            {jobs?.length || 0} jobs in {studio?.name}
          </p>
        </div>
        {isOwner && (
          <Button asChild>
            <Link href="/dashboard/create/job">
              <Plus className="w-4 h-4 mr-2" />
              Post Job
            </Link>
          </Button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search jobs..."
            className="pl-10 bg-secondary border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filterType} onValueChange={(value: 'all' | 'full-time' | 'part-time' | 'contract' | 'freelance') => setFilterType(value)}>
          <SelectTrigger className="w-40 bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="contract">Contract</SelectItem>
            <SelectItem value="freelance">Freelance</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={(value: 'all' | 'open' | 'closed') => setFilterStatus(value)}>
          <SelectTrigger className="w-32 bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-sm bg-secondary flex items-center justify-center text-2xl mx-auto mb-4">
            💼
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {searchQuery || filterType !== 'all' || filterStatus !== 'all' ? 'No jobs found' : 'No jobs yet'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || filterType !== 'all' || filterStatus !== 'all'
              ? 'No jobs match your search criteria.'
              : 'No job opportunities have been posted in this studio yet.'
            }
          </p>
          {isOwner && !searchQuery && filterType === 'all' && filterStatus === 'all' && (
            <Button asChild>
              <Link href="/dashboard/create/job">
                <Plus className="w-4 h-4 mr-2" />
                Post First Job
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job: any) => (
            <Card key={job._id} className="border border-border rounded-sm bg-card hover:border-primary/30 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg mb-1 truncate">{job.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getJobTypeColor(job.type)}>
                        {job.type}
                      </Badge>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {job.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  {job.location && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                  )}
                  {job.salary && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>{job.salary}</span>
                    </div>
                  )}
                  {job.experience && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="w-4 h-4" />
                      <span>{job.experience}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button asChild size="sm" className="rounded-sm">
                    <Link href={`/jobs/${job._id}`}>
                      View Details
                    </Link>
                  </Button>
                  {isOwner && (
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="rounded-sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="rounded-sm text-destructive">
                        Close
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
