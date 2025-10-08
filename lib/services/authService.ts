// Redux-based authentication service
import { store } from '../store'
import { loginSuccess, loginFailure, registerSuccess, registerFailure, logout } from '../store/slices/authSlice'
import { api } from '../store/api'
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from '../store/api'

// Service class for authentication operations
export class AuthService {
  // Login with Redux integration
  static async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await store.dispatch(api.endpoints.login.initiate({ email, password }))
      
      if (result.data?.success) {
        const { user, token } = result.data.data
        store.dispatch(loginSuccess({ user, token }))
        return { success: true }
      } else {
        const errorMessage = result.error?.data?.message || "Login failed"
        store.dispatch(loginFailure(errorMessage))
        return { success: false, error: errorMessage }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Login failed"
      store.dispatch(loginFailure(errorMessage))
      return { success: false, error: errorMessage }
    }
  }
  
  // Register with Redux integration
  static async register(userData: {
    fullName: string
    username: string
    email: string
    password: string
  }): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await store.dispatch(api.endpoints.register.initiate(userData))
      
      if (result.data?.success) {
        const { user, token } = result.data.data
        store.dispatch(registerSuccess({ user, token }))
        return { success: true }
      } else {
        const errorMessage = result.error?.data?.message || "Registration failed"
        store.dispatch(registerFailure(errorMessage))
        return { success: false, error: errorMessage }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed"
      store.dispatch(registerFailure(errorMessage))
      return { success: false, error: errorMessage }
    }
  }
  
  // Logout with Redux integration
  static async logout(): Promise<{ success: boolean; error?: string }> {
    try {
      await store.dispatch(api.endpoints.logout.initiate())
      store.dispatch(logout())
      return { success: true }
    } catch (error) {
      // Even if logout fails on server, clear local state
      store.dispatch(logout())
      return { success: true }
    }
  }
  
  // Check if user is authenticated
  static isAuthenticated(): boolean {
    const state = store.getState()
    return state.auth.isAuthenticated && !!state.auth.token
  }
  
  // Get current user
  static getCurrentUser() {
    const state = store.getState()
    return state.auth.user
  }
  
  // Get current token
  static getCurrentToken(): string | null {
    const state = store.getState()
    return state.auth.token
  }
}

// Hook-based authentication service for React components
export const useAuthService = () => {
  const [loginMutation] = useLoginMutation()
  const [registerMutation] = useRegisterMutation()
  const [logoutMutation] = useLogoutMutation()
  
  const login = async (email: string, password: string) => {
    try {
      const result = await loginMutation({ email, password }).unwrap()
      
      if (result.success) {
        const { user, token } = result.data
        store.dispatch(loginSuccess({ user, token }))
        return { success: true, data: result }
      } else {
        return { 
          success: false, 
          error: result.message || "Login failed" 
        }
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || "Login failed"
      store.dispatch(loginFailure(errorMessage))
      return { 
        success: false, 
        error: errorMessage 
      }
    }
  }
  
  const register = async (userData: {
    fullName: string
    username: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    try {
      const result = await registerMutation({
        fullName: userData.fullName,
        username: userData.username,
        email: userData.email,
        password: userData.password
      }).unwrap()
      
      if (result.success) {
        const { user, token } = result.data
        store.dispatch(registerSuccess({ user, token }))
        return { success: true, data: result }
      } else {
        return { 
          success: false, 
          error: result.message || "Registration failed" 
        }
      }
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || "Registration failed"
      store.dispatch(registerFailure(errorMessage))
      return { 
        success: false, 
        error: errorMessage 
      }
    }
  }
  
  const logoutUser = async () => {
    try {
      await logoutMutation().unwrap()
      store.dispatch(logout())
      return { success: true }
    } catch (error: any) {
      // Even if logout fails on server, clear local state
      store.dispatch(logout())
      return { success: true }
    }
  }
  
  return {
    login,
    register,
    logout: logoutUser,
  }
}
