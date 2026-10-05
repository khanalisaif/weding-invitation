import { Petals, Reveal, Title } from '../components/ui'
import { wedding } from '../data/wedding'

export default function Location() {
  const v = wedding.venue

  return (
    <section className="paper relative overflow-hidden px-5 py-14 text-center">
      {/* Drifting Rose Petals background effect */}
      <Petals />

      <Title>Location</Title>

      <Reveal delay={0.1}>
        <h3 className="mt-6 font-serif text-3xl font-semibold tracking-wide text-wine sm:text-4xl">
          {v.name}
        </h3>
        {v.subtitle && (
          <p className="mt-1 font-serif text-sm tracking-widest uppercase text-rosegold font-medium">
            {v.subtitle}
          </p>
        )}
        <p className="mt-2 font-serif italic text-lg text-wine/85">
          {v.when}
        </p>
        <p className="mx-auto mt-2 max-w-xs font-serif text-base text-wine/75">
          Address: {v.address}
        </p>
      </Reveal>

      {/* Real Venue Photo in Royal Arched Frame (User's venue.jpg) */}
      <Reveal delay={0.15} className="relative mx-auto mt-7 max-w-sm overflow-hidden rounded-3xl border-2 border-gold/60 bg-[#fff9f4] p-1.5 shadow-xl group">
        <div className="overflow-hidden rounded-[22px]">
          <img
            src={v.photo || '/images/venue.jpg'}
            alt={v.name}
            className="w-full h-56 sm:h-64 object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
        {/* Subtle gold ornamental corner accents */}
        <div className="absolute top-3 left-3 rounded-full bg-deepwine/80 px-3 py-0.5 text-[11px] font-serif uppercase tracking-widest text-goldlight shadow-md backdrop-blur-xs">
          Venue
        </div>
      </Reveal>

      {/* Interactive Google Map Card */}
      <Reveal delay={0.2} className="relative mx-auto mt-7 max-w-sm overflow-hidden rounded-2xl border border-gold/50 bg-white/70 shadow-lg">
        <iframe
          title="Wedding Venue Location Map"
          loading="lazy"
          className="h-60 w-full border-0"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(v.mapQuery)}&z=15&output=embed`}
        />
        <a
          href={v.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-xs font-serif font-medium text-wine shadow-md transition-all hover:bg-white hover:shadow-lg active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-red-600">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          Open in Maps ↗
        </a>
      </Reveal>
    </section>
  )
}
