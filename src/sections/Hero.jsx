import { motion, AnimatePresence } from 'motion/react'
import { wedding } from '../data/wedding'

// Generate falling rose petals that drift left → right (as seen in video)
const PETALS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  // Start positions spread along the left and top-right edges
  startX: `${-5 + (i * 8) % 35}%`,
  size: 10 + (i * 5) % 14,
  dur: 5 + (i * 1.3) % 6,
  delay: (i * 0.7) % 7,
  // Drift rightward: each petal moves +60 to +150px to the right while falling
  driftX: 60 + (i * 19) % 90,
  rotate: (i * 67) % 360,
  rotateEnd: (i * 67 + 180 + (i % 2 ? 120 : -120)) % 360,
}))

function FallingPetals({ play }) {
  if (!play) return null
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {PETALS.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-0"
          style={{
            left: p.startX,
            width: p.size,
            height: p.size * 1.4,
            borderRadius: '70% 0 70% 0',
            background: 'linear-gradient(135deg, #e8a0a8, #c0566a)',
            opacity: 0,
          }}
          animate={{
            y: ['-10vh', '110vh'],
            x: [0, p.driftX],
            rotate: [p.rotate, p.rotateEnd],
            opacity: [0, 0.85, 0.75, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  )
}

export default function Hero({ play, children }) {
  const { a, b } = wedding.couple
  const up = (d) => ({
    initial: { opacity: 0, y: 22 },
    animate: play ? { opacity: 1, y: 0 } : {},
    transition: { duration: 1.2, delay: d, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden select-none bg-[radial-gradient(circle_at_50%_20%,rgba(90,15,28,0.95)_0%,rgba(15,2,4,0.99)_75%)] bg-[#140204]">
      {/* Background swans arch image */}
      <motion.img
        src="/images/hero.jpg"
        alt="Romantic swans under floral arch"
        className="absolute inset-0 h-full w-full object-cover object-bottom"
        initial={{ scale: 1.15 }}
        animate={play ? { scale: 1 } : {}}
        transition={{ duration: 3.2, ease: 'easeOut' }}
      />

      {/* Gentle vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/25 pointer-events-none" />

      {/* Falling rose petals drifting left → right (starts after envelope opens) */}
      <FallingPetals play={play} />

      {/* Header Text */}
      <div className="absolute inset-x-0 top-[14%] flex flex-col items-center text-center text-wine px-4">
        <motion.p
          {...up(0.4)}
          className="font-serif italic text-2xl tracking-wide text-[#52131f] drop-shadow-sm"
        >
          Wedding Day
        </motion.p>

        <motion.p
          {...up(0.65)}
          className="mt-1 font-serif tracking-[0.3em] text-lg font-medium text-[#681928]"
        >
          {wedding.dateLabel}
        </motion.p>

        <motion.div {...up(1.0)} className="mt-5 flex flex-col items-center w-full px-2">
          <h1 className="font-script text-[2.6rem] leading-[1.05] text-wine drop-shadow-sm sm:text-5xl whitespace-nowrap">
            {a}
          </h1>
          <span className="font-script text-2xl leading-none text-rosegold my-1">
            &amp;
          </span>
          <h1 className="font-script text-[2.6rem] leading-[1.05] text-wine drop-shadow-sm sm:text-5xl whitespace-nowrap">
            {b}
          </h1>
        </motion.div>
      </div>

      {/* Scroll Down at bottom */}
      <motion.a
        href="#invite"
        {...up(1.8)}
        className="absolute bottom-5 sm:bottom-6 inset-x-0 z-10 flex flex-col items-center text-center cursor-pointer group"
      >
        <span className="font-serif italic text-base sm:text-lg text-[#4a0d17] drop-shadow-[0_1px_3px_rgba(255,255,255,0.7)] group-hover:text-wine">
          Scroll down
        </span>
        <motion.span
          className="text-xl -mt-1 text-[#4a0d17] drop-shadow-[0_1px_3px_rgba(255,255,255,0.7)]"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          ⌄
        </motion.span>
      </motion.a>

      {/* Envelope Overlay directly on top of Hero */}
      {children}
    </section>
  )
}

