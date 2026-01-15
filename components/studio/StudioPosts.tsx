"use client"

import { useState } from "react"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon } from "@/components/icons"
import { Plus } from "lucide-react"
import { CreatePostModal } from "./CreatePostModal"

interface StudioPostsProps {
  posts: any[]
  studio: any
  onPostCreated?: () => void // Callback to refetch posts after creation
  onPostDeleted?: () => void // Callback to refetch posts after deletion
}

export function StudioPosts({ posts, studio, onPostCreated, onPostDeleted }: StudioPostsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  // Filter posts to only show those belonging to this studio
  const studioPosts = posts?.filter((post: any) => {
    if (!studio?._id && !studio?.id) return false
    
    const studioId = studio._id || studio.id
    const postStudioId = post.studioId
    
    // Handle both object and string formats for studioId
    if (typeof postStudioId === 'object' && postStudioId !== null) {
      const postStudioIdValue = postStudioId._id || postStudioId.id
      return String(postStudioIdValue) === String(studioId)
    } else if (typeof postStudioId === 'string') {
      return String(postStudioId) === String(studioId)
    }
    
    // If post has no studioId, it doesn't belong to any studio
    return false
  }) || []

  const filteredPosts = studioPosts.filter(post => 
    post?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post?.content?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || []

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case 'popular':
        return (b.appreciations || 0) - (a.appreciations || 0)
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Posts Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Studio Posts</h2>
          <p className="text-sm text-muted-foreground">
            {studioPosts.length} posts in {studio?.name}
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="pl-10 bg-secondary border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={sortBy} onValueChange={(value: 'newest' | 'oldest' | 'popular') => setSortBy(value)}>
          <SelectTrigger className="w-40 bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Posts List */}
      {sortedPosts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-sm bg-secondary flex items-center justify-center text-2xl mx-auto mb-4">
            📝
          </div>
          <h3 className="text-lg font-semibold mb-2">
            {searchQuery ? 'No posts found' : 'No posts yet'}
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery 
              ? `No posts match "${searchQuery}". Try a different search term.`
              : 'Be the first to share something in this studio.'
            }
          </p>
          {!searchQuery && (
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Post
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedPosts.map((post: any) => {
            // Use authorId from the post object (as per API structure)
            const authorData = post.authorId || post.author || {}
            
            // Handle both object and string formats
            const authorId = typeof authorData === 'object' && authorData !== null
              ? {
                  fullName: authorData.fullName || authorData.name || 'User',
                  username: authorData.username || 'user',
                  profilePictureUrl: authorData.profilePictureUrl || authorData.profilePicture || null,
                  _id: authorData._id || authorData.id,
                  id: authorData._id || authorData.id,
                }
              : null

            // Handle studioId - can be object or string
            const studioIdData = post.studioId || {}
            const studioName = typeof studioIdData === 'object' && studioIdData !== null
              ? studioIdData.name || studio?.name
              : studio?.name

            return (
              <PostCard
                key={post._id}
                _id={post._id}
                authorId={authorId}
                studioId={studioIdData}
                studio={studioName}
                title={post.title}
                content={post.content}
                mediaUrl={post.mediaUrl}
                image={post.images?.[0]}
                images={post.images}
                appreciations={post.likesCount || (Array.isArray(post.likes) ? post.likes.length : 0)}
                comments={post.commentsCount || (Array.isArray(post.comments) ? post.comments.length : 0)}
                createdAt={post.createdAt}
                timestamp={post.createdAt}
                likes={Array.isArray(post.likes) ? post.likes : []}
                onDeleted={() => {
                  // Refetch posts when one is deleted
                  onPostDeleted?.()
                }}
              />
            )
          })}
        </div>
      )}

      {/* Create Post Modal */}
      <CreatePostModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        studioId={studio?._id || studio?.id || ''}
        studioName={studio?.name || 'Studio'}
        onSuccess={() => {
          // Refetch posts after successful creation
          onPostCreated?.()
        }}
      />
    </div>
  )
}
