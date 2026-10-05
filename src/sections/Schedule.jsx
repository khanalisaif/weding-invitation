import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import { Reveal, Title } from '../components/ui'
import { wedding } from '../data/wedding'

const n = wedding.schedule.length // 5

// Build a step-function input/output so the rose SNAPS directly to each dot
// Each dot is at position: ((i + 0.5) / n) * 100%
// We create tight pairs around each 1/n scroll boundary so the jump is instant
const inputSteps = []
const outputSteps = []

for (let i = 0; i < n; i++) {
  const dotPct = `${((i + 0.5) / n) * 100}%`
  const startPct = i === 0 ? '0%' : `${(i / n) * 100 + 0.5}%`
  const endPct   = i === n - 1 ? '100%' : `${((i + 1) / n) * 100 - 0.5}%`

  const inStart  = i === 0 ? 0 : i / n + 0.005
  const inEnd    = i === n - 1 ? 1 : (i + 1) / n - 0.005

  inputSteps.push(inStart, inEnd)
  outputSteps.push(dotPct, dotPct)
}

export default function Schedule() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 55%'],
  })

  // Step-snapped position — rose jumps dot-to-dot
  const roseTopRaw = useTransform(scrollYProgress, inputSteps, outputSteps)
  // Tiny spring so the snap has a soft micro-bounce (not a slide)
  const roseTop = useSpring(roseTopRaw, { stiffness: 400, damping: 28, mass: 0.6 })

  return (
    <section className="paper relative px-5 py-14 overflow-hidden">
      <Title>Schedule of Events</Title>

      <div ref={containerRef} className="relative mx-auto mt-10 max-w-sm px-2">
        {/* Central Vertical Stem Line */}
        <div className="absolute left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-wine/20 via-wine/50 to-wine/20" />

        {/* Rose — snaps sequentially dot by dot with gentle micro-bounce */}
        <motion.div
          className="absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ top: roseTop }}
        >
          <img
            src="/images/rose.png"
            alt="Timeline rose marker"
            className="w-10 sm:w-11 drop-shadow-[0_4px_10px_rgba(90,15,28,0.45)]"
          />
        </motion.div>

        {/* Timeline Events */}
        <div className="space-y-4">
          {wedding.schedule.map((item, index) => (
            <Reveal
              key={item.time}
              delay={index * 0.08}
              className="relative grid grid-cols-2 items-center gap-8 py-5"
            >
              {/* Left Column: Time */}
              <div className="text-right pr-4">
                <span className="font-serif text-2xl font-semibold text-wine sm:text-3xl">
                  {item.time}
                </span>
              </div>

              {/* Center Node Diamond */}
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <span className="block h-2.5 w-2.5 rotate-45 border border-gold bg-[#f6ece5] shadow-xs" />
              </div>

              {/* Right Column: Event Title */}
              <div className="text-left pl-4">
                <p className="font-serif text-xl font-medium leading-snug text-wine sm:text-2xl">
                  {item.title}
                </p>
                {item.desc && (
                  <p className="mt-0.5 font-serif text-xs italic text-wine/65">
                    {item.desc}
                  </p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
