import { useState } from 'react'
import { motion } from 'framer-motion'

interface ShareLinksProps {
  bandName: string
  reviewId: string
}

export function ShareLinks({ bandName, reviewId }: ShareLinksProps) {
  const [copied, setCopied] = useState(false)

  const reviewUrl = `${window.location.origin}/review/${reviewId}`
  const shareText = `Check out this Lester Bangs review of ${bandName}!`

  const handleCopy = () => {
    navigator.clipboard.writeText(reviewUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareLinks = [
    {
      name: 'Facebook',
      icon: '📘',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(reviewUrl)}`,
      color: '#1877f2'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(reviewUrl)}`,
      color: '#1da1f2'
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + reviewUrl)}`,
      color: '#25d366'
    },
    {
      name: 'Spotify',
      icon: '🎵',
      url: `https://open.spotify.com/search/${encodeURIComponent(bandName)}`,
      color: '#1db954'
    }
  ]

  return (
    <div className="share-links">
      {shareLinks.map((link) => (
        <motion.a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="share-link"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title={link.name}
        >
          <span className="share-icon">{link.icon}</span>
        </motion.a>
      ))}
      <motion.button
        className="share-link copy-link"
        onClick={handleCopy}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title={copied ? 'Copied!' : 'Copy Link'}
      >
        <span className="share-icon">{copied ? '✅' : '📋'}</span>
      </motion.button>
    </div>
  )
}
