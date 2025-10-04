import { motion } from 'framer-motion'

export function LoadingSpinner() {
  return (
    <div className="loading-spinner-container">
      <motion.div
        className="loading-spinner"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        ⚡
      </motion.div>
      <p className="loading-text">Lester is banging out a review...</p>
    </div>
  )
}
