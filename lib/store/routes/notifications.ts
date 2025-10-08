// Notification types
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

// Notification endpoints
export const notificationEndpoints = (builder: any) => ({
  // Get notifications
  getNotifications: builder.query<PaginatedResponse<Notification>, PaginationParams>({
    query: (params) => ({
      url: '/notifications',
      params,
    }),
    providesTags: ['Notification'],
  }),
  
  // Mark notifications as read
  markNotificationAsRead: builder.mutation<ApiResponse<null>, string>({
    query: (id) => ({
      url: `/notifications/${id}/read`,
      method: 'PATCH',
    }),
    invalidatesTags: ['Notification'],
  }),
  
  markAllNotificationsAsRead: builder.mutation<ApiResponse<null>, void>({
    query: () => ({
      url: '/notifications/read-all',
      method: 'PATCH',
    }),
    invalidatesTags: ['Notification'],
  }),
})
