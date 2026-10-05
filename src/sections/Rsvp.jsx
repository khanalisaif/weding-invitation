import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Reveal } from '../components/ui'
import { wedding } from '../data/wedding'

export default function Rsvp() {
  const { a, b } = wedding.couple
  const [open, setOpen] = useState(false)
  const [submittedData, setSubmittedData] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding_rsvp')
      return saved ? JSON.parse(saved) : null
    } catch {
      return null
    }
  })

  const [formData, setFormData] = useState({
    name: '',
    attending: 'Accepts with pleasure',
    guests: '1',
    note: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const result = {
      name: formData.name.trim(),
      attending: formData.attending,
      guests: formData.attending === 'Declines with regret' ? '0' : formData.guests,
      note: formData.note.trim(),
      timestamp: new Date().toISOString(),
    }
    setSubmittedData(result)
    try {
      localStorage.setItem('wedding_rsvp', JSON.stringify(result))
    } catch (e) {
      console.error(e)
    }
  }

  const resetRsvp = () => {
    setSubmittedData(null)
    try {
      localStorage.removeItem('wedding_rsvp')
    } catch (e) {
      console.error(e)
    }
  }

  const field =
    'mt-1 w-full rounded-xl border border-wine/30 bg-white/90 px-4 py-2.5 font-serif text-lg text-wine outline-none transition-all focus:border-wine focus:ring-2 focus:ring-wine/20'

  return (
    <section className="paper relative overflow-hidden px-5 pt-8 pb-10 text-center">
      <Reveal>
        <h2 className="font-script text-4xl text-wine sm:text-5xl">
          Confirm Your Attendance
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mx-auto mt-3 max-w-xs font-serif text-lg leading-relaxed text-wine/80">
          To help us prepare for a joyful celebration, kindly confirm your attendance.
        </p>
      </Reveal>

      {/* RSVP Wax Seal Button from Video */}
      <Reveal delay={0.2} className="mt-7">
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          className="group relative mx-auto flex flex-col items-center cursor-pointer outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src="/images/rsvp-seal.png"
            alt="RSVP Wax Seal"
            className="w-28 sm:w-32 drop-shadow-[0_8px_18px_rgba(90,15,28,0.45)] transition-transform group-hover:scale-105"
          />
          <motion.div
            className="mt-2 flex flex-col items-center font-serif text-sm italic text-wine/90"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-xs leading-none">⌃</span>
            <span className="tracking-wide">Click to open</span>
          </motion.div>
        </motion.button>
      </Reveal>

      {/* Hope to see you there */}
      <Reveal delay={0.25} className="mt-12">
        <p className="font-script text-4xl text-wine sm:text-5xl">
          Hope to see you there!
        </p>
        <p className="mt-2 font-serif text-2xl font-semibold tracking-wide text-rosegold sm:text-3xl">
          {a} &amp; {b}
        </p>
      </Reveal>

      {/* Bottom Lush Floral Garland from video */}
      <div className="relative mx-auto mt-8 w-full max-w-sm overflow-hidden">
        <img
          src="/images/floral-banner.png"
          alt="Wedding floral arrangement"
          className="w-full object-contain drop-shadow-md"
        />
      </div>

      {/* RSVP Modal Popup matching video frames 00:20 - 00:22 */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4 backdrop-blur-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="paper relative max-h-[90svh] w-full max-w-[460px] overflow-y-auto rounded-t-[32px] sm:rounded-[32px] p-6 sm:p-8 text-left shadow-2xl border border-gold/40"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close RSVP form"
                className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-wine/10 text-2xl leading-none text-wine transition-colors hover:bg-wine/20"
              >
                ×
              </button>

              <div className="text-center">
                <img
                  src="/images/rsvp-seal.png"
                  alt="RSVP Seal"
                  className="mx-auto w-16 drop-shadow-sm mb-2"
                />
                <h3 className="font-serif text-2xl font-semibold text-wine sm:text-3xl">
                  Confirm Your Attendance
                </h3>
              </div>

              {submittedData ? (
                /* Success Confirmation State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 text-center space-y-4 py-4"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-800 border border-emerald-300">
                    ✓
                  </div>
                  <h4 className="font-serif text-2xl font-semibold text-wine">
                    Thank You, {submittedData.name}!
                  </h4>
                  <p className="font-serif text-lg text-wine/80">
                    {submittedData.attending === 'Accepts with pleasure'
                      ? `We can't wait to celebrate with you! (${submittedData.guests} guest${submittedData.guests > 1 ? 's' : ''})`
                      : 'You will be missed dearly. Thank you for letting us know!'}
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="w-full rounded-xl bg-gradient-to-r from-wine to-[#7a1827] py-3 font-serif text-lg font-medium text-[#fcf2ec] shadow-lg hover:brightness-110 active:scale-98"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={resetRsvp}
                      className="text-xs font-serif italic text-wine/70 hover:underline"
                    >
                      Edit RSVP details
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* RSVP Form from Video */
                <form onSubmit={handleSubmit} className="mt-6 space-y-5 font-serif text-lg text-wine">
                  <div>
                    <label htmlFor="rsvp-name" className="block text-base font-medium">
                      Your name
                    </label>
                    <input
                      id="rsvp-name"
                      required
                      type="text"
                      placeholder="e.g. Sofia Rahman"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={field}
                    />
                  </div>

                  <div>
                    <span className="block text-base font-medium mb-1.5">
                      Will you be attending?
                    </span>
                    <div className="space-y-2">
                      {['Accepts with pleasure', 'Declines with regret'].map((option) => (
                        <label
                          key={option}
                          className={`flex items-center gap-3 rounded-xl border p-3 cursor-pointer transition-all ${
                            formData.attending === option
                              ? 'border-wine bg-wine/10 font-medium'
                              : 'border-wine/20 bg-white/60 hover:bg-white/90'
                          }`}
                        >
                          <input
                            type="radio"
                            name="attending"
                            value={option}
                            checked={formData.attending === option}
                            onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                            className="h-4 w-4 accent-wine cursor-pointer"
                          />
                          <span className="text-base">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {formData.attending === 'Accepts with pleasure' && (
                    <div>
                      <label htmlFor="rsvp-guests" className="block text-base font-medium">
                        Number of Guests Attending
                      </label>
                      <select
                        id="rsvp-guests"
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className={field}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                          <option key={n} value={n}>
                            {n} {n === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label htmlFor="rsvp-note" className="block text-base font-medium">
                      Warm Wishes or Note for Couple <span className="text-xs text-wine/60">(optional)</span>
                    </label>
                    <textarea
                      id="rsvp-note"
                      rows={2}
                      placeholder="Share a blessing or message..."
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                      className={field}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-to-r from-wine via-[#6d1323] to-[#8a1c30] py-3.5 font-serif text-xl font-medium tracking-wide text-[#fcede4] shadow-lg transition-all hover:brightness-110 active:scale-98 cursor-pointer"
                  >
                    Submit
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
