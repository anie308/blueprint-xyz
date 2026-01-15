import { EndpointBuilder } from '@reduxjs/toolkit/query/react'

// Message types
export interface Message {
  _id: string
  content: string
  sender: string
  conversation: string
  read: boolean
  createdAt: string
  updatedAt: string
}

export interface Conversation {
  _id: string
  participants: string[]
  lastMessage?: Message
  unreadCount: number
  createdAt: string
  updatedAt: string
}

export interface SendMessageRequest {
  content: string
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

// Message endpoints
export const messageEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
  // Conversation management
  getConversations: builder.query<PaginatedResponse<Conversation>, PaginationParams>({
    query: (params) => ({
      url: '/messages/conversations',
      params,
    }),
    providesTags: ['Conversation'],
  }),
  
  getConversation: builder.query<PaginatedResponse<Message>, { id: string; page?: number; limit?: number }>({
    query: ({ id, ...params }) => ({
      url: `/messages/conversations/${id}`,
      params,
    }),
    providesTags: (result: any, error: any, { id }: { id: string }) => [{ type: 'Message', id }],
  }),
  
  // Message sending
  sendMessage: builder.mutation<ApiResponse<Message>, { userId: string; data: SendMessageRequest }>({
    query: ({ userId, data }) => ({
      url: `/messages/conversations/${userId}`,
      method: 'POST',
      body: data,
    }),
    invalidatesTags: ['Conversation', 'Message'],
  }),
  
  sendMessageToConversation: builder.mutation<ApiResponse<Message>, { id: string; data: SendMessageRequest }>({
    query: ({ id, data }) => ({
      url: `/messages/${id}`,
      method: 'POST',
      body: data,
    }),
    invalidatesTags: ['Conversation', 'Message'],
  }),
  
  // Message status
  markMessageAsRead: builder.mutation<ApiResponse<null>, string>({
    query: (messageId) => ({
      url: `/messages/${messageId}/read`,
      method: 'PATCH',
    }),
    invalidatesTags: ['Message', 'Conversation'],
  }),
})
