import { EndpointBuilder } from '@reduxjs/toolkit/query/react'

// Project types
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

export interface CreateProjectRequest {
  title: string
  description: string
  images: string[]
  tags: string[]
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

// Project endpoints
export const projectEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  // Project CRUD
  getProjects: builder.query<PaginatedResponse<Project>, SearchParams>({
    query: (params) => ({
      url: '/projects',
      params,
    }),
    providesTags: ['Project'],
  }),
  
  getProject: builder.query<ApiResponse<Project>, string>({
    query: (id) => `/projects/${id}`,
    providesTags: (result: any, error: any, id: string) => [{ type: 'Project', id }],
  }),
  
  createProject: builder.mutation<ApiResponse<Project>, CreateProjectRequest>({
    query: (projectData) => ({
      url: '/projects',
      method: 'POST',
      body: projectData,
    }),
    invalidatesTags: ['Project', 'Feed', 'Trending'],
  }),
  
  updateProject: builder.mutation<ApiResponse<Project>, { id: string; data: Partial<CreateProjectRequest> }>({
    query: ({ id, data }) => ({
      url: `/projects/${id}`,
      method: 'PUT',
      body: data,
    }),
    invalidatesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Project', id }, 'Feed', 'Trending'],
  }),
  
  deleteProject: builder.mutation<ApiResponse<null>, string>({
    query: (id) => ({
      url: `/projects/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: ['Project', 'Feed', 'Trending'],
  }),
  
  // Project interactions
  likeProject: builder.mutation<ApiResponse<null>, string>({
    query: (id) => ({
      url: `/projects/${id}/like`,
      method: 'POST',
    }),
    invalidatesTags: (result: any, error: any, id: string) => [{ type: 'Project', id }, 'Feed', 'Trending'],
  }),
  
  unlikeProject: builder.mutation<ApiResponse<null>, string>({
    query: (id) => ({
      url: `/projects/${id}/like`,
      method: 'DELETE',
    }),
    invalidatesTags: (result: any, error: any, id: string) => [{ type: 'Project', id }, 'Feed', 'Trending'],
  }),
  
  // Project comments
  getProjectComments: builder.query<PaginatedResponse<Comment>, { id: string; page?: number; limit?: number }>({
    query: ({ id, ...params }) => ({
      url: `/projects/${id}/comments`,
      params,
    }),
    providesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Comment', id }],
  }),
  
  addProjectComment: builder.mutation<ApiResponse<Comment>, { id: string; data: CreateCommentRequest }>({
    query: ({ id, data }) => ({
      url: `/projects/${id}/comments`,
      method: 'POST',
      body: data,
    }),
    invalidatesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Comment', id }],
  }),
})
