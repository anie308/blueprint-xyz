import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../api'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    
    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    
    // Clear error state
    clearError: (state) => {
      state.error = null
    },
    
    // Login success
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
      
      // Store token and user in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('blueprint_auth_token', action.payload.token)
        localStorage.setItem('blueprint_auth_user', JSON.stringify(action.payload.user))
      }
    },
    
    // Login failure
    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = action.payload
      
      // Clear localStorage on failure
      if (typeof window !== 'undefined') {
        localStorage.removeItem('blueprint_auth_token')
        localStorage.removeItem('blueprint_auth_user')
      }
    },
    
    // Register success
    registerSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
      
      // Store token and user in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('blueprint_auth_token', action.payload.token)
        localStorage.setItem('blueprint_auth_user', JSON.stringify(action.payload.user))
      }
    },
    
    // Register failure
    registerFailure: (state, action: PayloadAction<string>) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = action.payload
      
      // Clear localStorage on failure
      if (typeof window !== 'undefined') {
        localStorage.removeItem('blueprint_auth_token')
        localStorage.removeItem('blueprint_auth_user')
      }
    },
    
    // Logout
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
      
      // Remove token and user from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('blueprint_auth_token')
        localStorage.removeItem('blueprint_auth_user')
      }
    },
    
    // Update user profile
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        // Persist updated user to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('blueprint_auth_user', JSON.stringify(state.user))
        }
      }
    },
    
    // Set user from stored token (for app initialization)
    setUserFromToken: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
      
      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('blueprint_auth_token', action.payload.token)
        localStorage.setItem('blueprint_auth_user', JSON.stringify(action.payload.user))
      }
    },
    
    // Initialize auth state from localStorage
    initializeAuth: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('blueprint_auth_token')
        const userStr = localStorage.getItem('blueprint_auth_user')
        
        if (token) {
          state.token = token
          state.isAuthenticated = true
          
          // Restore user data from localStorage if available
          if (userStr) {
            try {
              const user = JSON.parse(userStr) as User
              state.user = user
            } catch (error) {
              // If parsing fails, remove invalid data
              console.error('Failed to parse user data from localStorage:', error)
              localStorage.removeItem('blueprint_auth_user')
            }
          }
        } else {
          // No token, clear user data too
          localStorage.removeItem('blueprint_auth_user')
        }
      }
    },

    // Update token (for refresh token flow)
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('blueprint_auth_token', action.payload)
      }
    },
  },
})

export const {
  setLoading,
  setError,
  clearError,
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logout,
  updateUserProfile,
  setUserFromToken,
  initializeAuth,
  updateToken,
} = authSlice.actions

export default authSlice.reducer

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth
export const selectUser = (state: { auth: AuthState }) => state.auth.user
export const selectToken = (state: { auth: AuthState }) => state.auth.token
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error
