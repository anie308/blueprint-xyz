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
      
      // Store token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('blueprint_auth_token', action.payload.token)
      }
    },
    
    // Login failure
    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = action.payload
    },
    
    // Register success
    registerSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
      
      // Store token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('blueprint_auth_token', action.payload.token)
      }
    },
    
    // Register failure
    registerFailure: (state, action: PayloadAction<string>) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = action.payload
    },
    
    // Logout
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
      
      // Remove token from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('blueprint_auth_token')
      }
    },
    
    // Update user profile
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
    
    // Set user from stored token (for app initialization)
    setUserFromToken: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
    },
    
    // Initialize auth state from localStorage
    initializeAuth: (state) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('blueprint_auth_token')
        if (token) {
          state.token = token
          state.isAuthenticated = true
        }
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
} = authSlice.actions

export default authSlice.reducer

// Selectors
export const selectAuth = (state: { auth: AuthState }) => state.auth
export const selectUser = (state: { auth: AuthState }) => state.auth.user
export const selectToken = (state: { auth: AuthState }) => state.auth.token
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectAuthLoading = (state: { auth: AuthState }) => state.auth.isLoading
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error
