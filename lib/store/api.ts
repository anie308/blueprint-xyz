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
} from './routes'

// Base query with authentication
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
  prepareHeaders: (headers, { getState }) => {
    // Get token from Redux state
    const token = (getState() as any).auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

// RTK Query API slice
export const api = createApi({
  reducerPath: 'api',
  baseQuery,
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
