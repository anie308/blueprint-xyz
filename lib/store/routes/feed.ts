// Feed types
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

export interface PaginationParams {
  page?: number
  limit?: number
}

// Feed and trending endpoints
export const feedEndpoints = (builder: any) => ({
  // Personalized feed
  getFeed: builder.query<PaginatedResponse<Project | Post | Reel>, PaginationParams>({
    query: (params) => ({
      url: '/feed',
      params,
    }),
    providesTags: ['Feed'],
  }),
  
  // Trending content
  getTrending: builder.query<PaginatedResponse<Project | Post | Reel>, PaginationParams>({
    query: (params) => ({
      url: '/trending',
      params,
    }),
    providesTags: ['Trending'],
  }),
})
