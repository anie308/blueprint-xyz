import { EndpointBuilder } from '@reduxjs/toolkit/query/react'

// Auth types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  fullName: string
  username: string
  email: string
  password: string
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

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

// Auth endpoints
export const authEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  // Authentication endpoints
  login: builder.mutation<ApiResponse<{ user: User; token: string }>, LoginRequest>({
    query: (credentials) => ({
      url: '/auth/login',
      method: 'POST',
      body: credentials,
      credentials: 'include', // Important for refresh token cookie
    }),
    invalidatesTags: ['User'],
  }),
  
  register: builder.mutation<ApiResponse<{ user: User; token: string }>, RegisterRequest>({
    query: (userData) => ({
      url: '/auth/register',
      method: 'POST',
      body: userData,
      credentials: 'include', // Important for refresh token cookie
    }),
    invalidatesTags: ['User'],
  }),
  
  getMe: builder.query<ApiResponse<User>, void>({
    query: () => '/auth/me',
    providesTags: ['User'],
  }),
  
  logout: builder.mutation<ApiResponse<null>, void>({
    query: () => ({
      url: '/auth/logout',
      method: 'POST',
      credentials: 'include', // Important for clearing refresh token cookie
    }),
    invalidatesTags: ['User'],
  }),

  refreshToken: builder.mutation<ApiResponse<{ token: string }>, void>({
    query: () => ({
      url: '/auth/refresh',
      method: 'POST',
      credentials: 'include', // Important for refresh token cookie
    }),
  }),

  // User endpoints
  getUser: builder.query<ApiResponse<User>, string>({
    query: (username) => `/users/${username}`,
    providesTags: (result: any, error: any, username: string) => [{ type: 'User', id: username }],
  }),
  
  updateUser: builder.mutation<ApiResponse<User>, Partial<User>>({
    query: (userData) => ({
      url: '/users/me',
      method: 'PUT',
      body: userData,
    }),
    invalidatesTags: ['User'],
  }),
  
  updateProfilePicture: builder.mutation<ApiResponse<{ user: User }>, FormData>({
    query: (formData) => ({
      url: '/users/me/profile-picture',
      method: 'PATCH',
      body: formData,
    }),
    invalidatesTags: ['User'],
  }),
})
