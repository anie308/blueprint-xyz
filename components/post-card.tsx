"use client"

import { useState, useMemo, useEffect } from "react"
import { MessageIcon, BookmarkIcon } from "./icons"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { Skeleton } from "./ui/skeleton"
import { useLikePostMutation, useUnlikePostMutation, useGetPostCommentsQuery, useAddPostCommentMutation, useDeletePostMutation } from "@/lib/store/api"
import { AuthService } from "@/lib/services/authService"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"
import { toast } from "sonner"
import { Trash2, MoreVertical } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Studio type for studioId prop
type Studio = {
  _id?: string
  id?: string
  name?: string
  slug?: string
}

interface PostCardProps {
  id?: string
  _id?: string // Support API format
  authorId?: {
    fullName: string
    username: string
    profilePictureUrl?: string
    _id?: string
    id?: string
  }
  author?: any // Support API format (can be string or object)
  studio?: string | Studio // Support both string and Studio object
  studioId?: string | Studio // Support studio attribution from API guide
  title?: string
  content?: string
  image?: string
  images?: string[] // Support API format
  mediaUrl?: string // Support mediaUrl from API guide
  appreciations?: number
  comments?: number
  timestamp?: string
  createdAt?: string // Support API format
  likes?: string[] // Array of user IDs who liked the post
  onDeleted?: () => void // Callback when post is deleted
}

