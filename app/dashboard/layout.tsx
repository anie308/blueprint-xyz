"use client"

import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { useIsAuthenticated } from "@/lib/store/hooks"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)
  const isAuthenticated = useIsAuthenticated()

  useEffect(() => {
    // Small delay to allow Redux to initialize
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect("/auth/login")
    }
  }, [isLoading, isAuthenticated])

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

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}
