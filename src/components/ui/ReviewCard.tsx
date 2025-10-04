import type { Review } from '../../types'
import { TypingText } from './TypingText'
import { ShareLinks } from './ShareLinks'
import { AudioPlayer } from './AudioPlayer'

interface ReviewCardProps {
  review: Review
  isTyping?: boolean
}

export function ReviewCard({ review, isTyping = false }: ReviewCardProps) {
  return (
    <div className="review-card-container">
      <AudioPlayer text={review.content} bandName={review.bandName} />

      <div className="review-card">
        <div className="review-header">
          <h2 className="review-title">{review.bandName}</h2>
          <p className="review-date">
            {new Date(review.timestamp).toLocaleDateString()}
          </p>
        </div>

        <div className="review-content">
          {isTyping ? (
            <TypingText text={review.content} className="review-text" />
          ) : (
            <p className="review-text">{review.content}</p>
          )}
        </div>

        <div className="review-footer">
          <ShareLinks bandName={review.bandName} reviewId={review.id} />
        </div>
      </div>
    </div>
  )
}
