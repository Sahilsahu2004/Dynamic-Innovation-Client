import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RevealText from './shared/RevealText'
import DrawUnderline from './shared/DrawUnderline'

const STORAGE_KEY = 'di-reviews-v1'

function Star({ filled, onClick, interactive }) {
  return (
    <button
      type="button"
      disabled={!interactive}
      onClick={onClick}
      className={`text-xl leading-none ${interactive ? 'cursor-pointer' : 'cursor-default'} ${filled ? 'text-gold' : 'text-navy/20'}`}
    >
      ★
    </button>
  )
}

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [form, setForm] = useState({ name: '', company: '', rating: 5, text: '' })
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setReviews(JSON.parse(saved))
    } catch {
      // ignore
    }
  }, [])

  const submit = (e) => {
    e.preventDefault()
    const next = [{ ...form, date: new Date().toISOString() }, ...reviews]
    setReviews(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // ignore
    }
    setSubmitted(true)
    setForm({ name: '', company: '', rating: 5, text: '' })
    setTimeout(() => {
      setShowForm(false)
      setSubmitted(false)
    }, 1800)
  }

  return (
    <section id="reviews" className="bg-cream py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-head font-bold text-[28px] leading-tight text-navy sm:text-[34px]">
            <RevealText text="Customer Reviews" />
            <DrawUnderline delay={0.3} className="mt-3 h-[3px] w-16 bg-gold" />
          </h2>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowForm((v) => !v)}
            className="w-fit bg-navy px-5 py-2.5 text-[13.5px] font-semibold text-cream"
          >
            {showForm ? 'Cancel' : 'Write a Review'}
          </motion.button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="mt-8 max-w-xl border border-navy/15 p-6">
                {submitted ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[14px] font-semibold text-navy"
                  >
                    Thanks — your review has been added below. 🎉
                  </motion.p>
                ) : (
                  <form onSubmit={submit} className="space-y-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} filled={n <= form.rating} interactive onClick={() => setForm((f) => ({ ...f, rating: n }))} />
                      ))}
                    </div>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Your name"
                      className="w-full border-b border-navy/25 bg-transparent py-2 text-[14px] text-navy placeholder:text-charcoal/40 focus:border-gold-deep outline-none"
                    />
                    <input
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                      placeholder="Company (optional)"
                      className="w-full border-b border-navy/25 bg-transparent py-2 text-[14px] text-navy placeholder:text-charcoal/40 focus:border-gold-deep outline-none"
                    />
                    <textarea
                      required
                      rows={3}
                      value={form.text}
                      onChange={(e) => setForm((f) => ({ ...f, text: e.target.value }))}
                      placeholder="How was your experience?"
                      className="w-full resize-none border-b border-navy/25 bg-transparent py-2 text-[14px] text-navy placeholder:text-charcoal/40 focus:border-gold-deep outline-none"
                    />
                    <button type="submit" className="bg-gold px-6 py-2.5 text-[13.5px] font-semibold text-navy-deep">
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12">
          {reviews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-dashed border-navy/20 py-16 text-center"
            >
              <span className="text-3xl">💬</span>
              <p className="mt-4 font-head text-[15px] font-semibold text-navy">
                No reviews yet — be the first.
              </p>
              <p className="mt-1.5 text-[13px] text-charcoal/50">
                Genuine feedback from customers will appear here.
              </p>
            </motion.div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="border border-navy/10 bg-white/40 p-5"
                >
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} filled={n <= r.rating} />
                    ))}
                  </div>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-charcoal/75">{r.text}</p>
                  <p className="mt-4 font-head text-[13px] font-semibold text-navy">
                    {r.name}{r.company ? ` · ${r.company}` : ''}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
