import { useState, useEffect } from 'react'
import type { Review } from '../types'
import { getRecentReviews, addReview as addReviewToFirestore } from '../lib/firestore'

export function useRecentReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadReviews()
  }, [])

  const loadReviews = async () => {
    try {
      setIsLoading(true)
      const loadedReviews = await getRecentReviews()
      setReviews(loadedReviews)
      setError(null)
    } catch (err) {
      console.error('Error loading reviews:', err)
      setError('Failed to load reviews')
    } finally {
      setIsLoading(false)
    }
  }

  const addReview = async (review: Review) => {
    try {
      await addReviewToFirestore({
        bandName: review.bandName,
        content: review.content
      })
      // Reload reviews to get the updated list
      await loadReviews()
    } catch (err) {
      console.error('Error adding review:', err)
      setError('Failed to save review')
    }
  }

  const getReviewById = (id: string): Review | undefined => {
    return reviews.find(review => review.id === id)
  }

  return {
    reviews,
    addReview,
    getReviewById,
    isLoading,
    error
  }
}
