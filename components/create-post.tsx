"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { useCreatePost } from "@/lib/hooks/useCreatePost"
import { useCreateStudio } from "@/lib/hooks/useCreateStudio"
import { AuthService } from "@/lib/services/authService"
import { AlertCircle, ImageIcon, Users, Plus } from "lucide-react"
import { Alert, AlertDescription } from "./ui/alert"
import { useRouter } from "next/navigation"

export function CreatePost() {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const [showCreateStudio, setShowCreateStudio] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    studioId: '',
    images: [] as File[]
  })
  const [studioFormData, setStudioFormData] = useState({
    name: '',
    description: '',
    icon: '🏗️'
  })
  const [error, setError] = useState<string | null>(null)

  const { createPost, studios, isCreating, isLoadingStudios, error: createError } = useCreatePost()
  const { createStudio, isCreating: isCreatingStudio, error: studioError } = useCreateStudio()
  
  // Get current user from AuthService
  const currentUser = AuthService.getCurrentUser()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const handleStudioInputChange = (field: string, value: string) => {
    setStudioFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required')
      return
    }

    const result = await createPost({
      title: formData.title,
      content: formData.content,
      studioId: formData.studioId || undefined,
      images: formData.images
    })

    if (result.success) {
      setFormData({ title: '', content: '', studioId: '', images: [] })
      setIsExpanded(false)
    } else {
      setError(result.error)
    }
  }



  const resetForm = () => {
    setFormData({ title: '', content: '', studioId: '', images: [] })
    setError(null)
    setIsExpanded(false)
  }

  return (
    <div className="border border-border rounded-sm bg-card p-4">
      <div className="flex gap-3">
        <Avatar className="w-10 h-10 rounded-sm flex-shrink-0">
          <AvatarFallback className="rounded-sm bg-secondary text-foreground">
            {currentUser?.fullName?.charAt(0) || currentUser?.username?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full text-left px-4 py-3 rounded-sm bg-secondary text-muted-foreground hover:bg-secondary/80 transition-colors"
            >
              Share your thoughts, projects, or questions...
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input 
                placeholder="Post title" 
                className="font-semibold bg-secondary border-border" 
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
              
              <div className="flex gap-2">
                <Select value={formData.studioId} onValueChange={(value) => handleInputChange('studioId', value)}>
                  <SelectTrigger className="bg-secondary border-border flex-1">
                    <SelectValue placeholder="Select a studio (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingStudios ? (
                      <SelectItem value="loading" disabled>Loading studios...</SelectItem>
                    ) : (
                      studios.map((studio: any) => (
                        <SelectItem key={studio._id} value={studio._id}>
                          {studio.icon} {studio.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={()=> router.push('/dashboard/create/studio')}
                  className="flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Studio
                </Button>
              </div>

              <Textarea
                placeholder="Share your thoughts, add images, or start a discussion..."
                className="min-h-32 bg-secondary border-border resize-none"
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                required
              />

              {formData.images.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.images.map((file, index) => (
                    <div key={index} className="flex items-center gap-1 bg-secondary px-2 py-1 rounded text-sm">
                      <ImageIcon className="w-3 h-3" />
                      {file.name}
                    </div>
                  ))}
                </div>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex items-center gap-2">
                <Button 
                  type="submit" 
                  size="sm" 
                  className="rounded-sm"
                  disabled={isCreating}
                >
                  {isCreating ? 'Posting...' : 'Post'}
                </Button>
                <Button 
                  type="button" 
                  size="sm" 
                  variant="ghost" 
                  onClick={resetForm}
                >
                  Cancel
                </Button>
                <div className="flex-1" />
                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button size="sm" variant="ghost" type="button" className="flex items-center gap-1">
                    <ImageIcon className="w-4 h-4" />
                    Add Image
                  </Button>
                </label>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Create Studio Modal */}
      
    </div>
  )
}
