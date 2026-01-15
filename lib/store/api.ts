import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  authEndpoints,
  projectEndpoints,
  postEndpoints,
  reelEndpoints,
  studioEndpoints,
  jobEndpoints,
  messageEndpoints,
  notificationEndpoints,
  savedEndpoints,
  feedEndpoints,
  healthEndpoints,
  // Re-export all types
  type User,
  type Studio,
  type Project,
  type Post,
  type Reel,
  type Job,
  type Comment,
  type Message,
  type Conversation,
  type Notification,
  type SavedItem,
  type ApiResponse,
  type PaginatedResponse,
  type SearchParams,
  type PaginationParams,
  type LoginRequest,
  type RegisterRequest,
  type UpdateUserRequest,
  type CreateProjectRequest,
  type CreatePostRequest,
  type CreateReelRequest,
  type CreateStudioRequest,
  type CreateJobRequest,
  type CreateCommentRequest,
  type SendMessageRequest,
  type JobApplicationRequest,
} from './routes'

// Base query with authentication and token refresh
const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    credentials: 'include', // Important for cookie-based refresh tokens
    prepareHeaders: (headers, { getState }) => {
      // Get token from Redux state or localStorage
      const state = getState() as any
      const token = state.auth?.token || (typeof window !== 'undefined' ? localStorage.getItem('blueprint_auth_token') : null)
      
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  })

  let result = await baseQuery(args, api, extraOptions)

  // Handle 401 Unauthorized - token expired
  if (result.error && result.error.status === 401) {
    // Try to refresh token
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh',
        method: 'POST',
      },
      api,
      extraOptions
    )

    if (refreshResult.data) {
        // Store new token
        const refreshData = refreshResult.data as any
        if (refreshData.success && refreshData.data?.token) {
          const token = refreshData.data.token
          api.dispatch({ type: 'auth/updateToken', payload: token })
          if (typeof window !== 'undefined') {
            localStorage.setItem('blueprint_auth_token', token)
          }

          // Retry original query with new token
          result = await baseQuery(args, api, extraOptions)
        } else {
        // Refresh failed - logout user
        api.dispatch({ type: 'auth/logout' })
        if (typeof window !== 'undefined') {
          localStorage.removeItem('blueprint_auth_token')
          // Redirect to login if in browser
          if (window.location.pathname !== '/auth/login') {
            window.location.href = '/auth/login'
          }
        }
      }
    } else {
      // Refresh failed - logout user
      api.dispatch({ type: 'auth/logout' })
      if (typeof window !== 'undefined') {
        localStorage.removeItem('blueprint_auth_token')
        if (window.location.pathname !== '/auth/login') {
          window.location.href = '/auth/login'
        }
      }
    }
  }

  return result
}

// RTK Query API slice
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'User',
    'Studio',
    'Project',
    'Post',
    'Reel',
    'Job',
    'Comment',
    'Message',
    'Conversation',
    'Notification',
    'SavedItem',
    'Feed',
    'Trending'
  ],
  endpoints: (builder) => ({
    // Combine all endpoint categories
    ...authEndpoints(builder),
    ...projectEndpoints(builder),
    ...postEndpoints(builder),
    ...reelEndpoints(builder),
    ...studioEndpoints(builder),
    ...jobEndpoints(builder),
    ...messageEndpoints(builder),
    ...notificationEndpoints(builder),
    ...savedEndpoints(builder),
    ...feedEndpoints(builder),
    ...healthEndpoints(builder),
  }),
})

export const {
  // Auth
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useLogoutMutation,
  useRefreshTokenMutation,
  
  // Users
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateProfilePictureMutation,
  
  // Projects
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useLikeProjectMutation,
  useUnlikeProjectMutation,
  useGetProjectCommentsQuery,
  useAddProjectCommentMutation,
  
  // Posts
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useGetPostCommentsQuery,
  useAddPostCommentMutation,
  
  // Reels
  useGetReelsQuery,
  useGetReelQuery,
  useCreateReelMutation,
  useUpdateReelMutation,
  useDeleteReelMutation,
  useLikeReelMutation,
  useUnlikeReelMutation,
  useGetReelCommentsQuery,
  useAddReelCommentMutation,
  
  // Studios
  useGetStudiosQuery,
  useGetStudioQuery,
  useCreateStudioMutation,
  useUpdateStudioMutation,
  useDeleteStudioMutation,
  useGetStudioMembersQuery,
  useAddStudioMemberMutation,
  useRemoveStudioMemberMutation,
  useGetStudioJobsQuery,
  useGetStudioProjectsQuery,
  
  // Jobs
  useGetJobsQuery,
  useGetJobQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useApplyToJobMutation,
  
  // Messages
  useGetConversationsQuery,
  useGetConversationQuery,
  useSendMessageMutation,
  useSendMessageToConversationMutation,
  useMarkMessageAsReadMutation,
  
  // Notifications
  useGetNotificationsQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  
  // Saved Items
  useGetSavedItemsQuery,
  useSaveItemMutation,
  useUnsaveItemMutation,
  
  // Feed & Trending
  useGetFeedQuery,
  useGetTrendingQuery,
  
  // Health
  useGetHealthQuery,
} = api
