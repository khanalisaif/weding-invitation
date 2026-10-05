import { Reveal } from '../components/ui'
import { wedding } from '../data/wedding'

export default function Invitation() {
  const { a, b } = wedding.couple

  return (
    <section id="invite" className="paper relative overflow-hidden px-6 pt-10 pb-16 text-center">
      {/* Floral Garland Header from video */}
      <div className="relative mx-auto -mt-6 mb-4 w-full max-w-sm overflow-hidden">
        <img
          src="/images/floral-banner.png"
          alt="Wedding floral garland"
          className="w-full object-contain drop-shadow-md"
        />
      </div>

      <Reveal delay={0.1}>
        <h2 className="font-script text-5xl leading-tight text-wine sm:text-6xl">
          {a} &amp; {b}
        </h2>
        <p className="mt-1 font-script text-3xl text-rosegold">
          warmly invite you
        </p>
      </Reveal>

      <Reveal delay={0.25}>
        <p className="mx-auto mt-6 max-w-xs font-serif text-xl leading-relaxed text-wine/80">
          {wedding.intro}
        </p>
      </Reveal>

      {/* Decorative filigree divider */}
      <Reveal delay={0.35} className="mt-8 flex justify-center items-center gap-3 text-gold/80">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
        <span className="text-xl">❦</span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
      </Reveal>
    </section>
  )
}
