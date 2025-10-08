// Health check types
export interface HealthResponse {
  status: string
  timestamp: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

// Health check endpoints
export const healthEndpoints = (builder: any) => ({
  // Health check
  getHealth: builder.query<ApiResponse<HealthResponse>, void>({
    query: () => '/health',
  }),
})
