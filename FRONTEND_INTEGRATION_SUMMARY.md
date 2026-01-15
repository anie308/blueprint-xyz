# Frontend Integration Summary

This document summarizes the integration of the Blueprint-XYZ backend API into the frontend application.

## ✅ Completed Integration Tasks

### 1. API Client Setup
- **Updated RTK Query base query** (`lib/store/api.ts`)
  - Added automatic token refresh on 401 errors
  - Implemented cookie-based authentication support (`credentials: 'include'`)
  - Added proper error handling and token management
  - Base URL configured: `http://localhost:3000/api` (configurable via `NEXT_PUBLIC_API_URL`)

### 2. Authentication
- **Token Management**
  - JWT tokens stored in Redux state and localStorage
  - Automatic token refresh using httpOnly cookies
  - Token refresh endpoint added: `POST /auth/refresh`
  - Logout clears both token and refresh cookie

- **Auth Endpoints Updated** (`lib/store/routes/auth.ts`)
  - Login with cookie support
  - Register with cookie support
  - Logout with cookie clearing
  - Refresh token mutation
  - Profile picture upload returns user object

### 3. Response Types
- **Updated Pagination Format** (all route files)
  - Changed from `pages: number` to `totalPages: number`
  - Added `hasNext: boolean` and `hasPrev: boolean`
  - Matches backend API response structure

- **Error Response Types** (`lib/store/routes/types.ts`)
  - Added `error` field
  - Added `details.validationErrors` for validation errors

### 4. WebSocket Integration
- **Socket.IO Client** (`lib/socketClient.ts`)
  - Connection management with token authentication
  - Auto-reconnection support
  - Event type definitions
  - Helper functions for connection lifecycle

- **React Hook** (`hooks/useSocket.ts`)
  - `useSocket` hook for real-time features
  - Supports message, typing, presence, and notification events
  - Helper functions: `sendMessage`, `startTyping`, `stopTyping`, `markMessageAsRead`
  - Automatic connection/disconnection based on auth state

### 5. Error Handling
- **Error Utilities** (`lib/utils/errorHandler.ts`)
  - `handleApiError()` - Converts API errors to user-friendly messages
  - `getValidationErrors()` - Extracts field-specific validation errors
  - `isNetworkError()` - Checks for network errors
  - `isAuthError()` - Checks for authentication errors

### 6. Dependencies
- Added `socket.io-client@^4.7.5` to `package.json`
- All dependencies installed successfully

## 📁 File Structure

```
lib/
├── store/
│   ├── api.ts                    # RTK Query API with token refresh
│   ├── routes/                   # All API endpoint definitions
│   │   ├── auth.ts              # Authentication endpoints
│   │   ├── projects.ts          # Project endpoints
│   │   ├── posts.ts             # Post endpoints
│   │   ├── reels.ts             # Reel endpoints
│   │   ├── studios.ts           # Studio endpoints
│   │   ├── jobs.ts              # Job endpoints
│   │   ├── messages.ts          # Message endpoints
│   │   ├── notifications.ts     # Notification endpoints
│   │   ├── saved.ts             # Saved items endpoints
│   │   ├── feed.ts              # Feed endpoints
│   │   ├── health.ts            # Health check endpoints
│   │   └── types.ts             # Shared types
│   └── slices/
│       └── authSlice.ts         # Auth state with token update action
├── socketClient.ts              # WebSocket client setup
└── utils/
    └── errorHandler.ts          # Error handling utilities

hooks/
└── useSocket.ts                 # React hook for WebSocket
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_WS_URL=http://localhost:3000
```

For production:
```env
NEXT_PUBLIC_API_URL=https://api.blueprint-xyz.com/api
NEXT_PUBLIC_WS_URL=https://api.blueprint-xyz.com
```

## 🚀 Usage Examples

### Authentication

```typescript
import { useLoginMutation, useRegisterMutation } from '@/lib/store/api'
import { useAuthService } from '@/lib/services/authService'

// Using RTK Query hooks
const [login, { isLoading }] = useLoginMutation()
await login({ email, password })

// Using service class
const { login, register, logout } = useAuthService()
await login(email, password)
```

### WebSocket

```typescript
import { useSocket } from '@/hooks/useSocket'

const { socket, isConnected, sendMessage, startTyping, stopTyping } = useSocket({
  onMessage: (data) => {
    console.log('New message:', data)
  },
  onNotification: (data) => {
    console.log('New notification:', data)
  },
  onTypingStart: ({ userId, conversationId }) => {
    console.log('User typing:', userId)
  },
})

// Send a message
sendMessage(conversationId, 'Hello!')
```

### Error Handling

```typescript
import { handleApiError, getValidationErrors } from '@/lib/utils/errorHandler'

try {
  await createProject(data)
} catch (error) {
  const message = handleApiError(error)
  const validationErrors = getValidationErrors(error)
  // Display error to user
}
```

### API Queries

```typescript
import { useGetProjectsQuery, useCreateProjectMutation } from '@/lib/store/api'

// Query with pagination
const { data, isLoading, error } = useGetProjectsQuery({
  page: 1,
  limit: 20,
  sortBy: 'newest',
  search: 'architecture',
})

// Mutation
const [createProject, { isLoading: isCreating }] = useCreateProjectMutation()
await createProject({
  title: 'My Project',
  description: 'Description',
  images: [],
  tags: ['architecture'],
})
```

## 🔄 Token Refresh Flow

1. User makes API request with expired token
2. Backend returns 401 Unauthorized
3. Frontend automatically calls `/auth/refresh` with httpOnly cookie
4. Backend returns new access token
5. Frontend updates Redux state and localStorage
6. Original request is retried with new token
7. If refresh fails, user is logged out and redirected to login

## 📝 Notes

- All API endpoints use RTK Query for caching and automatic refetching
- Pagination responses include `hasNext` and `hasPrev` for easier pagination UI
- WebSocket connection automatically connects/disconnects based on auth state
- Error handling provides user-friendly messages and validation error details
- Token refresh is handled automatically - no manual intervention needed

## 🐛 Known Issues / Future Improvements

- Studio endpoints use `id` parameter but frontend uses `slug` - backend should support both
- Consider adding request retry logic for network errors
- Add request debouncing for search endpoints
- Consider implementing optimistic updates for likes/follows

## ✅ Testing Checklist

- [ ] Login/Register flow
- [ ] Token refresh on 401
- [ ] Logout clears tokens
- [ ] WebSocket connection with auth
- [ ] Error handling displays correctly
- [ ] Pagination works with new format
- [ ] File uploads work (profile picture)
- [ ] All CRUD operations work
- [ ] Real-time messaging works
- [ ] Notifications received via WebSocket
