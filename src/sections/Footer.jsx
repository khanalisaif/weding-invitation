import { Reveal } from '../components/ui'
import { wedding } from '../data/wedding'

export default function Footer() {
  const { a, b } = wedding.couple
  return (
    <footer className="bg-[#1f0307] px-6 py-14 text-center text-[#f2dab9] border-t border-gold/30">
      <Reveal>
        <img
          src={wedding.couple.sealImg || '/images/seal-gz.png'}
          alt="Couple Monogram"
          className="mx-auto w-16 sm:w-20 drop-shadow-[0_0_12px_rgba(255,215,140,0.5)]"
        />
        <p className="mt-4 font-script text-4xl text-goldlight">
          {a} &amp; {b}
        </p>
        <p className="mt-1 font-serif text-sm tracking-[0.3em] uppercase text-[#e4c49d]/80">
          {wedding.dateLabel}
        </p>
        <p className="mt-4 font-serif italic text-sm text-[#e4c49d]/60">
          With love, gratitude &amp; blessings
        </p>
      </Reveal>
    </footer>
  )
}
