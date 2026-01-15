"use client"

import { useParams, useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { BriefcaseIcon, MapPinIcon, ClockIcon, BookmarkIcon, LinkIcon } from "@/components/icons"
import { useGetJobQuery } from "@/lib/store/api"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/dashboard/ErrorStates"
import { formatDistanceToNow, format } from "date-fns"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function JobDetailPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string

  const {
    data: jobData,
    isLoading,
    error,
    refetch
  } = useGetJobQuery(jobId, {
    skip: !jobId
  })

  // Handle nested structure: data.job or data
  const job = (jobData as any)?.data?.job || (jobData as any)?.data

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Sidebar />
        <div className="md:ml-64">
          <Header />
          <main className="pb-20 md:pb-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Skeleton className="h-10 w-32 mb-6" />
              <div className="border border-border rounded-sm bg-card p-8 mb-6">
                <div className="flex items-start gap-4 mb-6">
                  <Skeleton className="w-16 h-16 rounded-sm" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="border border-border rounded-sm bg-card p-8 mb-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </main>
        </div>
        <MobileNav />
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="min-h-screen">
        <Sidebar />
        <div className="md:ml-64">
          <Header />
          <main className="pb-20 md:pb-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ErrorState
                title="Job not found"
                message="We couldn't find this job posting. It may have been removed or the link is invalid."
                onRetry={() => refetch()}
              />
            </div>
          </main>
        </div>
        <MobileNav />
      </div>
    )
  }

  // Format date
  const postedDate = job.createdAt 
    ? (() => {
        const date = new Date(job.createdAt)
        const diffInHours = (new Date().getTime() - date.getTime()) / (1000 * 60 * 60)
        if (diffInHours < 24) {
          return formatDistanceToNow(date, { addSuffix: true })
        } else if (diffInHours < 24 * 7) {
          return format(date, "MMM d 'at' h:mm a")
        } else {
          return format(date, "MMM d, yyyy")
        }
      })()
    : 'Recently'

  // Get salary range (can be string or object)
  const salaryRange = typeof job.salaryRange === 'string' 
    ? job.salaryRange 
    : job.salary 
      ? `${job.salary.currency || '$'}${job.salary.min?.toLocaleString() || ''}${job.salary.max ? ` - ${job.salary.max.toLocaleString()}` : ''}`
      : 'Negotiable'

  // Get job type
  const jobType = job.jobType || job.type || 'Full-time'

  // Get company info - can be from company field, studio, or postedById
  const company = job.company || job.studio?.name || job.postedById?.username || 'Company'
  const companyLogo = job.studio?.logoUrl || job.postedById?.profilePictureUrl

  // Parse requirements and benefits - handle both array and string formats
  const requirements = Array.isArray(job.requirements) 
    ? job.requirements 
    : job.requirements 
      ? (typeof job.requirements === 'string' ? job.requirements.split('\n').filter((r: string) => r.trim()) : [])
      : []
  const benefits = Array.isArray(job.benefits) 
    ? job.benefits 
    : job.benefits 
      ? (typeof job.benefits === 'string' ? job.benefits.split('\n').filter((b: string) => b.trim()) : [])
      : []

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Button */}
            <Link
              href="/dashboard/jobs"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Jobs
            </Link>

            {/* Header */}
            <div className="border border-border rounded-sm bg-card p-8 mb-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex gap-4 flex-1">
                  <div className="w-16 h-16 rounded-sm bg-secondary flex items-center justify-center flex-shrink-0">
                    {companyLogo ? (
                      <img
                        src={companyLogo}
                        alt={company}
                        className="w-full h-full object-cover rounded-sm"
                      />
                    ) : (
                      <BriefcaseIcon className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-foreground mb-2">{job.title}</h1>
                    <p className="text-lg text-foreground font-medium">{company}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <BookmarkIcon className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1.5">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{job.location || 'Location not specified'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BriefcaseIcon className="w-4 h-4" />
                  <span>{jobType}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ClockIcon className="w-4 h-4" />
                  <span>Posted {postedDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {salaryRange && salaryRange !== 'Negotiable' && (
                  <span className="px-3 py-1.5 text-sm font-medium bg-accent/10 text-accent rounded-sm border border-accent/20">
                    {salaryRange}
                  </span>
                )}
              </div>

              {job.applicationLink ? (
                <Button className="w-full sm:w-auto" asChild>
                  <a href={job.applicationLink} target="_blank" rel="noopener noreferrer">
                    Apply via External Link
                    <LinkIcon className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              ) : (
                <Button className="w-full sm:w-auto" asChild>
                  <Link href={`/dashboard/jobs/${jobId}/apply`}>
                    Apply Now
                  </Link>
                </Button>
              )}
              {job.expiresAt && (
                <p className="text-sm text-muted-foreground mt-2">
                  Expires: {format(new Date(job.expiresAt), "MMM d, yyyy")}
                </p>
              )}
            </div>

            {/* Job Description */}
            {job.description && (
              <div className="border border-border rounded-sm bg-card p-8 mb-6">
                <h2 className="text-xl font-bold text-foreground mb-4">About the Role</h2>
                <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
                  <p className="whitespace-pre-wrap">{job.description}</p>
                </div>
              </div>
            )}

            {/* Requirements */}
            {requirements.length > 0 && (
              <div className="border border-border rounded-sm bg-card p-8 mb-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Requirements</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {requirements.map((req: string, index: number) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {benefits.length > 0 && (
              <div className="border border-border rounded-sm bg-card p-8 mb-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Benefits</h2>
                <ul className="space-y-3 text-muted-foreground">
                  {benefits.map((benefit: string, index: number) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Skills (from requirements) */}
            {requirements.length > 0 && (
              <div className="border border-border rounded-sm bg-card p-8 mb-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {requirements.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 text-sm font-medium bg-secondary text-foreground rounded-sm border border-border"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Company/Poster Info */}
            {company && (
              <div className="border border-border rounded-sm bg-card p-8">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  {job.postedByType === 'Studio' ? 'About' : 'Posted by'} {company}
                </h2>
                {job.studio?.description && (
                  <p className="text-muted-foreground mb-4">{job.studio.description}</p>
                )}
                {job.postedById && job.postedByType === 'User' && (
                  <div className="flex items-center gap-3 mb-4">
                    {job.postedById.profilePictureUrl && (
                      <img
                        src={job.postedById.profilePictureUrl}
                        alt={job.postedById.username}
                        className="w-12 h-12 rounded-sm object-cover"
                      />
                    )}
                    <div>
                      <p className="font-medium text-foreground">@{job.postedById.username}</p>
                      {job.postedById.id && (
                        <Link
                          href={`/dashboard/profile`}
                          className="text-sm text-primary hover:underline"
                        >
                          View Profile
                        </Link>
                      )}
                    </div>
                  </div>
                )}
                {job.studio?.website && (
                  <Button variant="outline" className="gap-2 bg-transparent" asChild>
                    <a href={job.studio.website} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="w-4 h-4" />
                      Visit Company Website
                    </a>
                  </Button>
                )}
                {job.applicationLink && (
                  <div className="mt-4">
                    <Button className="w-full sm:w-auto" asChild>
                      <a href={job.applicationLink} target="_blank" rel="noopener noreferrer">
                        Apply via External Link
                        <LinkIcon className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
