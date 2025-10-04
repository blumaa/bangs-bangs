import type { Review } from '../../types'
import { motion } from 'framer-motion'

interface SidebarProps {
  reviews: Review[]
  selectedReviewId: string | null
  onSelectReview: (reviewId: string) => void
}

export function Sidebar({ reviews, selectedReviewId, onSelectReview }: SidebarProps) {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Recent Reviews</h3>
      <div className="sidebar-list">
        {reviews.length === 0 ? (
          <p className="sidebar-empty">No reviews yet. Create one!</p>
        ) : (
          reviews.map((review) => (
            <motion.button
              key={review.id}
              className={`sidebar-item ${selectedReviewId === review.id ? 'active' : ''}`}
              onClick={() => onSelectReview(review.id)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="sidebar-item-content">
                <span className="sidebar-item-icon">○</span>
                <span className="sidebar-item-name">{review.bandName}</span>
              </div>
              <span className="sidebar-item-date">
                {new Date(review.timestamp).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </motion.button>
          ))
        )}
      </div>
    </aside>
  )
}
