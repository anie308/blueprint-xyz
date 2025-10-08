# Redux Store Integration

This directory contains the complete Redux Toolkit integration for Blueprint.xyz, connecting all API endpoints with React Redux for state management.

## 🏗️ Architecture

### Store Structure
```
lib/store/
├── index.ts                 # Main store configuration
├── api.ts                   # RTK Query API slice with all endpoints
├── slices/
│   ├── authSlice.ts         # Authentication state management
│   └── uiSlice.ts           # UI state management (modals, toasts, etc.)
├── providers/
│   ├── ReduxProvider.tsx    # Redux Provider wrapper
│   └── AuthProvider.tsx     # Authentication provider with auto-initialization
├── hooks.ts                 # Custom typed hooks for easy usage
└── README.md               # This documentation
```

## 🚀 Quick Start

### 1. Using the Store

The Redux store is already configured and available throughout the app via the `ReduxProvider` in `app/layout.tsx`.

### 2. Using Hooks

```tsx
import { useAuth, useUI, useGetProjectsQuery } from "@/lib/store/hooks"

function MyComponent() {
  // Auth state
  const { user, isAuthenticated, isLoading } = useAuth()
  
  // UI state
  const { sidebarOpen, toggleSidebar, addToast } = useUI()
  
  // API data
  const { data: projects, isLoading: projectsLoading } = useGetProjectsQuery({
    page: 1,
    limit: 10
  })
  
  return (
    <div>
      {isAuthenticated && <p>Welcome, {user?.fullName}!</p>}
      <button onClick={toggleSidebar}>
        Toggle Sidebar ({sidebarOpen ? "Open" : "Closed"})
      </button>
    </div>
  )
}
```

## 🔐 Authentication

### Auth State
- `user`: Current user object
- `token`: JWT token
- `isAuthenticated`: Boolean authentication status
- `isLoading`: Loading state for auth operations
- `error`: Error message if any

### Auth Actions
```tsx
import { useAuthService } from "@/lib/services/authService"

function LoginForm() {
  const { login, register, logout } = useAuthService()
  
  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password)
    if (result.success) {
      // Redirect to dashboard
    } else {
      // Show error
    }
  }
}
```

## 🎨 UI State Management

### Available UI State
- **Sidebar**: `sidebarOpen`, `toggleSidebar()`
- **Mobile Nav**: `mobileNavOpen`, `toggleMobileNav()`
- **Modals**: `modals`, `openModal()`, `closeModal()`
- **Toasts**: `toasts`, `addToast()`, `removeToast()`
- **Loading**: `loading`, `setLoading()`
- **Theme**: `theme`, `setTheme()`, `toggleTheme()`
- **Search**: `searchQuery`, `searchFilters`, `setSearchQuery()`
- **Pagination**: `pagination`, `nextPage()`, `prevPage()`
- **View Mode**: `viewMode`, `setViewMode()`, `toggleViewMode()`
- **Errors**: `errors`, `setError()`, `clearError()`

### Example Usage
```tsx
import { useUI } from "@/lib/store/hooks"

function MyComponent() {
  const { 
    sidebarOpen, 
    toggleSidebar, 
    addToast, 
    openModal, 
    setTheme 
  } = useUI()
  
  const handleSuccess = () => {
    addToast({
      type: "success",
      title: "Success!",
      description: "Operation completed successfully"
    })
  }
  
  const openCreateModal = () => {
    openModal({ 
      modal: "createProject", 
      type: "create",
      data: { initialData: {} }
    })
  }
}
```

## 🌐 API Integration

### Available API Endpoints

All endpoints from `api.md` are available as React hooks:

#### Authentication
- `useLoginMutation()`
- `useRegisterMutation()`
- `useGetMeQuery()`
- `useLogoutMutation()`

#### Users
- `useGetUserQuery(username)`
- `useUpdateUserMutation()`
- `useUpdateProfilePictureMutation()`

#### Projects
- `useGetProjectsQuery(params)`
- `useGetProjectQuery(id)`
- `useCreateProjectMutation()`
- `useUpdateProjectMutation()`
- `useDeleteProjectMutation()`
- `useLikeProjectMutation()`
- `useUnlikeProjectMutation()`
- `useGetProjectCommentsQuery(id, params)`
- `useAddProjectCommentMutation()`

#### Posts
- `useGetPostsQuery(params)`
- `useGetPostQuery(id)`
- `useCreatePostMutation()`
- `useUpdatePostMutation()`
- `useDeletePostMutation()`
- `useLikePostMutation()`
- `useUnlikePostMutation()`
- `useGetPostCommentsQuery(id, params)`
- `useAddPostCommentMutation()`

#### Reels
- `useGetReelsQuery(params)`
- `useGetReelQuery(id)`
- `useCreateReelMutation()`
- `useUpdateReelMutation()`
- `useDeleteReelMutation()`
- `useLikeReelMutation()`
- `useUnlikeReelMutation()`
- `useGetReelCommentsQuery(id, params)`
- `useAddReelCommentMutation()`

