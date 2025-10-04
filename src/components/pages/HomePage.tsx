import { useState } from 'react'
import { Sidebar } from '../layout/Sidebar'
import { ReviewInput } from '../ui/ReviewInput'
import { ReviewCard } from '../ui/ReviewCard'
import { LoadingSpinner } from '../ui/LoadingSpinner'
import { useRecentReviews } from '../../hooks/useRecentReviews'
import { useReviewGenerator } from '../../hooks/useReviewGenerator'
import type { Review } from '../../types'

export function HomePage() {
  const { reviews, addReview, getReviewById } = useRecentReviews()
  const { generate, isGenerating, error } = useReviewGenerator()
  const [currentReview, setCurrentReview] = useState<Review | null>(null)
  const [selectedReviewId, setSelectedReviewId] = useState<string | null>(null)
  const [isTyping, setIsTyping] = useState(false)

  const handleGenerate = async (bandName: string) => {
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY

    if (!apiKey) {
      console.error('VITE_ANTHROPIC_API_KEY not found in environment variables')
      return
    }

    const review = await generate(bandName, apiKey)
    if (review) {
      setCurrentReview(review)
      setSelectedReviewId(null)
      setIsTyping(true)
      addReview(review)
    }
  }

  const handleSelectReview = (reviewId: string) => {
    const review = getReviewById(reviewId)
    if (review) {
      setCurrentReview(review)
      setSelectedReviewId(reviewId)
      setIsTyping(false)
    }
  }

  const handleNewReview = () => {
    setCurrentReview(null)
    setSelectedReviewId(null)
    setIsTyping(false)
  }

  return (
    <div className="home-container">
      <Sidebar
        reviews={reviews}
        selectedReviewId={selectedReviewId}
        onSelectReview={handleSelectReview}
      />
      <div className="main-content">
        <div className="content-header">
          <button className="new-review-button" onClick={handleNewReview}>
            New Review
          </button>
        </div>

        <ReviewInput onGenerate={handleGenerate} isGenerating={isGenerating} />

        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        )}

        {isGenerating && <LoadingSpinner />}

        {currentReview && !isGenerating && (
          <ReviewCard review={currentReview} isTyping={isTyping} />
        )}

        {!currentReview && !isGenerating && (
          <div className="empty-state">
            <p>Enter a band or song name above to generate a Lester Bangs-style review!</p>
          </div>
        )}
      </div>
    </div>
  )
}
