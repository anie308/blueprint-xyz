import { useState } from "react"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon } from "@/components/icons"
import { Plus, Filter } from "lucide-react"
import Link from "next/link"

interface StudioPostsProps {
  posts: any[]
  studio: any
}

export function StudioPosts({ posts, studio }: StudioPostsProps) {
  console.log(posts, "posts")
  console.log(studio, "studio")
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest')

  const filteredPosts = posts?.filter(post => 
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
            {posts.length} posts in {studio?.name}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/create">
            <Plus className="w-4 h-4 mr-2" />
            Create Post
          </Link>
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
            <Button asChild>
              <Link href="/dashboard/create">
                <Plus className="w-4 h-4 mr-2" />
                Create First Post
              </Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {sortedPosts.map((post: any) => (
            <PostCard
              key={post._id}
              id={post._id}
              authorId={post.author}
              studio={studio.name}
              title={post.title}
              content={post.content}
              image={post.images?.[0]}
              appreciations={post.appreciations || 0}
              comments={post.comments || 0}
              timestamp={new Date(post.createdAt).toLocaleDateString()}
            />
          ))}
        </div>
      )}
    </div>
  )
}
