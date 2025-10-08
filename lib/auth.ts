// Authentication utilities - now integrated with Redux
// This file provides backward compatibility during migration

export interface User {
  id: string
  username: string
  email: string
  fullName: string
  avatar?: string
}

// Mock authentication state (for backward compatibility)
let currentUser: User | null = null

export function setCurrentUser(user: User | null) {
  currentUser = user
}

export function getCurrentUser(): User | null {
  return currentUser
}

export function isAuthenticated(): boolean {
  // Check both local state and localStorage for backward compatibility
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('blueprint_auth_token')
    return currentUser !== null || !!token
  }
  return currentUser !== null
}

// Mock login function (deprecated - use Redux instead)
export function login(email: string, password: string): Promise<User> {
  console.warn('Deprecated: Use Redux useLoginMutation hook instead of this function')
  
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        const user: User = {
          id: "1",
          username: "demo",
          email,
          fullName: "Demo User",
          avatar: "/placeholder-user.jpg"
        }
        setCurrentUser(user)
        
        // Store token in localStorage for Redux compatibility
        if (typeof window !== 'undefined') {
          localStorage.setItem('blueprint_auth_token', 'mock_jwt_token')
        }
        
        resolve(user)
      } else {
        reject(new Error("Invalid credentials"))
      }
    }, 1000)
  })
}

// Mock logout function (deprecated - use Redux instead)
export function logout(): void {
  console.warn('Deprecated: Use Redux logout action instead of this function')
  
  setCurrentUser(null)
  
  // Remove token from localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('blueprint_auth_token')
  }
}

// Mock register function (deprecated - use Redux instead)
export function register(userData: {
  fullName: string
  username: string
  email: string
  password: string
}): Promise<User> {
  console.warn('Deprecated: Use Redux useRegisterMutation hook instead of this function')
  
  return new Promise((resolve, reject) => {
    // Simulate API call
    setTimeout(() => {
      if (userData.email && userData.password) {
        const user: User = {
          id: "1",
          username: userData.username,
          email: userData.email,
          fullName: userData.fullName,
          avatar: "/placeholder-user.jpg"
        }
        setCurrentUser(user)
        
        // Store token in localStorage for Redux compatibility
        if (typeof window !== 'undefined') {
          localStorage.setItem('blueprint_auth_token', 'mock_jwt_token_new_user')
        }
        
        resolve(user)
      } else {
        reject(new Error("Invalid registration data"))
      }
    }, 1000)
  })
}
