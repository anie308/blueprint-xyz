"use client"

import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../index'
import { initializeAuth, setUserFromToken, logout } from '../slices/authSlice'
import { useGetMeQuery } from '../api'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { token, isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const hasInitialized = useRef(false)
  
  // Initialize auth state from localStorage on mount (only once)
  useEffect(() => {
    if (!hasInitialized.current) {
      dispatch(initializeAuth())
      hasInitialized.current = true
    }
  }, [dispatch])
  
  // Fetch user data if we have a token but no user data in Redux
  const { data: userData, isLoading, error } = useGetMeQuery(undefined, {
    skip: !token || !!user,
    // Don't refetch on window focus if we already have user data from localStorage
    refetchOnFocus: false,
    refetchOnReconnect: false,
  })
  
  // Set user data when fetched
  useEffect(() => {
    if (userData?.success && userData.data && token) {
      dispatch(setUserFromToken({ user: userData.data, token }))
    }
  }, [userData, token, dispatch])
  
  // Handle auth errors - only logout if it's a real auth error (401/403)
  // Don't clear state if we have valid data from localStorage
  useEffect(() => {
    if (error && token && !user) {
      // Only logout if we don't have user data from localStorage
      // This means the token is truly invalid
      const errorStatus = (error as any)?.status || (error as any)?.data?.status
      if (errorStatus === 401 || errorStatus === 403) {
        // Token is invalid, logout
        dispatch(logout())
      }
      // If we have user data from localStorage, keep it and don't logout
      // The token refresh mechanism in baseQueryWithReauth will handle token renewal
    }
  }, [error, token, user, dispatch])
  
  return <>{children}</>
}
