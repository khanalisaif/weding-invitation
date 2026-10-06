import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function MusicPlayer({ autoStart = false, src = '/music.mp4' }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)
  
  // Track if user explicitly clicked pause
  const userPaused = useRef(false)

  // Handle track change
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const wasPlaying = isPlaying
    if (wasPlaying) {
      audio.pause()
    }

    // Changing the src automatically resets playback
    // Play if it was playing previously, OR if autoStart is true and user hasn't explicitly paused
    if (wasPlaying || (autoStart && !userPaused.current)) {
      setTimeout(() => {
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
      }, 50)
    }
  }, [src, autoStart])

  // Try playing when autoStart changes
  useEffect(() => {
    if (autoStart && !userPaused.current && !isPlaying) {
      audioRef.current?.play()
        .then(() => setIsPlaying(true))
        .catch(() => { })
    }
  }, [autoStart])

  // Global click to bypass browser autoplay blocks
  useEffect(() => {
    const unlock = () => {
      if (autoStart && !userPaused.current && !isPlaying && audioRef.current) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
      }
    }
    document.addEventListener('click', unlock)
    document.addEventListener('touchstart', unlock)
    return () => {
      document.removeEventListener('click', unlock)
      document.removeEventListener('touchstart', unlock)
    }
  }, [autoStart, isPlaying])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
      userPaused.current = true // Remember that user turned it OFF
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
        userPaused.current = false // User turned it ON
      }).catch(() => {})
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" loop />

      <div className="fixed bottom-5 right-5 z-40">
        <motion.button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold/70 bg-[#4e0c19] shadow-[0_4px_20px_rgba(90,15,28,0.6)] backdrop-blur-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Pulse ring when playing */}
          {isPlaying && (
            <motion.span
              className="absolute inset-0 rounded-full border border-gold/50"
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}

          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.svg
                key="note"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5 text-white"
              >
                <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z" />
              </motion.svg>
            ) : (
              <motion.svg
                key="play"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="ml-0.5 h-5 w-5 text-white"
              >
                <path d="M8 5v14l11-7z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  )
}
