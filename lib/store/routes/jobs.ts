import { EndpointBuilder } from '@reduxjs/toolkit/query/react'

// Job types
export interface Job {
  _id: string
  title: string
  description: string
  company?: string // Optional - may not be present
  location: string
  type?: 'full-time' | 'part-time' | 'contract' | 'internship' // Legacy field
  jobType?: 'full-time' | 'part-time' | 'contract' | 'internship' // New field from API
  salaryRange?: string // e.g., "50k-70k", "Negotiable"
  salary?: {
    min: number
    max: number
    currency: string
  }
  requirements?: string[] | string // Can be array or string
  benefits?: string[] | string // Can be array or string
  postedBy?: string // Legacy field
  postedById?: {
    id: string
    username: string
    profilePictureUrl?: string | null
  }
  postedByType?: 'User' | 'Studio'
  studio?: {
    _id: string
    name: string
    logoUrl?: string
    description?: string
    website?: string
  }
  applicationLink?: string | null
  expiresAt?: string | null
  applications?: string[]
  isActive?: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateJobRequest {
  title: string
  description: string
  company: string
  location: string
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship'
  salaryRange: string // e.g., "50k-70k", "Negotiable", "$80k-$120k"
  postedByType: 'User' | 'Studio'
  requirements: string[]
  benefits: string[]
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

// Job endpoints
export const jobEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  // Job CRUD
  getJobs: builder.query<PaginatedResponse<Job>, SearchParams>({
    query: (params) => ({
      url: '/jobs',
      params,
    }),
    providesTags: ['Job'],
  }),
  
  getJob: builder.query<ApiResponse<Job>, string>({
    query: (id) => `/jobs/${id}`,
    providesTags: (result: any, error: any, id: string) => [{ type: 'Job', id }],
  }),
  
  createJob: builder.mutation<ApiResponse<Job>, CreateJobRequest>({
    query: (jobData) => ({
      url: '/jobs',
      method: 'POST',
      body: jobData,
    }),
    invalidatesTags: ['Job'],
  }),
  
  updateJob: builder.mutation<ApiResponse<Job>, { id: string; data: Partial<CreateJobRequest> }>({
    query: ({ id, data }) => ({
      url: `/jobs/${id}`,
      method: 'PUT',
      body: data,
    }),
    invalidatesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Job', id }],
  }),
  
  deleteJob: builder.mutation<ApiResponse<null>, string>({
    query: (id) => ({
      url: `/jobs/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: ['Job'],
  }),

  // Job applications
  applyToJob: builder.mutation<ApiResponse<{ message: string }>, { id: string; data: JobApplicationRequest }>({
    query: ({ id, data }) => ({
      url: `/jobs/${id}/apply`,
      method: 'POST',
      body: data,
    }),
    invalidatesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Job', id }],
  }),
})

export interface JobApplicationRequest {
  coverLetter: string
  resumeUrl?: string
  portfolioUrl?: string
  additionalInfo?: string
}
