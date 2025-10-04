import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AudioPlayerProps {
  text: string
  bandName: string
}

export function AudioPlayer({ text, bandName }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    const synth = window.speechSynthesis
    const u = new SpeechSynthesisUtterance(text)

    u.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)
    }

    u.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
    }

    u.onerror = (event) => {
      console.error('Speech synthesis error:', event)
      setIsPlaying(false)
      setIsPaused(false)
    }

    setUtterance(u)

    return () => {
      synth.cancel()
    }
  }, [text])

  const handlePlay = () => {
    const synth = window.speechSynthesis
    if (utterance) {
      if (isPaused) {
        synth.resume()
        setIsPaused(false)
      } else {
        synth.speak(utterance)
      }
    }
  }

  const handlePause = () => {
    const synth = window.speechSynthesis
    if (synth.speaking && !synth.paused) {
      synth.pause()
      setIsPaused(true)
    }
  }

  const handleStop = () => {
    const synth = window.speechSynthesis
    synth.cancel()
    setIsPlaying(false)
    setIsPaused(false)
  }

  return (
    <div className="audio-player">
      <div className="audio-player-header">
        <span className="audio-player-title">🎙️ Listen to Lester on "{bandName}"</span>
      </div>
      <div className="audio-player-controls">
        {!isPlaying || isPaused ? (
          <motion.button
            className="audio-control-btn play-btn"
            onClick={handlePlay}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ▶️ {isPaused ? 'Resume' : 'Play'}
          </motion.button>
        ) : (
          <motion.button
            className="audio-control-btn pause-btn"
            onClick={handlePause}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ⏸️ Pause
          </motion.button>
        )}
        <motion.button
          className="audio-control-btn stop-btn"
          onClick={handleStop}
          disabled={!isPlaying && !isPaused}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ⏹️ Stop
        </motion.button>
      </div>
    </div>
  )
}
