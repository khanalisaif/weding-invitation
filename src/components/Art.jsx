import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'

/* ---------- Generated sepia illustration of the venue (Samuday Bhawan) ---------- */
export function VenueArt({ name = 'SAMUDAY BHAWAN' }) {
  const ink = '#6b4a2b'
  const win = (x, y) => (
    <g key={`${x}-${y}`}>
      <path d={`M${x} ${y + 34}V${y + 10}a9 9 0 0 1 18 0V${y + 34}z`} fill="#e9d8bd" stroke={ink} strokeWidth="1.6" />
      <path d={`M${x + 9} ${y + 2}V${y + 34}M${x} ${y + 20}H${x + 18}`} stroke={ink} strokeWidth="1" />
    </g>
  )
  const cypress = (x) => (
    <g key={x}>
      <path d={`M${x} 58c14 24 14 70 0 116c-14-46-14-92 0-116z`} fill="#8d7a52" stroke={ink} strokeWidth="1.6" />
      {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} d={`M${x - 8 + (i % 2) * 4} ${86 + i * 14}q8 -6 16 0`} stroke={ink} strokeWidth=".8" fill="none" />)}
    </g>
  )
  const palm = (x) => (
    <g key={x} stroke={ink} strokeWidth="1.6" fill="#8d7a52">
      <path d={`M${x} 190c2-30 2-60 -2-86`} fill="none" />
      {[-48, -24, 0, 24, 48].map((a) => <path key={a} d={`M${x - 2} 104q${a} -26 ${a * 1.7} 4q${-a * .5} -10 ${-a * 1.7} -4z`} />)}
    </g>
  )
  return (
    <svg viewBox="0 0 520 260" className="w-full" role="img" aria-label={name}>
      <defs><filter id="rough"><feTurbulence baseFrequency=".04" numOctaves="2" /><feDisplacementMap in="SourceGraphic" scale="1.6" /></filter></defs>
      <g filter="url(#rough)">
        <path d="M20 205H500" stroke={ink} strokeWidth="2" />
        {[...Array(26)].map((_, i) => <path key={i} d={`M${24 + i * 19} 205l-6 12M${30 + i * 19} 212l-5 9`} stroke={ink} strokeWidth=".7" />)}
        {cypress(210)}{cypress(250)}{palm(440)}{palm(478)}
        {/* main body */}
        <path d="M45 205V118H175V92H345V118H470V205z" fill="#f3e6cf" stroke={ink} strokeWidth="2" />
        <path d="M38 118H182V108H338V118H478V108" fill="none" stroke={ink} strokeWidth="2" />
        <path d="M30 118L60 96H160L182 108M338 108L360 96H460L490 118" fill="#c9a373" stroke={ink} strokeWidth="2" />
        {/* arcade */}
        {[62, 96, 130, 372, 406, 440].map((x) => win(x, 150))}
        {[78, 112, 372, 406].map((x) => win(x, 122))}
        <path d="M190 205V130h140V205z" fill="#e2cfae" stroke={ink} strokeWidth="2" />
        {[205, 232, 262, 289].map((x) => <path key={x} d={`M${x} 205V150a11 11 0 0 1 22 0V205`} fill="#8b6a46" stroke={ink} strokeWidth="1.4" />)}
        <rect x="205" y="100" width="110" height="22" rx="3" fill="#fbf3e2" stroke={ink} strokeWidth="1.6" />
        <text x="260" y="116" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="13" fontWeight="700" letterSpacing="2" fill={ink}>{name}</text>
        {[0, 1, 2, 3].map((i) => <path key={i} d={`M${60 + i * 120} 218l12 10 14 -8`} stroke={ink} strokeWidth="1" fill="none" />)}
      </g>
    </svg>
  )
}

