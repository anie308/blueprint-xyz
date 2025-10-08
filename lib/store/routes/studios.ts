// Studio types
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

export interface CreateStudioRequest {
  name: string
  description: string
  isPublic: boolean
}

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

// Studio endpoints
export const studioEndpoints = (builder: any) => ({
  // Studio CRUD
  getStudios: builder.query<PaginatedResponse<Studio>, SearchParams>({
    query: (params) => ({
      url: '/studios',
      params,
    }),
    providesTags: ['Studio'],
  }),
  
  getStudio: builder.query<ApiResponse<Studio>, string>({
    query: (id) => `/studios/${id}`,
    providesTags: (result: any, error: any, id: string) => [{ type: 'Studio', id }],
  }),
  
  createStudio: builder.mutation<ApiResponse<Studio>, CreateStudioRequest>({
    query: (studioData) => ({
      url: '/studios',
      method: 'POST',
      body: studioData,
    }),
    invalidatesTags: ['Studio'],
  }),
  
  updateStudio: builder.mutation<ApiResponse<Studio>, { id: string; data: Partial<CreateStudioRequest> }>({
    query: ({ id, data }) => ({
      url: `/studios/${id}`,
      method: 'PUT',
      body: data,
    }),
    invalidatesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Studio', id }],
  }),
  
  deleteStudio: builder.mutation<ApiResponse<null>, string>({
    query: (id) => ({
      url: `/studios/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: ['Studio'],
  }),
  
  // Studio members
  getStudioMembers: builder.query<PaginatedResponse<User>, { id: string; page?: number; limit?: number }>({
    query: ({ id, ...params }) => ({
      url: `/studios/${id}/members`,
      params,
    }),
    providesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Studio', id }],
  }),
  
  addStudioMember: builder.mutation<ApiResponse<null>, { id: string; userId: string }>({
    query: ({ id, userId }) => ({
      url: `/studios/${id}/members`,
      method: 'POST',
      body: { userId },
    }),
    invalidatesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Studio', id }],
  }),
  
  removeStudioMember: builder.mutation<ApiResponse<null>, { id: string; userId: string }>({
    query: ({ id, userId }) => ({
      url: `/studios/${id}/members/${userId}`,
      method: 'DELETE',
    }),
    invalidatesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Studio', id }],
  }),
  
  // Studio content
  getStudioJobs: builder.query<PaginatedResponse<Job>, { id: string; page?: number; limit?: number }>({
    query: ({ id, ...params }) => ({
      url: `/studios/${id}/jobs`,
      params,
    }),
    providesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Studio', id }],
  }),
  
  getStudioProjects: builder.query<PaginatedResponse<Project>, { id: string; page?: number; limit?: number }>({
    query: ({ id, ...params }) => ({
      url: `/studios/${id}/projects`,
      params,
    }),
    providesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Studio', id }],
  }),
})
