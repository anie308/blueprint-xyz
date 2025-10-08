"use client"

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../index'
import { initializeAuth, setUserFromToken } from '../slices/authSlice'
import { useGetMeQuery } from '../api'

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { token, isAuthenticated } = useSelector((state: RootState) => state.auth)
  
  // Initialize auth state from localStorage on mount
  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])
  
  // Fetch user data if we have a token but no user data
  const { data: userData, isLoading, error } = useGetMeQuery(undefined, {
    skip: !token || isAuthenticated,
  })
  
  // Set user data when fetched
  useEffect(() => {
    if (userData?.success && userData.data && token) {
      dispatch(setUserFromToken({ user: userData.data, token }))
    }
  }, [userData, token, dispatch])
  
  // Handle auth errors
  useEffect(() => {
    if (error && token) {
      // Token is invalid, clear auth state
      dispatch(initializeAuth())
    }
  }, [error, token, dispatch])
  
  return <>{children}</>
}
