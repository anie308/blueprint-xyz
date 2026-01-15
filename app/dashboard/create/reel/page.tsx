"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, VideoIcon } from "lucide-react"
import { useCreateReelMutation } from "@/lib/store/api"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { handleApiError } from "@/lib/utils/errorHandler"

export default function CreateReelPage() {
  const router = useRouter()
  const [createReelMutation, { isLoading: isCreating }] = useCreateReelMutation()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setThumbnail(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!title.trim() || !videoUrl.trim()) {
      setError("Title and video URL are required")
      return
    }

    try {
      const thumbnailUrl = thumbnail ? thumbnail.name : undefined // Placeholder - would need actual upload

      const result = await createReelMutation({
        title: title.trim(),
        description: description.trim() || undefined,
        videoUrl: videoUrl.trim(),
        thumbnailUrl
      }).unwrap()

      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/dashboard/reels")
        }, 2000)
      } else {
        setError(result.message || "Failed to create reel")
      }
    } catch (err: any) {
      setError(handleApiError(err))
    }
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="md:ml-64">
        <Header />
        <main className="pb-20 md:pb-8">
          <div className="max-w-3xl mx-auto p-4 md:p-6">
            <Link
              href="/dashboard/create"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              Back to Create
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2 text-balance">Upload Reel</h1>
              <p className="text-muted-foreground leading-relaxed">
                Share a short video showcasing your design process or project
              </p>
            </div>

            <Card className="p-6">
              {success && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Reel uploaded successfully! Redirecting...
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
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Reel Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Sketch to 3D Render in 60 Seconds"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your reel or add context..."
                    rows={4}
                  />
                </div>

                {/* Video URL */}
                <div className="space-y-2">
                  <Label htmlFor="videoUrl">Video URL *</Label>
                  <Input
                    id="videoUrl"
                    type="url"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://example.com/video.mp4 or YouTube/Vimeo URL"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter a direct video URL or link to YouTube/Vimeo
                  </p>
                </div>

                {/* Thumbnail */}
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail Image (Optional)</Label>
                  <Input
                    id="thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                  />
                  {thumbnail && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      Selected: {thumbnail.name}
                    </div>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1" disabled={isCreating}>
                    {isCreating ? "Uploading Reel..." : "Upload Reel"}
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 bg-transparent" asChild>
                    <Link href="/dashboard/create">Cancel</Link>
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
