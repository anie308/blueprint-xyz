import { useState } from 'react'
import { useCreateStudioMutation } from '@/lib/store/api'

export interface CreateStudioData {
  name: string
  description: string
  icon?: string
  slug?: string
  category?: string
  rules?: string
  private?: boolean
}

export function useCreateStudio() {
  const [createStudioMutation, { isLoading: isCreating, error: createError }] = useCreateStudioMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createStudio = async (studioData: CreateStudioData) => {
    setIsSubmitting(true)
    try {
      const result = await createStudioMutation({
        name: studioData.name,
        description: studioData.description,
        slug: studioData.slug,
        category: studioData.category || '',
        isPrivate: studioData.private !== undefined ? studioData.private : false,
        studioRules: studioData.rules || '',
        // Also send isPublic for backwards compatibility
        isPublic: studioData.private === undefined ? true : !studioData.private
      }).unwrap()

      return { success: true, data: result }
    } catch (error: any) {
      return {
        success: false,
        error: error?.data?.message || error?.message || "Failed to create studio"
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    createStudio,
    isCreating: isCreating || isSubmitting,
    error: createError
  }
}
