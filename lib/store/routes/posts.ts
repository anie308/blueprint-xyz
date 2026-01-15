import { EndpointBuilder } from '@reduxjs/toolkit/query/react'
import type { User, Studio } from './types'

// Post types
export interface Post {
  _id: string
  title?: string
  content: string
  images?: string[]
  mediaUrl?: string // Support both images array and mediaUrl
  author: string | User
  authorId?: User | Studio // Support both formats
  authorType: 'User' | 'Studio'
  studio?: string | Studio
  studioId?: string | Studio // Support studio attribution
  likes: string[]
  likesCount?: number // Support both formats
  comments: string[]
  commentsCount?: number // Support both formats
  createdAt: string
  updatedAt: string
}

export interface CreatePostRequest {
  title?: string
  content: string
  images?: string[]
  mediaUrl?: string
  studioId?: string
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

export interface CreateCommentRequest {
  content: string
  entityId?: string // Post ID (can be inferred from URL, but API might require it)
  entityType?: 'Project' | 'Post' | 'Reel' // Can be inferred, but API might require it
  parentId?: string
}

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
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface SearchParams {
  page?: number
  limit?: number
  search?: string
  sort?: 'newest' | 'oldest' | 'popular' | 'views'
  filter?: string
  studio?: string // Filter posts by studio
}

// Post endpoints
export const postEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  // Post CRUD
  getPosts: builder.query<PaginatedResponse<Post>, SearchParams>({
    query: (params) => ({
      url: '/posts',
      params,
    }),
    providesTags: ['Post'],
  }),
  
  getPost: builder.query<ApiResponse<Post>, string>({
    query: (id) => `/posts/${id}`,
    providesTags: (result: any, error: any, id: string) => [{ type: 'Post', id }],
  }),
  
  createPost: builder.mutation<ApiResponse<Post>, CreatePostRequest>({
    query: (postData) => ({
      url: '/posts',
      method: 'POST',
      body: postData,
    }),
    invalidatesTags: ['Post', 'Feed', 'Trending'],
  }),
  
  updatePost: builder.mutation<ApiResponse<Post>, { id: string; data: Partial<CreatePostRequest> }>({
    query: ({ id, data }) => ({
      url: `/posts/${id}`,
      method: 'PUT',
      body: data,
    }),
    invalidatesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Post', id }, 'Feed', 'Trending'],
  }),
  
  deletePost: builder.mutation<ApiResponse<null>, string>({
    query: (id) => ({
      url: `/posts/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: ['Post', 'Feed', 'Trending'],
  }),
  
  // Post interactions
  likePost: builder.mutation<ApiResponse<null>, string>({
    query: (id) => ({
      url: `/posts/${id}/like`,
      method: 'POST',
    }),
    invalidatesTags: (result: any, error: any, id: string) => [{ type: 'Post', id }, 'Feed', 'Trending'],
  }),
  
  unlikePost: builder.mutation<ApiResponse<null>, string>({
    query: (id) => ({
      url: `/posts/${id}/like`,
      method: 'DELETE',
    }),
    invalidatesTags: (result: any, error: any, id: string) => [{ type: 'Post', id }, 'Feed', 'Trending'],
  }),
  
  // Post comments
  getPostComments: builder.query<PaginatedResponse<Comment>, { id: string; page?: number; limit?: number }>({
    query: ({ id, ...params }) => ({
      url: `/posts/${id}/comments`,
      params,
    }),
    providesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Comment', id }],
  }),
  
  addPostComment: builder.mutation<ApiResponse<Comment>, { id: string; data: CreateCommentRequest }>({
    query: ({ id, data }) => ({
      url: `/posts/${id}/comments`,
      method: 'POST',
      body: data,
    }),
    invalidatesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Comment', id }],
  }),
})
