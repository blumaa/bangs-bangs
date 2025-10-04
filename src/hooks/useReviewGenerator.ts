import { useState } from 'react'
import type { Review } from '../types'
import { generateReview } from '../lib/api'

export function useReviewGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generate = async (bandName: string, apiKey: string): Promise<Review | null> => {
    setIsGenerating(true)
    setError(null)

    try {
      const content = await generateReview(bandName, apiKey)
      const review: Review = {
        id: crypto.randomUUID(),
        bandName,
        content,
        timestamp: Date.now()
      }
      return review
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate review'
      setError(errorMessage)
      return null
    } finally {
      setIsGenerating(false)
    }
  }

  return {
    generate,
    isGenerating,
    error
  }
}
