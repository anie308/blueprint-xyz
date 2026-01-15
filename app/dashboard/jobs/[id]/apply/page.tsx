"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"
import { useGetJobQuery, useApplyToJobMutation } from "@/lib/store/api"
import { useGetMeQuery } from "@/lib/store/api"
import { Skeleton } from "@/components/ui/skeleton"
import { ErrorState } from "@/components/dashboard/ErrorStates"
import { handleApiError } from "@/lib/utils/errorHandler"
import Link from "next/link"
import { BriefcaseIcon } from "@/components/icons"

export default function JobApplicationPage() {
  const params = useParams()
  const router = useRouter()
  const jobId = params.id as string

  const {
    data: jobData,
    isLoading: isLoadingJob,
    error: jobError
  } = useGetJobQuery(jobId, {
    skip: !jobId
  })

  const {
    data: userData,
    isLoading: isLoadingUser
  } = useGetMeQuery()

  const [applyToJob, { isLoading: isSubmitting }] = useApplyToJobMutation()

  // Handle nested structure: data.job or data
  const job = (jobData as any)?.data?.job || (jobData as any)?.data
  const user = (userData as any)?.data

  // Form state
  const [coverLetter, setCoverLetter] = useState("")
  const [resumeUrl, setResumeUrl] = useState("")
  const [portfolioUrl, setPortfolioUrl] = useState("")
  const [additionalInfo, setAdditionalInfo] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Pre-fill portfolio URL from user profile if available
  const userPortfolioUrl = user?.website || user?.portfolioUrl || ""

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // Validation
    if (!coverLetter.trim()) {
      setError("Cover letter is required")
      return
    }

    if (coverLetter.trim().length < 50) {
      setError("Cover letter must be at least 50 characters")
      return
    }

    try {
      const result = await applyToJob({
        id: jobId,
        data: {
          coverLetter: coverLetter.trim(),
          resumeUrl: resumeUrl.trim() || undefined,
          portfolioUrl: portfolioUrl.trim() || userPortfolioUrl || undefined,
          additionalInfo: additionalInfo.trim() || undefined,
        }
      }).unwrap()

      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push(`/dashboard/jobs/${jobId}`)
        }, 2000)
      } else {
        setError(result.message || "Failed to submit application")
      }
    } catch (err: any) {
      setError(handleApiError(err))
    }
  }

  if (isLoadingJob || isLoadingUser) {
    return (
      <div className="min-h-screen">
        <Sidebar />
        <div className="md:ml-64">
          <Header />
          <main className="pb-20 md:pb-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Skeleton className="h-10 w-32 mb-6" />
              <Card className="p-6">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-32 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </Card>
            </div>
          </main>
        </div>
        <MobileNav />
      </div>
    )
  }

  if (jobError || !job) {
    return (
      <div className="min-h-screen">
        <Sidebar />
        <div className="md:ml-64">
          <Header />
          <main className="pb-20 md:pb-8">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <ErrorState
                title="Job not found"
                message="We couldn't find this job posting. It may have been removed or the link is invalid."
                onRetry={() => window.location.reload()}
              />
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
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Back Button */}
            <Link
              href={`/dashboard/jobs/${jobId}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Job Details
            </Link>

            {/* Job Summary */}
            <Card className="p-6 mb-6 border-primary/20 bg-primary/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-sm bg-secondary flex items-center justify-center flex-shrink-0">
                  <BriefcaseIcon className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-foreground mb-1">{job.title}</h2>
                  <p className="text-muted-foreground">
                    {job.company || job.studio?.name || job.postedById?.username || 'Company'}
                    {job.location && ` • ${job.location}`}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">Apply for Position</h1>
                <p className="text-muted-foreground">
                  Complete the form below to submit your application for this position.
                </p>
              </div>

              {success && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Application submitted successfully! Redirecting to job details...
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Cover Letter */}
                <div className="space-y-2">
                  <Label htmlFor="coverLetter">
                    Cover Letter <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="coverLetter"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    required
                    rows={8}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    {coverLetter.length} characters (minimum 50 required)
                  </p>
                </div>

                {/* Resume URL */}
                <div className="space-y-2">
                  <Label htmlFor="resumeUrl">Resume/CV URL (Optional)</Label>
                  <Input
                    id="resumeUrl"
                    type="url"
                    value={resumeUrl}
                    onChange={(e) => setResumeUrl(e.target.value)}
                    placeholder="https://example.com/resume.pdf or Google Drive link"
                  />
                  <p className="text-xs text-muted-foreground">
                    Share a link to your resume or CV. Make sure the link is publicly accessible.
                  </p>
                </div>

                {/* Portfolio URL */}
                <div className="space-y-2">
                  <Label htmlFor="portfolioUrl">Portfolio URL (Optional)</Label>
                  <Input
                    id="portfolioUrl"
                    type="url"
                    value={portfolioUrl || userPortfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder={userPortfolioUrl || "https://yourportfolio.com"}
                  />
                  <p className="text-xs text-muted-foreground">
                    {userPortfolioUrl && !portfolioUrl 
                      ? "Your profile portfolio URL is pre-filled. You can change it if needed."
                      : "Share a link to your portfolio or website."}
                  </p>
                </div>

                {/* Additional Info */}
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                  <Textarea
                    id="additionalInfo"
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="Any additional information you'd like to share (availability, references, etc.)"
                    rows={4}
                    className="resize-none"
                  />
                </div>

                {/* Applicant Info Preview */}
                {user && (
                  <div className="border border-border rounded-sm p-4 bg-secondary/30">
                    <h3 className="text-sm font-semibold text-foreground mb-2">Your Application Will Include:</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p><strong className="text-foreground">Name:</strong> {user.fullName || user.name || 'Not provided'}</p>
                      <p><strong className="text-foreground">Email:</strong> {user.email || 'Not provided'}</p>
                      {user.location && (
                        <p><strong className="text-foreground">Location:</strong> {user.location}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1" disabled={isSubmitting || success}>
                    {isSubmitting ? "Submitting..." : success ? "Submitted!" : "Submit Application"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="flex-1 bg-transparent" 
                    onClick={() => router.back()}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  )
}
