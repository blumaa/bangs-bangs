import { useState } from 'react'
import { motion } from 'framer-motion'

interface ReviewInputProps {
  onGenerate: (bandName: string) => void
  isGenerating: boolean
}

export function ReviewInput({ onGenerate, isGenerating }: ReviewInputProps) {
  const [bandName, setBandName] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (bandName.trim()) {
      onGenerate(bandName.trim())
    }
  }

  return (
    <form className="review-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="band-input"
        placeholder="Enter band or song name..."
        value={bandName}
        onChange={(e) => setBandName(e.target.value)}
        disabled={isGenerating}
      />
      <motion.button
        type="submit"
        className="bang-button"
        disabled={isGenerating || !bandName.trim()}
        whileHover={!isGenerating && bandName.trim() ? { scale: 1.05 } : {}}
        whileTap={!isGenerating && bandName.trim() ? { scale: 0.95 } : {}}
      >
        {isGenerating ? 'Banging...' : 'Bang On!'}
      </motion.button>
    </form>
  )
}
