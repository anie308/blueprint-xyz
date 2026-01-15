// Error handling utilities for API responses

export interface ApiError {
  success: false
  message: string
  error?: string
  details?: {
    validationErrors?: Array<{
      field: string
      message: string
      value: any
    }>
  }
}

/**
 * Handles API errors and returns a user-friendly error message
 */
export const handleApiError = (error: unknown): string => {
  // Handle RTK Query errors
  if (error && typeof error === 'object' && 'data' in error) {
    const apiError = error.data as ApiError
    
    if (apiError?.message) {
      return apiError.message
    }

    if (apiError?.details?.validationErrors) {
      return apiError.details.validationErrors
        .map(err => err.message)
        .join(', ')
    }

    if (apiError?.error) {
      return apiError.error
    }
  }

  // Handle fetch/network errors
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as any).status
    
    if (status === 401) {
      return 'Authentication required. Please log in.'
    }

    if (status === 403) {
      return 'You do not have permission to perform this action.'
    }

    if (status === 404) {
      return 'Resource not found.'
    }

    if (status === 422) {
      return 'Invalid data provided. Please check your input.'
    }

    if (status === 500) {
      return 'Server error. Please try again later.'
    }

    if (status === 'FETCH_ERROR' || status === 'PARSING_ERROR') {
      return 'Network error. Please check your connection.'
    }
  }

  // Handle Error instances
  if (error instanceof Error) {
    return error.message
  }

  return 'An unexpected error occurred. Please try again.'
}

/**
 * Extracts validation errors from API error response
 */
export const getValidationErrors = (error: unknown): Record<string, string> => {
  const errors: Record<string, string> = {}

  if (error && typeof error === 'object' && 'data' in error) {
    const apiError = error.data as ApiError
    
    if (apiError?.details?.validationErrors) {
      apiError.details.validationErrors.forEach(err => {
        errors[err.field] = err.message
      })
    }
  }

  return errors
}

/**
 * Checks if error is a network error
 */
export const isNetworkError = (error: unknown): boolean => {
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as any).status
    return status === 'FETCH_ERROR' || status === 'PARSING_ERROR'
  }
  return false
}

/**
 * Checks if error is an authentication error
 */
export const isAuthError = (error: unknown): boolean => {
  if (error && typeof error === 'object' && 'status' in error) {
    return (error as any).status === 401
  }
  return false
}
