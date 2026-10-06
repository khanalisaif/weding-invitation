import { Petals, Reveal, Title } from '../components/ui'
import { wedding } from '../data/wedding'

export default function Location() {
  const v = wedding.venue

  return (
    <section className="paper relative min-h-[100svh] flex flex-col justify-center overflow-hidden px-5 py-6 sm:py-10 text-center border-t border-white/20 snap-start">
      {/* Drifting Rose Petals background effect */}
      <Petals />

      <Title>Location</Title>

      <Reveal delay={0.1}>
        <h3 className="mt-3 font-serif text-[1.4rem] font-semibold tracking-wide text-wine sm:text-3xl">
          {v.name}
        </h3>
        {v.subtitle && (
          <p className="mt-0.5 font-serif text-[0.7rem] tracking-widest uppercase text-rosegold font-medium">
            {v.subtitle}
          </p>
        )}
        <p className="mt-1.5 font-serif italic text-[0.9rem] text-wine/85">
          {v.when}
        </p>
        <p className="mx-auto mt-1 max-w-xs font-serif text-[0.8rem] leading-tight text-wine/75 px-2">
          {v.address}
        </p>
      </Reveal>

      {/* Real Venue Photo in Royal Arched Frame (User's venue.jpg) */}
      <Reveal delay={0.15} className="relative mx-auto mt-4 sm:mt-6 max-w-sm overflow-hidden rounded-2xl border-2 border-gold/60 bg-[#fff9f4] p-1 sm:p-1.5 shadow-xl group">
        <div className="overflow-hidden rounded-xl">
          <img
            src={v.photo || '/images/venue.jpg'}
            alt={v.name}
            className="w-full h-44 sm:h-56 object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        {/* Subtle gold ornamental corner accents */}
        <div className="absolute top-2 left-2 rounded-full bg-deepwine/80 px-2.5 py-0.5 text-[9px] sm:text-[11px] font-serif uppercase tracking-widest text-goldlight shadow-md backdrop-blur-xs">
          Venue
        </div>
      </Reveal>

      {/* Interactive Google Map Card */}
      <Reveal delay={0.2} className="relative mx-auto mt-4 sm:mt-6 max-w-sm w-full overflow-hidden rounded-xl border border-gold/50 bg-white/70 shadow-lg">
        <iframe
          title="Wedding Venue Location Map"
          loading="lazy"
          className="h-36 sm:h-48 w-full border-0"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(v.mapQuery)}&z=15&output=embed`}
        />
        <a
          href={v.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-2.5 top-2.5 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-[0.65rem] sm:text-xs font-serif font-medium text-wine shadow-md transition-all hover:bg-white hover:shadow-lg active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-red-600">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          Open Maps ↗
        </a>
      </Reveal>
    </section>
  )
}
