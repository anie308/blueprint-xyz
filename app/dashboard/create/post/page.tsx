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
import { AlertCircle, CheckCircle, ImageIcon } from "lucide-react"
import { useCreatePostMutation, useGetStudiosQuery } from "@/lib/store/api"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { handleApiError } from "@/lib/utils/errorHandler"

export default function CreatePostPage() {
  const router = useRouter()
  const [createPostMutation, { isLoading: isCreating }] = useCreatePostMutation()
  const { data: studiosData, isLoading: isStudiosLoading } = useGetStudiosQuery({ page: 1, limit: 50 })

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [studioId, setStudioId] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const studios = (studiosData as any)?.data || []

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setImages(prev => [...prev, ...files])
  }

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (!content.trim()) {
      setError("Content is required")
      return
    }

    try {
      // Build post data according to API guide
      const postData: {
        title?: string
        content: string
        studioId?: string
        images?: string[]
        mediaUrl?: string
      } = {
        content: content.trim(),
      }

      // Add optional title
      if (title.trim()) {
        postData.title = title.trim()
      }

      // Add optional studioId
      if (studioId) {
        postData.studioId = studioId
      }

      // TODO: Upload images first and get URLs, then add to postData.images
      // For now, images are handled separately

      const result = await createPostMutation(postData).unwrap()

      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        setError(result.message || "Failed to create post")
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
              <h1 className="text-3xl font-bold mb-2 text-balance">Create Post</h1>
              <p className="text-muted-foreground leading-relaxed">
                Share your thoughts, questions, or discussions with the community
              </p>
            </div>

            <Card className="p-6">
              {success && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Post created successfully! Redirecting...
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
                {/* Studio Selection */}
                <div className="space-y-2">
                  <Label htmlFor="studio">Post as (Optional)</Label>
                  <Select value={studioId} onValueChange={setStudioId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Personal Post" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Personal Post</SelectItem>
                      {isStudiosLoading ? (
                        <SelectItem value="loading" disabled>Loading studios...</SelectItem>
                      ) : (
                        studios.map((studio: any) => (
                          <SelectItem key={studio._id || studio.id} value={studio._id || studio.id}>
                            {studio.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {studioId && (
                    <p className="text-sm text-muted-foreground">
                      This post will be attributed to {studios.find((s: any) => (s._id || s.id) === studioId)?.name || 'the studio'}
                    </p>
                  )}
                </div>

                {/* Title (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title (Optional)</Label>
                  <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Post title"
                    maxLength={200}
                  />
                  <p className="text-xs text-muted-foreground">{title.length}/200 characters</p>
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    required
                    rows={10}
                    maxLength={2000}
                  />
                  <p className="text-xs text-muted-foreground">{content.length}/2000 characters</p>
                </div>

                {/* Images */}
                {images.length > 0 && (
                  <div className="space-y-2">
                    <Label>Selected Images</Label>
                    <div className="flex flex-wrap gap-2">
                      {images.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 bg-secondary px-3 py-2 rounded-sm">
                          <ImageIcon className="w-4 h-4" />
                          <span className="text-sm">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveImage(index)}
                            className="h-6 w-6 p-0"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Image Upload */}
                <div className="space-y-2">
                  <Label htmlFor="images">Add Images (Optional)</Label>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1" disabled={isCreating}>
                    {isCreating ? "Creating Post..." : "Create Post"}
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