export function PostCard({
  id,
  _id,
  authorId,
  author,
  studio,
  studioId,
  title,
  content,
  image,
  images,
  mediaUrl,
  appreciations: initialAppreciations,
  comments: initialComments,
  timestamp,
  createdAt,
  likes: likesArray = [],
  onDeleted,
}: PostCardProps) {
  const currentUser = AuthService.getCurrentUser()
  const userId = currentUser?._id || currentUser?.id
  
  // Normalize post ID
  const postId = id || _id || ''
  
  // Normalize author data
  const normalizedAuthor = useMemo(() => {
    // If authorId is provided as an object, use it directly
    if (authorId && typeof authorId === 'object') {
      return {
        fullName: authorId.fullName || 'User',
        username: authorId.username || 'user',
        profilePictureUrl: authorId.profilePictureUrl,
        _id: authorId._id || authorId.id,
        id: authorId._id || authorId.id
      }
    }
    
    // If author is provided as an object, use it
    if (author && typeof author === 'object') {
      return {
        fullName: author.fullName || author.name || 'User',
        username: author.username || 'user',
        profilePictureUrl: author.profilePicture || author.profilePictureUrl,
        _id: author._id || author.id,
        id: author._id || author.id
      }
    }
    
    // If author is a string ID, check if it matches current user
    if (author && typeof author === 'string' && currentUser) {
      const authorIdStr = author
      const currentUserIdStr = String(userId || '')
      
      // If the author ID matches current user, use current user's data
      if (authorIdStr === currentUserIdStr) {
        return {
          fullName: currentUser.fullName || currentUser.name || 'User',
          username: currentUser.username || 'user',
          profilePictureUrl: currentUser.profilePicture || currentUser.profilePictureUrl,
          _id: currentUser._id || currentUser.id,
          id: currentUser._id || currentUser.id
        }
      }
    }
    
    // If authorId is a string ID, check if it matches current user
    if (authorId && typeof authorId === 'string' && currentUser) {
      const authorIdStr = authorId
      const currentUserIdStr = String(userId || '')
      
      // If the author ID matches current user, use current user's data
      if (authorIdStr === currentUserIdStr) {
        return {
          fullName: currentUser.fullName || currentUser.name || 'User',
          username: currentUser.username || 'user',
          profilePictureUrl: currentUser.profilePicture || currentUser.profilePictureUrl,
          _id: currentUser._id || currentUser.id,
          id: currentUser._id || currentUser.id
        }
      }
    }
    
    // Default fallback - return default author object
    return {
      fullName: 'User',
      username: 'user',
      profilePictureUrl: undefined,
      _id: undefined,
      id: undefined
    }
  }, [authorId, author, currentUser, userId])
  
  // Check if current user is the author
  const isAuthor = useMemo(() => {
    if (!userId || !normalizedAuthor) return false
    const authorId = normalizedAuthor._id || normalizedAuthor.id
    return authorId && String(authorId) === String(userId)
  }, [userId, normalizedAuthor])
  
  // Normalize studio
  const normalizedStudio = studio || studioId
  const studioName = typeof normalizedStudio === 'string' 
    ? normalizedStudio 
    : (normalizedStudio?.name || normalizedStudio?.slug || 'General')
  
  // Normalize image (support both images array and mediaUrl from API guide)
  const normalizedImage = image || mediaUrl || (images && images.length > 0 ? images[0] : undefined)
  
  // Normalize title (optional according to API guide)
  const normalizedTitle = title
  
  // Normalize appreciations and comments
  const normalizedAppreciations = initialAppreciations ?? (Array.isArray(likesArray) ? likesArray.length : 0)
  const normalizedComments = initialComments ?? 0
  
  // Normalize timestamp
  const normalizedTimestamp = timestamp || (createdAt ? formatDistanceToNow(new Date(createdAt), { addSuffix: true }) : 'Recently')

  // Check if current user has liked the post (initial check from props)
  const initialIsLiked = useMemo(() => {
    if (!userId || !Array.isArray(likesArray)) return false
    return likesArray.some((likeId: any) => {
      const likeUserId = typeof likeId === 'string' ? likeId : likeId._id || likeId.id
      return String(likeUserId) === String(userId)
    })
  }, [userId, likesArray])

  // Local state for likes array to track optimistic updates
  const [localLikesArray, setLocalLikesArray] = useState<string[]>(() => {
    if (!Array.isArray(likesArray)) return []
    return likesArray.map((likeId: any) => {
      return typeof likeId === 'string' ? likeId : (likeId._id || likeId.id || String(likeId))
    }).filter(Boolean)
  })

  const [appreciations, setAppreciations] = useState(normalizedAppreciations)
  const [isAppreciated, setIsAppreciated] = useState(initialIsLiked)
  const [isSaved, setIsSaved] = useState(false)
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [commentText, setCommentText] = useState("")
  
  // Update local likes array when prop changes
  useEffect(() => {
    if (Array.isArray(likesArray)) {
      const normalizedLikes = likesArray.map((likeId: any) => {
        return typeof likeId === 'string' ? likeId : (likeId._id || likeId.id || String(likeId))
      }).filter(Boolean)
      setLocalLikesArray(normalizedLikes)
    }
  }, [likesArray])
  
  // Update appreciations and liked state when normalized values change
  useEffect(() => {
    setAppreciations(normalizedAppreciations)
  }, [normalizedAppreciations])
  
  // Recalculate isLiked based on local likes array
  const currentIsLiked = useMemo(() => {
    if (!userId || !Array.isArray(localLikesArray) || localLikesArray.length === 0) return false
    return localLikesArray.some((likeId: string) => String(likeId) === String(userId))
  }, [userId, localLikesArray])
  
  useEffect(() => {
    setIsAppreciated(currentIsLiked)
  }, [currentIsLiked])

  // Like/Unlike mutations
  const [likePost, { isLoading: isLiking }] = useLikePostMutation()
  const [unlikePost, { isLoading: isUnliking }] = useUnlikePostMutation()

  // Comments
  const { data: commentsData, isLoading: isLoadingComments, refetch: refetchComments } = useGetPostCommentsQuery(
    { id: postId, page: 1, limit: 50 },
    { skip: !commentsOpen || !postId }
  )
  const [addComment, { isLoading: isAddingComment }] = useAddPostCommentMutation()

  // Delete post
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const comments = (commentsData as any)?.data || []
  const commentsCount = comments.length || normalizedComments

  const handleDelete = async () => {
    if (!postId) {
      toast.error("Post ID is missing")
      return
    }

    try {
      await deletePost(postId).unwrap()
      toast.success("Post deleted successfully")
      onDeleted?.()
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete post")
    } finally {
      setShowDeleteDialog(false)
    }
  }

  const handleLike = async () => {
    if (!userId) {
      toast.error("Please log in to like posts")
      return
    }

    if (!postId) {
      toast.error("Post ID is missing")
      return
    }

    const userIdStr = String(userId)
    const currentlyLiked = currentIsLiked

    try {
      if (currentlyLiked) {
        // Optimistic update: remove like immediately
        setLocalLikesArray(prev => prev.filter(id => String(id) !== userIdStr))
        setAppreciations(prev => Math.max(0, prev - 1))
        setIsAppreciated(false)
        
        // Call API
        await unlikePost(postId).unwrap()
      } else {
        // Optimistic update: add like immediately
        setLocalLikesArray(prev => {
          if (prev.includes(userIdStr)) return prev
          return [...prev, userIdStr]
        })
        setAppreciations(prev => prev + 1)
        setIsAppreciated(true)
        
        // Call API
        await likePost(postId).unwrap()
      }
    } catch (error: any) {
      // Revert optimistic update on error
      if (currentlyLiked) {
        setLocalLikesArray(prev => {
          if (!prev.includes(userIdStr)) {
            return [...prev, userIdStr]
          }
          return prev
        })
        setAppreciations(prev => prev + 1)
        setIsAppreciated(true)
      } else {
        setLocalLikesArray(prev => prev.filter(id => String(id) !== userIdStr))
        setAppreciations(prev => Math.max(0, prev - 1))
        setIsAppreciated(false)
      }
      toast.error(error?.data?.message || "Failed to update like")
    }
  }

  const handleAddComment = async () => {
    if (!commentText.trim() || !userId) {
      toast.error("Please log in and enter a comment")
      return
    }

    if (!postId) {
      toast.error("Post ID is missing")
      return
    }

    try {
      await addComment({
        id: postId,
        data: { 
          content: commentText.trim(),
          entityId: postId,
          entityType: 'Post' as const
        }
      }).unwrap()
      setCommentText("")
      refetchComments()
      toast.success("Comment added")
    } catch (error: any) {
      // Log full error for debugging
      console.error("Comment error:", error)
      const errorMessage = error?.data?.message || error?.data?.error || error?.message || "Failed to add comment"
      const validationErrors = error?.data?.details?.validationErrors
      if (validationErrors && Array.isArray(validationErrors)) {
        const validationMessages = validationErrors.map((err: any) => err.message).join(", ")
        toast.error(validationMessages || errorMessage)
      } else {
        toast.error(errorMessage)
      }
    }
  }

  return (
    <article className="border border-border rounded-sm bg-card overflow-hidden hover:border-primary/30 transition-colors">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <Avatar className="w-10 h-10 rounded-sm">
          <AvatarImage src={normalizedAuthor?.profilePictureUrl || "/placeholder.svg"} />
          <AvatarFallback className="rounded-sm bg-secondary text-foreground">
            {normalizedAuthor?.fullName?.slice(0, 2).toUpperCase() || "AN"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
         
           <div className="flex items-center gap-2">
           <span className="font-semibold text-sm truncate">{normalizedAuthor?.fullName || "Anonymous"}</span>
           { (normalizedStudio && studioName !== 'General') && ( 
             <Badge variant="secondary" className="text-xs font-mono rounded-sm">
               {studioName}
             </Badge>
           )}
         </div>
         
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>@{normalizedAuthor?.username || 'user'}</span>
            <span>•</span>
            <span>{normalizedTimestamp}</span>
          </div>
        </div>
        
        {/* Post Actions Menu (only show if user is author) */}
        {isAuthor && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => setShowDeleteDialog(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Content */}
      <div className="p-4">
        {normalizedTitle && (
          <h3 className="font-bold text-lg mb-2 text-balance">{normalizedTitle}</h3>
        )}
        {content && <p className="text-muted-foreground leading-relaxed mb-4">{content}</p>}
        {normalizedImage && (
          <div className="relative w-full aspect-video rounded-sm overflow-hidden border border-border">
            <Image src={normalizedImage || "/placeholder.svg"} alt={normalizedTitle || "Post image"} fill className="object-cover" />
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 px-4 pb-4 border-t border-border pt-3">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLike} 
          disabled={isLiking || isUnliking}
          className={isAppreciated ? "text-accent" : ""}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isAppreciated ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            className="w-5 h-5 mr-2"
          >
            <path d="M7 10v12" />
            <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
          </svg>
          <span className="font-medium">{appreciations || normalizedAppreciations}</span>
        </Button>

        <Dialog open={commentsOpen} onOpenChange={setCommentsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <MessageIcon className="w-5 h-5 mr-2" />
              <span className="font-medium">{commentsCount}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Comments</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Add Comment */}
              <div className="space-y-2">
                <Textarea
                  placeholder="Add a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleAddComment} 
                    disabled={!commentText.trim() || isAddingComment}
                    size="sm"
                  >
                    {isAddingComment ? "Posting..." : "Post Comment"}
                  </Button>
                </div>
              </div>

              {/* Comments List */}
              <ScrollArea className="max-h-[400px] pr-4">
                {isLoadingComments ? (
                  <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="flex gap-3">
                        <Skeleton className="w-10 h-10 rounded-sm" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-16 w-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : comments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No comments yet. Be the first to comment!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {comments.map((comment: any) => {
                      const author = comment.author || {}
                      const authorName = typeof author === 'string' 
                        ? 'User' 
                        : author.fullName || author.name || 'User'
                      const authorUsername = typeof author === 'string'
                        ? 'user'
                        : author.username || 'user'
                      const authorAvatar = typeof author === 'string'
                        ? undefined
                        : author.profilePicture || author.profilePictureUrl

                      return (
                        <div key={comment._id || comment.id} className="flex gap-3">
                          <Avatar className="w-10 h-10 rounded-sm">
                            <AvatarImage src={authorAvatar} />
                            <AvatarFallback className="rounded-sm bg-secondary text-foreground">
                              {authorName.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">{authorName}</span>
                              <span className="text-xs text-muted-foreground">@{authorUsername}</span>
                              <span className="text-xs text-muted-foreground">
                                • {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-sm text-foreground leading-relaxed">{comment.content}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </ScrollArea>
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex-1" />

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSaved(!isSaved)}
          className={isSaved ? "text-primary" : ""}
        >
          <BookmarkIcon className="w-5 h-5" />
        </Button>
      </div>
    </article>
  )
}
