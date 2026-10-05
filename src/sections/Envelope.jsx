import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const bg = { backgroundImage: 'url(/images/envelope.jpg)', backgroundSize: '100% 100%' }
const CX = '50%', CY = '42.7%'

const parts = {
  top:    { clip: `polygon(0 0, 100% 0, ${CX} ${CY})`, open: { rotateX: -170, opacity: 0 }, origin: 'top' },
  left:   { clip: `polygon(0 0, ${CX} ${CY}, 0 81%)`,  open: { x: '-110%', opacity: 0 } },
  right:  { clip: `polygon(100% 0, ${CX} ${CY}, 100% 83%)`, open: { x: '110%', opacity: 0 } },
  bottom: { clip: `polygon(0 81%, ${CX} ${CY}, 100% 83%, 100% 100%, 0 100%)`, open: { y: '110%', opacity: 0 } },
}

export default function Envelope({ onOpen, onDone }) {
  const [opening, setOpening] = useState(false)

  const go = () => {
    if (opening) return
    setOpening(true)
    onOpen?.()
  }

  return (
    <div
      className="absolute inset-0 z-30 overflow-hidden select-none"
      style={{
        perspective: 1400,
        pointerEvents: opening ? 'none' : 'auto',
      }}
    >
      {/* Soft golden glow behind seal on open */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `radial-gradient(ellipse 70% 55% at ${CX} ${CY}, rgba(255,230,160,0.30) 0%, rgba(210,155,60,0.15) 45%, transparent 75%)`,
        }}
        initial={{ opacity: 0 }}
        animate={opening ? { opacity: [0, 0.8, 1, 0] } : { opacity: 0 }}
        transition={{ duration: 1.8, times: [0, 0.25, 0.6, 1], ease: 'easeOut' }}
      />

      {/* Soft conic rays on open */}
      <AnimatePresence>
        {opening && (
          <motion.div
            className="absolute pointer-events-none z-10"
            style={{
              left: CX, top: CY,
              width: '100%', height: '100%',
              x: '-50%', y: '-50%',
              background:
                'conic-gradient(from 0deg, transparent 0deg, rgba(255,235,170,0.11) 18deg, transparent 36deg, rgba(255,220,140,0.09) 54deg, transparent 72deg, rgba(255,240,190,0.11) 90deg, transparent 108deg, rgba(255,220,140,0.09) 126deg, transparent 144deg, rgba(255,235,170,0.11) 162deg, transparent 180deg, rgba(255,220,140,0.09) 198deg, transparent 216deg, rgba(255,240,190,0.11) 234deg, transparent 252deg, rgba(255,220,140,0.09) 270deg, transparent 288deg, rgba(255,235,170,0.11) 306deg, transparent 324deg, rgba(255,220,140,0.09) 342deg, transparent 360deg)',
            }}
            initial={{ scale: 0.2, rotate: 0, opacity: 0 }}
            animate={{ scale: [0.2, 0.75, 1.1], rotate: [0, 15, 30], opacity: [0, 0.85, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, times: [0, 0.5, 1], ease: 'easeOut' }}
          />
        )}
      </AnimatePresence>

      {/* Envelope 4 Flaps — open slowly and smoothly over 1.5 seconds (dhire dhire) */}
      {Object.entries(parts).map(([k, p]) => (
        <motion.div
          key={k}
          className="absolute inset-0 shadow-2xl"
          style={{ ...bg, clipPath: p.clip, transformOrigin: p.origin || 'center' }}
          animate={
            opening
              ? { ...p.open, filter: 'brightness(1.15)' }
              : { filter: ['brightness(.75)', 'brightness(1.05)', 'brightness(.75)'] }
          }
          transition={
            opening
              ? {
                  duration: 1.5, // exact 1.5s slow/gradual opening
                  delay: k === 'top' ? 0.05 : 0.15,
                  ease: [0.25, 0.1, 0.25, 1],
                }
              : { filter: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }
          }
          onAnimationComplete={() => {
            // When the last flap finishes opening (at 0.15s + 1.5s = 1.65s), unmount envelope
            if (k === 'bottom' && opening) {
              onDone?.()
            }
          }}
        >
          {/* Idle golden shimmer */}
          <motion.div
            className="absolute inset-0 mix-blend-screen pointer-events-none"
            style={{
              background: 'linear-gradient(115deg, transparent 40%, rgba(255,225,175,0.45) 50%, transparent 60%)',
              backgroundSize: '250% 100%',
            }}
            animate={{ backgroundPositionX: ['150%', '-50%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      ))}

      {/* Center Wax Seal Button — smooth lift & fade on tap (no vibration/shake) */}
      <div
        className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
        style={{ left: CX, top: CY, width: '28%' }}
      >
        <motion.button
          type="button"
          aria-label="Open wedding invitation"
          onClick={go}
          className="w-full cursor-pointer outline-none pointer-events-auto"
          animate={
            opening
              ? {
                  scale: 1.12,
                  opacity: 0,
                  y: -18,
                }
              : { scale: [1, 1.05, 1] }
          }
          transition={
            opening
              ? {
                  duration: 0.6,
                  ease: 'easeOut',
                }
              : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <img
            src="/images/seal.png"
            alt="N&A Wedding Seal"
            className="w-full drop-shadow-[0_4px_24px_rgba(255,210,140,0.75)]"
          />
        </motion.button>
      </div>

      {/* Pulsing Hint Text */}
      {!opening && (
        <motion.div
          className="absolute inset-x-0 text-center pointer-events-none z-20"
          style={{ top: '53%' }}
          animate={{ opacity: [0.4, 1, 0.4], y: [0, 3, 0] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        >
          <p className="font-serif italic tracking-[0.25em] text-[#f2dab9] text-base drop-shadow-md">
            tap to open
          </p>
        </motion.div>
      )}
    </div>
  )
}
