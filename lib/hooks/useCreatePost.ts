import { useState } from 'react'
import { useCreatePostMutation, useGetStudiosQuery } from '@/lib/store/api'

export interface CreatePostData {
  title: string
  content: string
  studioId?: string
  images?: File[]
}

export function useCreatePost() {
  const [createPostMutation, { isLoading: isCreating, error: createError }] = useCreatePostMutation()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch studios for selection
  const {
    data: studiosData,
    isLoading: isStudiosLoading,
    error: studiosError
  } = useGetStudiosQuery({
    page: 1,
    limit: 50,
    sort: 'popular'
  })

  const studios = (studiosData as any)?.data || []

  const createPost = async (postData: CreatePostData) => {
    setIsSubmitting(true)
    try {
      const result = await createPostMutation({
        title: postData.title,
        content: postData.content,
        studioId: postData.studioId,
        images: postData.images
      }).unwrap()

      return { success: true, data: result }
    } catch (error: any) {
      return {
        success: false,
        error: error?.data?.message || error?.message || "Failed to create post"
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    createPost,
    studios,
    isCreating: isCreating || isSubmitting,
    isLoadingStudios: isStudiosLoading,
    error: createError,
    studiosError
  }
}
