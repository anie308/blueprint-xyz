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
import { AlertCircle, CheckCircle, ImageIcon, XIcon } from "lucide-react"
import { useCreateProjectMutation } from "@/lib/store/api"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { handleApiError } from "@/lib/utils/errorHandler"

export default function CreateProjectPage() {
  const router = useRouter()
  const [createProjectMutation, { isLoading: isCreating }] = useCreateProjectMutation()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

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

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required")
      return
    }

    // Note: Image upload would need to be implemented separately
    // For now, we'll allow submission but note that images need to be uploaded first

    try {
      // TODO: Upload images first and get URLs, then use those URLs here
      // For now, we'll require at least one image to be selected
      // In production, you'd upload images to a storage service first
      const imageUrls: string[] = [] // Placeholder - would need actual upload

      const result = await createProjectMutation({
        title: title.trim(),
        description: description.trim(),
        images: imageUrls.length > 0 ? imageUrls : ['/placeholder.svg'], // Temporary placeholder
        tags: tags.length > 0 ? tags : []
      }).unwrap()

      if (result.success) {
        setSuccess(true)
        setTimeout(() => {
          router.push("/dashboard/portfolio")
        }, 2000)
      } else {
        setError(result.message || "Failed to create project")
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
              <h1 className="text-3xl font-bold mb-2 text-balance">Add Project</h1>
              <p className="text-muted-foreground leading-relaxed">
                Showcase your architectural work with images and details
              </p>
            </div>

            <Card className="p-6">
              {success && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Project created successfully! Redirecting...
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
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Sustainable Community Center"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your project, the design process, challenges, and outcomes..."
                    required
                    rows={8}
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                      placeholder="Add a tag and press Enter"
                    />
                    <Button type="button" onClick={handleAddTag} variant="outline" className="bg-transparent">
                      Add
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-sm rounded-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-destructive"
                          >
                            <XIcon className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Images */}
                <div className="space-y-2">
                  <Label htmlFor="images">Project Images *</Label>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    required={images.length === 0}
                  />
                  {images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
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
                  )}
                  <p className="text-xs text-muted-foreground">Upload at least one image of your project</p>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1" disabled={isCreating}>
                    {isCreating ? "Creating Project..." : "Create Project"}
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
