import { useEffect, useState } from 'react'
import Envelope from './sections/Envelope'
import Hero from './sections/Hero'
import Invitation from './sections/Invitation'
import Countdown from './sections/Countdown'
import Schedule from './sections/Schedule'
import Location from './sections/Location'
import DressCode from './sections/DressCode'
import Rsvp from './sections/Rsvp'
import Footer from './sections/Footer'
import MusicPlayer from './components/MusicPlayer'

export default function App() {
  const [played, setPlayed] = useState(false)
  const [gone, setGone] = useState(false)
  const [startMusic, setStartMusic] = useState(false)

  // Force scroll to top on mount and prevent automatic browser scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  useEffect(() => {
    document.body.style.overflow = gone ? '' : 'hidden'
    if (!gone) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [gone])

  const handleEnvelopeOpen = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    setStartMusic(true)
    // Start Hero text and falling rose petals immediately as flaps open
    setTimeout(() => setPlayed(true), 200)
  }

  const handleEnvelopeDone = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    setGone(true)
  }

  return (
    <div className="min-h-screen bg-[#140204] text-wine selection:bg-wine selection:text-paper">
      {/* Desktop ambient bg */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(90,15,28,0.35)_0%,rgba(15,2,4,0.95)_75%)]" />

      <MusicPlayer autoStart={startMusic} />

      {/* Main content: While envelope is active, lock height to 100svh so page cannot scroll */}
      <main className={`relative mx-auto max-w-[440px] overflow-hidden bg-[#f6ece5] shadow-[0_0_50px_rgba(0,0,0,0.8)] border-x border-gold/20 ${!gone ? 'h-[100svh]' : 'min-h-screen'}`}>
        <Hero play={played}>
          {!gone && (
            <Envelope
              onOpen={handleEnvelopeOpen}
              onDone={handleEnvelopeDone}
            />
          )}
        </Hero>
        <Invitation />
        <Countdown />
        <Schedule />
        <Location />
        <DressCode />
        <Rsvp />
        <Footer />
      </main>
    </div>
  )
}
