"use client"

import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { useIsAuthenticated } from "@/lib/store/hooks"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const isAuthenticated = useIsAuthenticated()
  const token = useSelector((state: RootState) => state.auth.token)
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    // Wait for auth initialization from localStorage
    // Check if we have token in localStorage (even if Redux hasn't loaded yet)
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('blueprint_auth_token')
        const storedUser = localStorage.getItem('blueprint_auth_user')
        
        // If we have stored auth data, wait a bit longer for Redux to initialize
        if (storedToken || storedUser) {
          setTimeout(() => {
            setIsLoading(false)
          }, 300)
        } else {
          // No stored auth, can check immediately
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    // Only redirect if we're sure there's no auth (after loading)
    if (!isLoading && !isAuthenticated && !token) {
      // Double check localStorage one more time
      if (typeof window !== 'undefined') {
        const storedToken = localStorage.getItem('blueprint_auth_token')
        if (!storedToken) {
          redirect("/auth/login")
        }
      } else {
        redirect("/auth/login")
      }
    }
  }, [isLoading, isAuthenticated, token])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // If we have token or user, allow access (even if isAuthenticated is false temporarily)
  // This prevents premature redirects during Redux initialization
  if (!isAuthenticated && !token && !user) {
    // Check localStorage one final time
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('blueprint_auth_token')
      if (!storedToken) {
        return null // Will redirect to login
      }
    } else {
      return null // Will redirect to login
    }
  }

  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
