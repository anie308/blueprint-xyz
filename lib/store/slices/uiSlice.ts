import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
  isOpen: boolean
  type: string | null
  data?: any
}

interface ToastState {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
  duration?: number
}

interface UIState {
  // Sidebar state
  sidebarOpen: boolean
  
  // Mobile navigation
  mobileNavOpen: boolean
  
  // Modals
  modals: {
    createPost: ModalState
    createProject: ModalState
    createReel: ModalState
    createStudio: ModalState
    createJob: ModalState
    editProfile: ModalState
    settings: ModalState
    deleteConfirm: ModalState
  }
  
  // Toasts/Notifications
  toasts: ToastState[]
  
  // Loading states
  loading: {
    global: boolean
    auth: boolean
    upload: boolean
  }
  
  // Theme
  theme: 'light' | 'dark' | 'system'
  
  // Search
  searchQuery: string
  searchFilters: {
    type: 'all' | 'projects' | 'posts' | 'reels' | 'studios' | 'jobs' | 'users'
    sort: 'newest' | 'oldest' | 'popular' | 'views'
    tags: string[]
  }
  
  // Pagination
  pagination: {
    page: number
    limit: number
  }
  
  // View preferences
  viewMode: 'grid' | 'list'
  
  // Error states
  errors: {
    global: string | null
    network: string | null
    upload: string | null
  }
}

const initialState: UIState = {
  sidebarOpen: true,
  mobileNavOpen: false,
  modals: {
    createPost: { isOpen: false, type: null },
    createProject: { isOpen: false, type: null },
    createReel: { isOpen: false, type: null },
    createStudio: { isOpen: false, type: null },
    createJob: { isOpen: false, type: null },
    editProfile: { isOpen: false, type: null },
    settings: { isOpen: false, type: null },
    deleteConfirm: { isOpen: false, type: null },
  },
  toasts: [],
  loading: {
    global: false,
    auth: false,
    upload: false,
  },
  theme: 'system',
  searchQuery: '',
  searchFilters: {
    type: 'all',
    sort: 'newest',
    tags: [],
  },
  pagination: {
    page: 1,
    limit: 20,
  },
  viewMode: 'grid',
  errors: {
    global: null,
    network: null,
    upload: null,
  },
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Sidebar actions
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload
    },
    
    // Mobile navigation actions
    toggleMobileNav: (state) => {
      state.mobileNavOpen = !state.mobileNavOpen
    },
    
    setMobileNavOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileNavOpen = action.payload
    },
    
    // Modal actions
    openModal: (state, action: PayloadAction<{ modal: keyof UIState['modals']; type?: string; data?: any }>) => {
      const { modal, type, data } = action.payload
      state.modals[modal] = {
        isOpen: true,
        type: type || modal,
        data,
      }
    },
    
    closeModal: (state, action: PayloadAction<keyof UIState['modals']>) => {
      const modal = action.payload
      state.modals[modal] = {
        isOpen: false,
        type: null,
        data: undefined,
      }
    },
    
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach((modal) => {
        state.modals[modal as keyof UIState['modals']] = {
          isOpen: false,
          type: null,
          data: undefined,
        }
      })
    },
    
    // Toast actions
    addToast: (state, action: PayloadAction<Omit<ToastState, 'id'>>) => {
      const toast: ToastState = {
        id: Date.now().toString(),
        duration: 5000,
        ...action.payload,
      }
      state.toasts.push(toast)
    },
    
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload)
    },
    
    clearToasts: (state) => {
      state.toasts = []
    },
    
    // Loading actions
    setLoading: (state, action: PayloadAction<{ type: keyof UIState['loading']; loading: boolean }>) => {
      const { type, loading } = action.payload
      state.loading[type] = loading
    },
    
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload
    },
    
    // Theme actions
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload
    },
    
    toggleTheme: (state) => {
      if (state.theme === 'light') {
        state.theme = 'dark'
      } else if (state.theme === 'dark') {
        state.theme = 'system'
      } else {
        state.theme = 'light'
      }
    },
    
    // Search actions
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    
    setSearchFilters: (state, action: PayloadAction<Partial<UIState['searchFilters']>>) => {
      state.searchFilters = { ...state.searchFilters, ...action.payload }
    },
    
    clearSearch: (state) => {
      state.searchQuery = ''
      state.searchFilters = {
        type: 'all',
        sort: 'newest',
        tags: [],
      }
    },
    
    // Pagination actions
    setPagination: (state, action: PayloadAction<Partial<UIState['pagination']>>) => {
      state.pagination = { ...state.pagination, ...action.payload }
    },
    
    nextPage: (state) => {
      state.pagination.page += 1
    },
    
    prevPage: (state) => {
      if (state.pagination.page > 1) {
        state.pagination.page -= 1
      }
    },
    
    resetPagination: (state) => {
      state.pagination.page = 1
    },
    
    // View mode actions
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload
    },
    
    toggleViewMode: (state) => {
      state.viewMode = state.viewMode === 'grid' ? 'list' : 'grid'
    },
    
    // Error actions
    setError: (state, action: PayloadAction<{ type: keyof UIState['errors']; error: string | null }>) => {
      const { type, error } = action.payload
      state.errors[type] = error
    },
    
    clearError: (state, action: PayloadAction<keyof UIState['errors']>) => {
      const type = action.payload
      state.errors[type] = null
    },
    
    clearAllErrors: (state) => {
      state.errors = {
        global: null,
        network: null,
        upload: null,
      }
    },
    
    // Reset UI state
    resetUI: (state) => {
      return { ...initialState, theme: state.theme } // Preserve theme preference
    },
  },
})

export const {
  // Sidebar
  toggleSidebar,
  setSidebarOpen,
  
  // Mobile nav
  toggleMobileNav,
  setMobileNavOpen,
  
  // Modals
  openModal,
  closeModal,
  closeAllModals,
  
  // Toasts
  addToast,
  removeToast,
  clearToasts,
  
  // Loading
  setLoading,
  setGlobalLoading,
  
  // Theme
  setTheme,
  toggleTheme,
  
  // Search
  setSearchQuery,
  setSearchFilters,
  clearSearch,
  
  // Pagination
  setPagination,
  nextPage,
  prevPage,
  resetPagination,
  
  // View mode
  setViewMode,
  toggleViewMode,
  
  // Errors
  setError,
  clearError,
  clearAllErrors,
  
  // Reset
  resetUI,
} = uiSlice.actions

export default uiSlice.reducer

// Selectors
export const selectUI = (state: { ui: UIState }) => state.ui
export const selectSidebarOpen = (state: { ui: UIState }) => state.ui.sidebarOpen
export const selectMobileNavOpen = (state: { ui: UIState }) => state.ui.mobileNavOpen
export const selectModals = (state: { ui: UIState }) => state.ui.modals
export const selectToasts = (state: { ui: UIState }) => state.ui.toasts
export const selectLoading = (state: { ui: UIState }) => state.ui.loading
export const selectTheme = (state: { ui: UIState }) => state.ui.theme
export const selectSearchQuery = (state: { ui: UIState }) => state.ui.searchQuery
export const selectSearchFilters = (state: { ui: UIState }) => state.ui.searchFilters
export const selectPagination = (state: { ui: UIState }) => state.ui.pagination
export const selectViewMode = (state: { ui: UIState }) => state.ui.viewMode
export const selectErrors = (state: { ui: UIState }) => state.ui.errors
