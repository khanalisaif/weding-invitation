import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Reveal, Title, Petals } from '../components/ui'
import { wedding } from '../data/wedding'

const n = wedding.schedule.length // 6

export default function Schedule() {
  const startPct = `${(0.5 / n) * 100}%`
  const endPct = `${((n - 0.5) / n) * 100}%`
  
  const [roseTop, setRoseTop] = useState(startPct)

  useEffect(() => {
    // Start rose animation shortly after page enters
    const t = setTimeout(() => {
      setRoseTop(endPct)
    }, 600)
    return () => clearTimeout(t)
  }, [endPct])

  return (
    <section className="paper relative h-[100svh] w-full flex flex-col justify-center overflow-hidden border-t border-white/20">
      <Petals />
      <Title>Schedule of Events</Title>

      <div className="relative mx-auto mt-6 max-w-sm px-2">
        {/* Central Vertical Stem Line */}
        <div className="absolute left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-wine/20 via-wine/50 to-wine/20" />

        {/* Rose — animates down automatically */}
        <motion.div
          className="absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          initial={false}
          animate={{ top: roseTop }}
          transition={{ duration: 3.5, ease: 'easeInOut' }}
        >
          <img
            src="/images/rose.png"
            alt="Timeline rose marker"
            className="w-10 sm:w-11 drop-shadow-[0_4px_10px_rgba(90,15,28,0.45)]"
          />
        </motion.div>

        {/* Timeline Events */}
        <div className="space-y-3 sm:space-y-4">
          {wedding.schedule.map((item, index) => (
            <Reveal
              key={index}
              delay={0.4 + index * 0.4} // Stagger in sync with rose roughly
              className="relative grid grid-cols-2 items-center gap-6 sm:gap-8 py-3 sm:py-4"
            >
              {/* Left Column: Time */}
              <div className="text-right pr-4">
                <span className="font-serif text-[1.3rem] font-semibold text-wine sm:text-3xl">
                  {item.time}
                </span>
              </div>

              {/* Center Node Diamond */}
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <span className="block h-2 w-2 sm:h-2.5 sm:w-2.5 rotate-45 border border-gold bg-[#f6ece5] shadow-xs" />
              </div>

              {/* Right Column: Event Title */}
              <div className="text-left pl-4">
                <p className="font-serif text-[1.15rem] font-medium leading-snug text-wine sm:text-2xl">
                  {item.title}
                </p>
                {item.desc && (
                  <p className="mt-0.5 font-serif text-[0.7rem] sm:text-xs italic text-wine/65">
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
