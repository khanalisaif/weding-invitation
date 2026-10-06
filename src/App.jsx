import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import Envelope from './sections/Envelope'
import Hero from './sections/Hero'
import Invitation from './sections/Invitation'
import Countdown from './sections/Countdown'
import Schedule from './sections/Schedule'
import Location from './sections/Location'
import DressCode from './sections/DressCode'
import Footer from './sections/Footer'
import MusicPlayer from './components/MusicPlayer'

const slideVariants = {
  enter: (direction) => ({
    y: direction > 0 ? '100%' : '-100%',
    zIndex: 10,
    boxShadow: '0 0 50px rgba(0,0,0,0.8)'
  }),
  center: {
    y: 0,
    zIndex: 10,
    boxShadow: '0 0 50px rgba(0,0,0,0.8)'
  },
  exit: (direction) => ({
    y: 0, // Stay pinned in the background! This makes the new page slide OVER it.
    zIndex: 1,
  })
}

export default function App() {
  const [played, setPlayed] = useState(false)
  const [gone, setGone] = useState(false)
  const [playTrigger, setPlayTrigger] = useState(1) // Auto start if browser allows

  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const isAnimating = useRef(false)
  const touchStartY = useRef(0)

  // Sections array
  const sections = [
    <Hero key="hero" play={played}>
      {!gone && <Envelope onOpen={() => { setPlayTrigger(t => t + 1); setTimeout(() => setPlayed(true), 200) }} onDone={() => setGone(true)} />}
    </Hero>,
    <Invitation key="inv" />,
    <Countdown key="count" />,
    <Schedule key="sched" />,
    <DressCode key="dress" />,
    <Location key="loc" />,
    <Footer key="foot" />
  ]

  const paginate = (newDirection) => {
    if (isAnimating.current || !gone) return;
    const newPage = page + newDirection;
    if (newPage >= 0 && newPage < sections.length) {
      setDirection(newDirection);
      setPage(newPage);
      isAnimating.current = true;
      setTimeout(() => { isAnimating.current = false }, 2200); // strict backup lock
    }
  }

  useEffect(() => {
    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > 30) {
        paginate(e.deltaY > 0 ? 1 : -1)
      }
    }

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY
      const distance = touchStartY.current - touchEndY
      if (distance > 50) paginate(1)
      else if (distance < -50) paginate(-1)
    }

    window.addEventListener('wheel', handleWheel)
    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [page, gone])

  const getMusicSrc = () => {
    if (!played) return '/WhatsApp Audio 2026-10-06 at 12.02.54 PM.mpeg' // Envelope / Web open
    if (page === 0) return '/WhatsApp Audio 2026-10-06 at 12.01.14 PM.mpeg' // Hero (starts when seal opens)
    if (page === 1) return '/WhatsApp Audio 2026-10-06 at 12.04.28 PM.mpeg' // Invitation
    if (page === 2) return '/WhatsApp Audio 2026-10-06 at 12.07.53 PM.mpeg' // Countdown (Timer)
    if (page === 3) return '/WhatsApp Audio 2026-10-06 at 12.11.39 PM.mpeg' // Schedule
    if (page === 4) return '/WhatsApp Audio 2026-10-06 at 4.32.53 PM.mpeg' // DressCode
    if (page === 5) return '/WhatsApp Audio 2026-10-06 at 4.34.05 PM.mpeg' // Location
    if (page === 6) return '/WhatsApp Audio 2026-10-06 at 4.36.00 PM.mpeg' // Footer
    return '/music.mp4' // Fallback
  }

  return (
    <div className="fixed inset-0 bg-[#2a0508] text-wine selection:bg-wine selection:text-paper overflow-hidden">
      <MusicPlayer autoStart={true} src={getMusicSrc()} />

      <main className="relative mx-auto w-full max-w-[440px] h-[100svh] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border-x border-gold/20">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 1.8, ease: [0.25, 1, 0.35, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            {sections[page]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
