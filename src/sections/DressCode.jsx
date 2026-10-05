import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Reveal, Title } from '../components/ui'
import { wedding } from '../data/wedding'

export default function DressCode() {
  const d = wedding.dressCode
  const [activeTab, setActiveTab] = useState('gents') // 'gents' or 'ladies'

  return (
    <section className="paper relative overflow-hidden px-5 py-14 text-center">

      <Title>{d.title || 'Dress Code'}</Title>

      <Reveal delay={0.1}>
        <p className="mx-auto mt-5 max-w-xs font-serif text-xl leading-relaxed text-wine/85">
          {d.text}
        </p>
      </Reveal>

      {/* Color Swatches matching gents.jpg and wedding tones */}
      <Reveal delay={0.15} className="mx-auto mt-6 flex max-w-sm flex-wrap justify-center gap-3 sm:gap-4">
        {d.palette.map((c) => (
          <div key={c.name} className="flex flex-col items-center">
            <span
              className="block h-10 w-10 sm:h-11 sm:w-11 rounded-full border-2 border-gold/60 shadow-md transition-transform hover:scale-110"
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
            <span className="mt-1 font-serif text-xs font-medium text-wine/80">
              {c.name}
            </span>
          </div>
        ))}
      </Reveal>

      {/* Toggle between Gentlemen and Ladies Attire Inspiration */}
      <Reveal delay={0.2} className="mt-7 flex justify-center gap-2">
        <button
          onClick={() => setActiveTab('gents')}
          className={`rounded-full px-5 py-1.5 font-serif text-sm transition-all ${
            activeTab === 'gents'
              ? 'bg-wine text-[#fcf2ec] shadow-md border border-gold/40'
              : 'bg-white/60 text-wine/80 hover:bg-white border border-gold/20'
          }`}
        >
          Gentlemen (Main)
        </button>
        {d.ladiesPhoto && (
          <button
            onClick={() => setActiveTab('ladies')}
            className={`rounded-full px-5 py-1.5 font-serif text-sm transition-all ${
              activeTab === 'ladies'
                ? 'bg-wine text-[#fcf2ec] shadow-md border border-gold/40'
                : 'bg-white/60 text-wine/80 hover:bg-white border border-gold/20'
            }`}
          >
            Ladies
          </button>
        )}
      </Reveal>

      {/* Dress Code Photo Showcase (User's gents.jpg) */}
      <Reveal delay={0.25} className="relative mx-auto mt-5 max-w-sm overflow-hidden rounded-3xl border-2 border-gold/60 bg-[#fff8f2] p-1.5 shadow-xl">
        <div className="overflow-hidden rounded-[22px]">
          <AnimatePresence mode="wait">
            {activeTab === 'gents' ? (
              <motion.div
                key="gents"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
              >
                <img
                  src={d.photo || '/images/gents.jpg'}
                  alt="Gentlemen Dress Code Inspiration"
                  className="w-full h-auto object-cover object-center"
                />
              </motion.div>
            ) : (
              <motion.div
                key="ladies"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35 }}
              >
                <img
                  src={d.ladiesPhoto || '/images/ladies.jpg'}
                  alt="Ladies Dress Code Inspiration"
                  className="w-full h-auto object-cover object-center"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Small label indicator */}
        <div className="absolute top-3 left-3 rounded-full bg-deepwine/80 px-3 py-0.5 text-[11px] font-serif uppercase tracking-widest text-goldlight shadow-md backdrop-blur-xs">
          {activeTab === 'gents' ? 'Gentlemen Attire' : 'Ladies Attire'}
        </div>
      </Reveal>
    </section>
  )
}
