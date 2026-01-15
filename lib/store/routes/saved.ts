import { EndpointBuilder } from '@reduxjs/toolkit/query/react'

// Saved item types
export interface SavedItem {
  _id: string
  user: string
  entityId: string
  entityType: 'Project' | 'Post' | 'Reel' | 'Job'
  createdAt: string
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

export interface PaginationParams {
  page?: number
  limit?: number
}

// Saved items endpoints
export const savedEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  // Get saved items
  getSavedItems: builder.query<PaginatedResponse<SavedItem>, PaginationParams>({
    query: (params) => ({
      url: '/saved',
      params,
    }),
    providesTags: ['SavedItem'],
  }),
  
  // Save/unsave items
  saveItem: builder.mutation<ApiResponse<SavedItem>, { entityId: string; entityType: 'Project' | 'Post' | 'Reel' | 'Job' }>({
    query: (data) => ({
      url: '/saved',
      method: 'POST',
      body: data,
    }),
    invalidatesTags: ['SavedItem'],
  }),
  
  unsaveItem: builder.mutation<ApiResponse<null>, { entityId: string; entityType: 'Project' | 'Post' | 'Reel' | 'Job' }>({
    query: ({ entityId, entityType }) => ({
      url: `/saved/${entityId}/${entityType}`,
      method: 'DELETE',
    }),
    invalidatesTags: ['SavedItem'],
  }),
})
