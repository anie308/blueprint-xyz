import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './api'
import authSlice from './slices/authSlice'
import uiSlice from './slices/uiSlice'

export const store = configureStore({
  reducer: {
    // API slice for all backend communication
    api: api.reducer,
    // Authentication state
    auth: authSlice,
    // UI state (modals, loading states, etc.)
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(api.middleware),
  devTools: process.env.NODE_ENV !== 'production',
})

// Setup listeners for RTK Query
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
