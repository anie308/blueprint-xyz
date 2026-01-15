"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ImageIcon, CheckCircle } from "lucide-react"
import { useCreatePostMutation } from "@/lib/store/api"
import { handleApiError } from "@/lib/utils/errorHandler"
import { toast } from "sonner"

interface CreatePostModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  studioId: string
  studioName: string
  onSuccess?: () => void
}

export function CreatePostModal({ 
  open, 
  onOpenChange, 
  studioId, 
  studioName,
  onSuccess 
}: CreatePostModalProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const [createPostMutation, { isLoading: isCreating }] = useCreatePostMutation()

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!open) {
      setTitle("")
      setContent("")
      setImages([])
      setError(null)
      setSuccess(false)
    }
  }, [open])

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
        studioId: string
        images?: string[]
        mediaUrl?: string
      } = {
        content: content.trim(),
        studioId: studioId, // Automatically set to current studio
      }

      // Add optional title
      if (title.trim()) {
        postData.title = title.trim()
      }

      // TODO: Upload images first and get URLs, then add to postData.images
      // For now, images are handled separately

      const result = await createPostMutation(postData).unwrap()

      if (result.success) {
        setSuccess(true)
        toast.success("Post created successfully!")
        
        // Reset form
        setTitle("")
        setContent("")
        setImages([])
        
        // Call success callback and close modal after a short delay
        setTimeout(() => {
          onSuccess?.()
          onOpenChange(false)
        }, 1500)
      } else {
        setError(result.message || "Failed to create post")
      }
    } catch (err: any) {
      const errorMessage = handleApiError(err)
      setError(errorMessage)
      toast.error(errorMessage)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Post in {studioName}</DialogTitle>
          <DialogDescription>
            Share your thoughts, questions, or discussions with the {studioName} community
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Studio Context Indicator */}
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-sm">
            <p className="text-sm text-foreground">
              <span className="font-semibold">Posting as:</span> {studioName}
            </p>
          </div>

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Post created successfully! Closing...
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

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
              rows={8}
              maxLength={2000}
              className="resize-none"
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
            <Button 
              type="submit" 
              className="flex-1" 
              disabled={isCreating || success}
            >
              {isCreating ? "Creating Post..." : success ? "Post Created!" : "Create Post"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isCreating || success}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
