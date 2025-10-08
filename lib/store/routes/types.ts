// Shared types for all API routes

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface SearchParams {
  page?: number
  limit?: number
  search?: string
  sort?: 'newest' | 'oldest' | 'popular' | 'views'
  filter?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
}

// User types
export interface User {
  _id: string
  username: string
  email: string
  fullName: string
  bio?: string
  location?: string
  website?: string
  profilePicture?: string
  followers: string[]
  following: string[]
  createdAt: string
  updatedAt: string
}

// Content types
export interface Project {
  _id: string
  title: string
  description: string
  images: string[]
  tags: string[]
  author: string
  authorType: 'User' | 'Studio'
  likes: string[]
  views: number
  comments: string[]
  createdAt: string
  updatedAt: string
}

export interface Post {
  _id: string
  content: string
  images?: string[]
  author: string
  authorType: 'User' | 'Studio'
  likes: string[]
  comments: string[]
  createdAt: string
  updatedAt: string
}

export interface Reel {
  _id: string
  title: string
  description?: string
  videoUrl: string
  thumbnailUrl?: string
  author: string
  authorType: 'User' | 'Studio'
  likes: string[]
  views: number
  comments: string[]
  createdAt: string
  updatedAt: string
}

export interface Studio {
  _id: string
  name: string
  slug: string
  description: string
  coverImage?: string
  owner: string
  members: string[]
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export interface Job {
  _id: string
  title: string
  description: string
  company: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  salary?: {
    min: number
    max: number
    currency: string
  }
  requirements: string[]
  benefits: string[]
  postedBy: string
  applications: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Comment {
  _id: string
  content: string
  author: string
  entityId: string
  entityType: 'Project' | 'Post' | 'Reel'
  parentId?: string
  likes: string[]
  createdAt: string
  updatedAt: string
}

export interface Message {
  _id: string
  content: string
  sender: string
  conversation: string
  read: boolean
  createdAt: string
  updatedAt: string
}

export interface Conversation {
  _id: string
  participants: string[]
  lastMessage?: Message
  unreadCount: number
  createdAt: string
  updatedAt: string
}

export interface Notification {
  _id: string
  type: 'like' | 'comment' | 'follow' | 'mention' | 'job_application'
  recipient: string
  sender?: string
  entityId?: string
  entityType?: 'Project' | 'Post' | 'Reel' | 'Job'
  read: boolean
  createdAt: string
}

export interface SavedItem {
  _id: string
  user: string
  entityId: string
  entityType: 'Project' | 'Post' | 'Reel' | 'Job'
  createdAt: string
}

export interface HealthResponse {
  status: string
  timestamp: string
}

// Request types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  fullName: string
  username: string
  email: string
  password: string
}

export interface UpdateUserRequest {
  fullName?: string
  bio?: string
  location?: string
  website?: string
}

export interface CreateProjectRequest {
  title: string
  description: string
  images: string[]
  tags: string[]
}

export interface CreatePostRequest {
  content: string
  images?: string[]
}

export interface CreateReelRequest {
  title: string
  description?: string
  videoUrl: string
  thumbnailUrl?: string
}

export interface CreateStudioRequest {
  name: string
  description: string
  isPublic: boolean
}

export interface CreateJobRequest {
  title: string
  description: string
  company: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  salary?: {
    min: number
    max: number
    currency: string
  }
  requirements: string[]
  benefits: string[]
}

export interface CreateCommentRequest {
  content: string
  parentId?: string
}

export interface SendMessageRequest {
  content: string
}