/* ---------- Generated illustrated guests (dress-code figures) ---------- */
const Man = ({ x, suit, shirt = '#f3ece0', h = 1 }) => (
  <g transform={`translate(${x} ${(1 - h) * 40}) scale(${h})`}>
    <circle cx="0" cy="22" r="11" fill="#d9a77f" /><path d="M-11 20a11 12 0 0 1 22 -3c-4-8-18-8-22 3z" fill="#1c1410" />
    <path d="M-17 40q17-8 34 0l5 70h-12l-3 -42h-14l-3 42h-12z" fill={suit} />
    <path d="M-4 38l4 22l4 -22z" fill={shirt} />
    <path d="M-12 110h10v82h-10zM2 110h10v82H2z" fill={suit} /><path d="M-14 192h14v8h-18zM0 192h14l4 8H0z" fill="#241a14" />
  </g>
)
const Woman = ({ x, dress, h = 1 }) => (
  <g transform={`translate(${x} ${(1 - h) * 40}) scale(${h})`}>
    <path d="M-12 22c-6 20-4 44 4 52h16c8-8 10-32 4-52z" fill="#2b1810" />
    <circle cx="0" cy="22" r="10" fill="#d9a77f" />
    <path d="M-12 38q12-5 24 0l6 40l16 122h-68l16-122z" fill={dress} />
    <path d="M-8 200h6v6h-6zM2 200h6v6H2z" fill="#241a14" />
  </g>
)
export function GuestsArt({ variant = 'a' }) {
  const wine = '#6a1626', blk = '#1f1a1c', burg = '#7d2433'
  const row = variant === 'a'
    ? [<Woman key="1" x={60} dress={blk} h={0.97} />, <Man key="2" x={120} suit={blk} />, <Woman key="3" x={180} dress={burg} h={1.0} />, <Man key="4" x={242} suit={wine} />, <Woman key="5" x={300} dress={wine} h={0.98} />, <Man key="6" x={360} suit={blk} h={1.02} />]
    : [<Man key="1" x={60} suit="#a8c8b4" />, <Woman key="2" x={120} dress="#f1e3cf" />, <Man key="3" x={182} suit="#9b8c7a" h={1.02} />, <Woman key="4" x={242} dress="#2a2224" />, <Man key="5" x={302} suit="#f5ead8" />, <Man key="6" x={362} suit="#1d1d1d" h={1.02} />]
  return <svg viewBox="0 0 420 210" className="mx-auto w-full max-w-sm">{row}</svg>
}

/* ---------- Tap to flip between generated art and the real photo ---------- */
export function FlipPhoto({ art, photo, alt, hint = 'tap to see photo' }) {
  const [real, setReal] = useState(false)
  return (
    <button type="button" onClick={() => setReal((r) => !r)} className="relative mx-auto block w-full max-w-sm text-center">
      <AnimatePresence mode="wait">
        <motion.div key={real ? 'p' : 'a'} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          {real ? <img src={photo} alt={alt} className="w-full rounded-xl border-[3px] border-gold/50 shadow-xl" /> : art}
        </motion.div>
      </AnimatePresence>
      <span className="mt-1 block font-serif text-xs italic text-wine/50">{real ? 'tap for illustration' : hint}</span>
    </button>
  )
}

/* ---------- Rose/gold floral corners cropped from the uploaded frame ---------- */
const CORNERS = {
  tr: { r: 384 / 450, css: 'right-0 top-0', img: { right: 0, top: 0 } },
  bl: { r: 380 / 476, css: 'left-0 bottom-0', img: { left: 0, bottom: 0 } },
  br: { r: 324 / 306, css: 'right-0 bottom-0', img: { right: 0, bottom: 0 } },
}
export function Corner({ pos = 'tr', w = 150, flip = false, className = '' }) {
  const c = CORNERS[pos]
  const scale = pos === 'tr' ? 1024 / 384 : pos === 'bl' ? 1024 / 380 : 1024 / 324
  return (
    <div aria-hidden className={`pointer-events-none absolute overflow-hidden ${c.css} ${className}`} style={{ width: w, height: w / c.r, transform: flip ? 'scaleX(-1)' : undefined }}>
      <img src="/images/frame.png" alt="" className="absolute max-w-none" style={{ width: w * scale, ...c.img }} />
    </div>
  )
}

export const Diamond = () => <span className="block h-2 w-2 rotate-45 bg-wine/70" />
