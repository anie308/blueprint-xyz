import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './index'
import {
  toggleSidebar,
  setSidebarOpen,
  toggleMobileNav,
  setMobileNavOpen,
  openModal,
  closeModal,
  closeAllModals,
  addToast,
  removeToast,
  clearToasts,
  setLoading,
  setGlobalLoading,
  setTheme,
  toggleTheme,
  setSearchQuery,
  setSearchFilters,
  clearSearch,
  setPagination,
  nextPage,
  prevPage,
  resetPagination,
  setViewMode,
  toggleViewMode,
  setError,
  clearError,
  clearAllErrors,
  logout,
} from './slices/index'

// Typed hooks for use throughout the app
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Auth hooks
export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  
  return {
    ...auth,
    dispatch,
  }
}

export const useUser = () => {
  return useAppSelector((state) => state.auth.user)
}

export const useIsAuthenticated = () => {
  return useAppSelector((state) => state.auth.isAuthenticated)
}

export const useToken = () => {
  return useAppSelector((state) => state.auth.token)
}

// UI hooks
export const useUI = () => {
  const ui = useAppSelector((state) => state.ui)
  const dispatch = useAppDispatch()
  
  return {
    ...ui,
    dispatch,
  }
}

export const useSidebar = () => {
  const sidebarOpen = useAppSelector((state: RootState) => state.ui.sidebarOpen)
  const dispatch = useAppDispatch()
  
  return {
    sidebarOpen,
    toggle: () => dispatch(toggleSidebar()),
    setOpen: (open: boolean) => dispatch(setSidebarOpen(open)),
  }
}

export const useMobileNav = () => {
  const mobileNavOpen = useAppSelector((state) => state.ui.mobileNavOpen)
  const dispatch = useAppDispatch()
  
  return {
    mobileNavOpen,
    toggle: () => dispatch(toggleMobileNav()),
    setOpen: (open: boolean) => dispatch(setMobileNavOpen(open)),
  }
}

export const useModals = () => {
  const modals = useAppSelector((state) => state.ui.modals)
  const dispatch = useAppDispatch()
  
  return {
    modals,
    open: (modal: keyof typeof modals, type?: string, data?: any) => 
      dispatch(openModal({ modal, type, data })),
    close: (modal: keyof typeof modals) => 
      dispatch(closeModal(modal)),
    closeAll: () => dispatch(closeAllModals()),
  }
}

export const useToasts = () => {
  const toasts = useAppSelector((state) => state.ui.toasts)
  const dispatch = useAppDispatch()
  
  return {
    toasts,
    add: (toast: Omit<typeof toasts[0], 'id'>) => 
      dispatch(addToast(toast)),
    remove: (id: string) => 
      dispatch(removeToast(id)),
    clear: () => dispatch(clearToasts()),
  }
}

export const useLoading = () => {
  const loading = useAppSelector((state) => state.ui.loading)
  const dispatch = useAppDispatch()
  
  return {
    ...loading,
    set: (type: keyof typeof loading, loading: boolean) => 
      dispatch(setLoading({ type, loading })),
    setGlobal: (loading: boolean) => 
      dispatch(setGlobalLoading(loading)),
  }
}

export const useTheme = () => {
  const theme = useAppSelector((state) => state.ui.theme)
  const dispatch = useAppDispatch()
  
  return {
    theme,
    set: (theme: 'light' | 'dark' | 'system') => 
      dispatch(setTheme(theme)),
    toggle: () => dispatch(toggleTheme()),
  }
}

export const useSearch = () => {
  const searchQuery = useAppSelector((state) => state.ui.searchQuery)
  const searchFilters = useAppSelector((state) => state.ui.searchFilters)
  const dispatch = useAppDispatch()
  
  return {
    query: searchQuery,
    filters: searchFilters,
    setQuery: (query: string) => 
      dispatch(setSearchQuery(query)),
    setFilters: (filters: Partial<typeof searchFilters>) => 
      dispatch(setSearchFilters(filters)),
    clear: () => dispatch(clearSearch()),
  }
}

export const usePagination = () => {
  const pagination = useAppSelector((state) => state.ui.pagination)
  const dispatch = useAppDispatch()
  
  return {
    ...pagination,
    set: (pagination: Partial<typeof pagination>) => 
      dispatch(setPagination(pagination)),
    nextPage: () => dispatch(nextPage()),
    prevPage: () => dispatch(prevPage()),
    reset: () => dispatch(resetPagination()),
  }
}

export const useViewMode = () => {
  const viewMode = useAppSelector((state) => state.ui.viewMode)
  const dispatch = useAppDispatch()
  
  return {
    viewMode,
    set: (mode: 'grid' | 'list') => 
      dispatch(setViewMode(mode)),
    toggle: () => dispatch(toggleViewMode()),
  }
}

export const useErrors = () => {
  const errors = useAppSelector((state) => state.ui.errors)
  const dispatch = useAppDispatch()
  
  return {
    ...errors,
    set: (type: keyof typeof errors, error: string | null) => 
      dispatch(setError({ type, error })),
    clear: (type: keyof typeof errors) => 
      dispatch(clearError(type)),
    clearAll: () => dispatch(clearAllErrors()),
  }
}

// API hooks with error handling
export const useApiError = () => {
  const dispatch = useAppDispatch()
  
  const handleError = (error: any, context?: string) => {
    console.error(`API Error${context ? ` in ${context}` : ''}:`, error)
    
    let errorMessage = 'An unexpected error occurred'
    
    if (error?.data?.message) {
      errorMessage = error.data.message
    } else if (error?.message) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    }
    
    // Set global error
    dispatch(setError({ type: 'global', error: errorMessage }))
    
    // Add toast notification
    dispatch(addToast({ 
      type: 'error', 
      title: 'Error', 
      description: errorMessage 
    }))
  }
  
  return { handleError }
}

// Combined hooks for common patterns
export const useAuthActions = () => {
  const dispatch = useAppDispatch()
  const { handleError } = useApiError()
  
  return {
    login: async (email: string, password: string) => {
      try {
        dispatch(setLoading({ type: 'auth', loading: true }))
        // This will be handled by the API slice
        // The actual login logic will be in the component using the mutation
      } catch (error) {
        handleError(error, 'login')
      } finally {
        dispatch(setLoading({ type: 'auth', loading: false }))
      }
    },
    
    logout: () => {
      dispatch(logout())
      dispatch(clearToasts())
    },
    
    clearError: () => {
      dispatch(clearError('global'))
    },
  }
}

export const useUIActions = () => {
  const dispatch = useAppDispatch()
  
  return {
    showToast: (toast: Omit<Parameters<typeof useToasts>[0]['add'], 'id'>) => {
      dispatch(addToast(toast))
    },
    
    showSuccess: (title: string, description?: string) => {
      dispatch(addToast({ 
        type: 'success', 
        title, 
        description 
      }))
    },
    
    showError: (title: string, description?: string) => {
      dispatch(addToast({ 
        type: 'error', 
        title, 
        description 
      }))
    },
    
    showWarning: (title: string, description?: string) => {
      dispatch(addToast({ 
        type: 'warning', 
        title, 
        description 
      }))
    },
    
    showInfo: (title: string, description?: string) => {
      dispatch(addToast({ 
        type: 'info', 
        title, 
        description 
      }))
    },
  }
}