#### Studios
- `useGetStudiosQuery(params)`
- `useGetStudioQuery(id)`
- `useCreateStudioMutation()`
- `useUpdateStudioMutation()`
- `useDeleteStudioMutation()`
- `useGetStudioMembersQuery(id, params)`
- `useAddStudioMemberMutation()`
- `useRemoveStudioMemberMutation()`
- `useGetStudioJobsQuery(id, params)`
- `useGetStudioProjectsQuery(id, params)`

#### Jobs
- `useGetJobsQuery(params)`
- `useGetJobQuery(id)`
- `useCreateJobMutation()`
- `useUpdateJobMutation()`
- `useDeleteJobMutation()`

#### Messages
- `useGetConversationsQuery(params)`
- `useGetConversationQuery(id, params)`
- `useSendMessageMutation()`
- `useSendMessageToConversationMutation()`
- `useMarkMessageAsReadMutation()`

#### Notifications
- `useGetNotificationsQuery(params)`
- `useMarkNotificationAsReadMutation()`
- `useMarkAllNotificationsAsReadMutation()`

#### Saved Items
- `useGetSavedItemsQuery(params)`
- `useSaveItemMutation()`
- `useUnsaveItemMutation()`

#### Feed & Trending
- `useGetFeedQuery(params)`
- `useGetTrendingQuery(params)`

### Example API Usage
```tsx
import { 
  useGetProjectsQuery, 
  useCreateProjectMutation,
  useLikeProjectMutation 
} from "@/lib/store/api"

function ProjectsList() {
  const { data: projects, isLoading, error } = useGetProjectsQuery({
    page: 1,
    limit: 10,
    sort: "newest"
  })
  
  const [createProject, { isLoading: creating }] = useCreateProjectMutation()
  const [likeProject] = useLikeProjectMutation()
  
  const handleCreate = async () => {
    try {
      await createProject({
        title: "New Project",
        description: "Project description",
        images: [],
        tags: ["architecture", "design"]
      }).unwrap()
    } catch (error) {
      console.error("Failed to create project:", error)
    }
  }
  
  const handleLike = async (projectId: string) => {
    try {
      await likeProject(projectId).unwrap()
    } catch (error) {
      console.error("Failed to like project:", error)
    }
  }
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading projects</div>
  
  return (
    <div>
      {projects?.data.map(project => (
        <div key={project._id}>
          <h3>{project.title}</h3>
          <button onClick={() => handleLike(project._id)}>
            Like ({project.likes.length})
          </button>
        </div>
      ))}
    </div>
  )
}
```

## 🔧 Error Handling

### Global Error Handling
```tsx
import { useApiError } from "@/lib/store/hooks"

function MyComponent() {
  const { handleError } = useApiError()
  
  const handleApiCall = async () => {
    try {
      // API call
    } catch (error) {
      handleError(error, "API operation")
      // Error is automatically displayed as toast and stored in UI state
    }
  }
}
```

### Manual Error Handling
```tsx
import { useUI } from "@/lib/store/hooks"

function MyComponent() {
  const { addToast, setError } = useUI()
  
  const handleError = (message: string) => {
    setError({ type: "global", error: message })
    addToast({
      type: "error",
      title: "Error",
      description: message
    })
  }
}
```

## 🎯 Best Practices

### 1. Use Custom Hooks
Always use the custom hooks from `lib/store/hooks.ts` instead of direct Redux hooks:

```tsx
// ✅ Good
import { useAuth, useUI } from "@/lib/store/hooks"

// ❌ Avoid
import { useSelector, useDispatch } from "react-redux"
```

### 2. Error Handling
Always handle API errors properly:

```tsx
const [createProject, { isLoading, error }] = useCreateProjectMutation()

const handleCreate = async () => {
  try {
    await createProject(data).unwrap()
    // Success handling
  } catch (error) {
    // Error handling
  }
}
```

### 3. Loading States
Use loading states for better UX:

```tsx
const { data, isLoading, error } = useGetProjectsQuery(params)

if (isLoading) return <LoadingSpinner />
if (error) return <ErrorMessage />
return <ProjectsList data={data} />
```

### 4. Optimistic Updates
RTK Query handles caching and optimistic updates automatically, but you can also use the `invalidatesTags` for manual cache invalidation.

## 🔄 Migration from Old Auth

The old authentication system in `lib/auth.ts` is still available for backward compatibility but shows deprecation warnings. To migrate:

1. Replace `login()` calls with `useAuthService().login()`
2. Replace `register()` calls with `useAuthService().register()`
3. Replace `logout()` calls with `useAuthService().logout()`
4. Replace `isAuthenticated()` calls with `useIsAuthenticated()` hook

## 🧪 Testing

The Redux store is fully testable. You can test components by wrapping them with the `ReduxProvider`:

```tsx
import { render } from "@testing-library/react"
import { ReduxProvider } from "@/lib/store/providers/ReduxProvider"

const renderWithRedux = (component: React.ReactElement) => {
  return render(
    <ReduxProvider>
      {component}
    </ReduxProvider>
  )
}
```

## 📚 Additional Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
- [React Redux Hooks](https://react-redux.js.org/api/hooks)
