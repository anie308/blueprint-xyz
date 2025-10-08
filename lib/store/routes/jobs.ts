// Job types
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

// Job endpoints
export const jobEndpoints = (builder: any) => ({
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
})
