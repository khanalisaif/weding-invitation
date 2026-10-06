import { Reveal, Petals } from '../components/ui'
import { wedding } from '../data/wedding'

export default function DressCode() {
  const d = wedding.dressCode

  return (
    <section className="paper relative min-h-[100svh] flex flex-col justify-center overflow-hidden px-5 py-10 text-center border-t border-white/20 snap-start">
      <Petals />
      <Reveal delay={0.1}>
        <h2 className="font-script text-4xl leading-tight text-wine sm:text-5xl">
          Welcome to our Walima
        </h2>
        <p className="mx-auto mt-4 max-w-xs font-serif text-xl leading-relaxed text-wine/85">
          A celebration of love & togetherness
        </p>
        <p className="mx-auto mt-2 max-w-xs font-serif text-lg leading-relaxed text-wine/70">
          We’re delighted to have you with us ✨
        </p>
      </Reveal>

      {/* Gents Image as requested */}
      <Reveal delay={0.25} className="relative mx-auto mt-8 max-w-sm overflow-hidden rounded-3xl border-2 border-gold/60 bg-[#fff8f2] p-1.5 shadow-xl">
        <div className="overflow-hidden rounded-[22px]">
          <img
            src={d.photo || '/images/gents.jpg'}
            alt="Walima Welcome Inspiration"
            className="w-full h-auto object-cover object-center"
          />
        </div>
      </Reveal>
    </section>
  )
}
