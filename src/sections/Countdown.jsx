import { Reveal, Torn } from '../components/ui'
import useCountdown from '../hooks/useCountdown'
import { wedding } from '../data/wedding'

export default function Countdown() {
  const t = useCountdown(wedding.dateISO)

  return (
    <section className="relative bg-[#edd8cd] py-2 overflow-hidden">
      <Torn fill="#f6ece5" flip />

      <Reveal className="px-5 py-8 text-center">
        <h2 className="font-script text-4xl text-wine sm:text-5xl">
          The Celebration Begins In
        </h2>

        {/* Countdown Numbers Card */}
        <div className="mx-auto mt-6 flex max-w-sm justify-center items-center gap-2 sm:gap-3 rounded-2xl bg-white/40 p-4 shadow-sm border border-gold/30 backdrop-blur-xs">
          {Object.entries(t).map(([unit, val], i) => (
            <div key={unit} className="flex items-center">
              <div className="flex flex-col items-center min-w-[58px] sm:min-w-[68px]">
                <span className="font-serif text-3xl sm:text-4xl font-semibold text-wine tabular-nums tracking-tight">
                  {String(val).padStart(2, '0')}
                </span>
                <span className="mt-1 font-serif text-xs uppercase tracking-widest text-wine/75">
                  {unit}
                </span>
              </div>
              {i < 3 && (
                <span className="text-2xl sm:text-3xl font-serif text-gold font-light px-1 mb-4 select-none">
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      </Reveal>

      <Torn fill="#f6ece5" />
    </section>
  )
}
