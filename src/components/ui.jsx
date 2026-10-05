import { motion } from 'motion/react'

export const Reveal = ({ children, delay = 0, y = 30, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.9, delay, ease: 'easeOut' }}>
    {children}
  </motion.div>
)

export const Title = ({ children }) => (
  <Reveal className="flex items-center justify-center gap-3 text-wine">
    <span className="text-gold">❦</span>
    <h2 className="font-serif italic text-3xl">{children}</h2>
    <span className="text-gold scale-x-[-1]">❦</span>
  </Reveal>
)

export const Torn = ({ flip = false, fill = '#efdfd6' }) => (
  <svg viewBox="0 0 400 24" preserveAspectRatio="none" className={`w-full h-5 block ${flip ? 'rotate-180' : ''}`}>
    <path fill={fill} d="M0 24V8l15 5 20-9 25 8 22-6 28 8 30-9 24 7 32-6 28 9 26-8 30 7 25-9 24 8 20-6V24z" />
  </svg>
)

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37) % 100}%`, size: 10 + ((i * 7) % 10), dur: 9 + ((i * 3) % 7), delay: (i * 1.3) % 8, dx: `${((i % 2 ? 1 : -1) * (30 + i * 6))}px`,
}))
export const Petals = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
    {PETALS.map((p, i) => (
      <span key={i} className="absolute top-0 block"
        style={{ left: p.left, width: p.size, height: p.size * 1.3, '--dx': p.dx, borderRadius: '70% 0 70% 0',
          background: 'linear-gradient(135deg,#f6c9c4,#d98a8f)', animation: `petal ${p.dur}s linear ${p.delay}s infinite` }} />
    ))}
  </div>
)
