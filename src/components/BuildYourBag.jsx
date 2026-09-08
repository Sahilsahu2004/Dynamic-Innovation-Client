import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RevealText from './shared/RevealText'
import DrawUnderline from './shared/DrawUnderline'
import MagneticButton from './shared/MagneticButton'

const MATERIALS = ['HDPE', 'PP', 'BOPP', 'Laminated']
const CAPACITIES = ['5 kg', '25 kg', '50 kg', '75 kg', 'FIBC Bulk']
const FEATURES = ['UV Stabilized', 'Perforated', 'Anti-Skid', 'Gusseted', 'Inner Liner']

function Pill({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative px-4 py-2.5 text-[13px] font-semibold transition-colors ${
        active ? 'text-navy-deep' : 'text-navy/60 hover:text-navy'
      }`}
    >
      {active && (
        <motion.span
          layoutId="feature-pill-bg"
          className="absolute inset-0 bg-gold"
          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
}

export default function BuildYourBag() {
  const [material, setMaterial] = useState(MATERIALS[0])
  const [capacity, setCapacity] = useState(CAPACITIES[1])
  const [features, setFeatures] = useState([])

  const toggleFeature = (f) =>
    setFeatures((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]))

  const summary = useMemo(
    () =>
      `Hi Rahul, I'd like a quote for a custom bag — Material: ${material}, Capacity: ${capacity}` +
      (features.length ? `, Features: ${features.join(', ')}` : '') +
      '. Please share pricing and lead time.',
    [material, capacity, features]
  )

  const whatsappHref = `https://wa.me/917009550413?text=${encodeURIComponent(summary)}`

  return (
    <section className="bg-navy py-24 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="text-center">
          <p className="font-mono text-[12.5px] tracking-wide text-gold">Instant Spec Builder</p>
          <h2 className="mt-3 font-head text-[28px] font-bold text-cream sm:text-[36px]">
            <RevealText text="Build Your Bag" />
          </h2>
          <DrawUnderline delay={0.3} className="mx-auto mt-3 h-[3px] w-16 bg-gold" />
          <p className="mx-auto mt-4 max-w-md text-[14px] text-cream/60">
            Configure your spec below — we'll route it straight to our CEO for a fast, accurate quote.
          </p>
        </div>

        <div className="mt-14 bg-cream p-6 sm:p-10">
          <div>
            <p className="font-head text-[12.5px] font-bold uppercase tracking-wide text-navy/50">
              1. Material
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {MATERIALS.map((m) => (
                <button
                  key={m}
                  onClick={() => setMaterial(m)}
                  className={`border px-5 py-2.5 text-[13.5px] font-semibold transition-colors ${
                    material === m
                      ? 'border-navy bg-navy text-cream'
                      : 'border-navy/20 text-navy/70 hover:border-navy/50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="font-head text-[12.5px] font-bold uppercase tracking-wide text-navy/50">
              2. Capacity
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {CAPACITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCapacity(c)}
                  className={`border px-5 py-2.5 text-[13.5px] font-semibold transition-colors ${
                    capacity === c
                      ? 'border-navy bg-navy text-cream'
                      : 'border-navy/20 text-navy/70 hover:border-navy/50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="font-head text-[12.5px] font-bold uppercase tracking-wide text-navy/50">
              3. Features
            </p>
            <div className="mt-3 flex flex-wrap gap-1 border border-navy/10">
              {FEATURES.map((f) => (
                <Pill key={f} active={features.includes(f)} onClick={() => toggleFeature(f)}>
                  {f}
                </Pill>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={summary}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 border-l-2 border-gold bg-navy/5 p-4 text-[13px] leading-relaxed text-navy/70"
            >
              {summary}
            </motion.div>
          </AnimatePresence>

          <MagneticButton
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            strength={0.3}
            className="mt-8 flex w-fit items-center gap-2 bg-gold px-8 py-3.5 text-[14px] font-semibold text-navy-deep"
          >
            Get Fast Quote — direct to Rahul Agrawal, CEO
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
