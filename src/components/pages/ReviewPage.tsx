import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ReviewCard } from '../ui/ReviewCard'
import { getReviewById } from '../../lib/firestore'
import type { Review } from '../../types'

export function ReviewPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [review, setReview] = useState<Review | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadReview() {
      if (!id) {
        setError('No review ID provided')
        setIsLoading(false)
        return
      }

      try {
        const loadedReview = await getReviewById(id)
        if (loadedReview) {
          setReview(loadedReview)
        } else {
          setError('Review not found')
        }
      } catch (err) {
        console.error('Error loading review:', err)
        setError('Failed to load review')
      } finally {
        setIsLoading(false)
      }
    }

    loadReview()
  }, [id])

  if (isLoading) {
    return (
      <div className="review-page">
        <div className="loading-spinner-container">
          <div className="loading-text">Loading review...</div>
        </div>
      </div>
    )
  }

  if (error || !review) {
    return (
      <div className="review-page">
        <div className="error-message">
          <p>{error || 'Review not found'}</p>
        </div>
        <button className="back-button" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="review-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>
      <div className="review-page-content">
        <ReviewCard review={review} />
      </div>
    </div>
  )
}
