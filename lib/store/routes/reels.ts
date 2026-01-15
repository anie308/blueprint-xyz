import { EndpointBuilder } from '@reduxjs/toolkit/query/react'

// Reel types
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

export interface CreateReelRequest {
  title: string
  description?: string
  videoUrl: string
  thumbnailUrl?: string
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
}

// Reel endpoints
export const reelEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  // Reel CRUD
  getReels: builder.query<PaginatedResponse<Reel>, SearchParams>({
    query: (params) => ({
      url: '/reels',
      params,
    }),
    providesTags: ['Reel'],
  }),
  
  getReel: builder.query<ApiResponse<Reel>, string>({
    query: (id) => `/reels/${id}`,
    providesTags: (result: any, error: any, id: string) => [{ type: 'Reel', id }],
  }),
  
  createReel: builder.mutation<ApiResponse<Reel>, CreateReelRequest>({
    query: (reelData) => ({
      url: '/reels',
      method: 'POST',
      body: reelData,
    }),
    invalidatesTags: ['Reel', 'Feed', 'Trending'],
  }),
  
  updateReel: builder.mutation<ApiResponse<Reel>, { id: string; data: Partial<CreateReelRequest> }>({
    query: ({ id, data }) => ({
      url: `/reels/${id}`,
      method: 'PUT',
      body: data,
    }),
    invalidatesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Reel', id }, 'Feed', 'Trending'],
  }),
  
  deleteReel: builder.mutation<ApiResponse<null>, string>({
    query: (id) => ({
      url: `/reels/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: ['Reel', 'Feed', 'Trending'],
  }),
  
  // Reel interactions
  likeReel: builder.mutation<ApiResponse<null>, string>({
    query: (id) => ({
      url: `/reels/${id}/like`,
      method: 'POST',
    }),
    invalidatesTags: (result: any, error: any, id: string) => [{ type: 'Reel', id }, 'Feed', 'Trending'],
  }),
  
  unlikeReel: builder.mutation<ApiResponse<null>, string>({
    query: (id) => ({
      url: `/reels/${id}/like`,
      method: 'DELETE',
    }),
    invalidatesTags: (result: any, error: any, id: string) => [{ type: 'Reel', id }, 'Feed', 'Trending'],
  }),
  
  // Reel comments
  getReelComments: builder.query<PaginatedResponse<Comment>, { id: string; page?: number; limit?: number }>({
    query: ({ id, ...params }) => ({
      url: `/reels/${id}/comments`,
      params,
    }),
    providesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Comment', id }],
  }),
  
  addReelComment: builder.mutation<ApiResponse<Comment>, { id: string; data: CreateCommentRequest }>({
    query: ({ id, data }) => ({
      url: `/reels/${id}/comments`,
      method: 'POST',
      body: data,
    }),
    invalidatesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Comment', id }],
  }),
})
