// Simple authentication utilities
// In a real app, this would integrate with your auth provider

export interface User {
  id: string
  username: string
  email: string
  fullName: string
  avatar?: string
}

// Mock authentication state
let currentUser: User | null = null

export function setCurrentUser(user: User | null) {
  currentUser = user
}

export function getCurrentUser(): User | null {
  return currentUser
}

export function isAuthenticated(): boolean {
  return currentUser !== null
}

// Mock login function
export function login(email: string, password: string): Promise<User> {
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
        resolve(user)
      } else {
        reject(new Error("Invalid credentials"))
      }
    }, 1000)
  })
}

// Mock logout function
export function logout(): void {
  setCurrentUser(null)
}

// Mock register function
export function register(userData: {
  fullName: string
  username: string
  email: string
  password: string
}): Promise<User> {
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
        resolve(user)
      } else {
        reject(new Error("Invalid registration data"))
      }
    }, 1000)
  })
}
