import { motion } from 'framer-motion'
import RevealText from './shared/RevealText'

const REASONS = [
  { icon: '🏅', title: 'Consistent quality', desc: 'Tested at every stage, from tape to finished bag.' },
  { icon: '💰', title: 'Competitive pricing', desc: 'Efficient in-house production keeps costs sharp.' },
  { icon: '⏱', title: 'Timely delivery', desc: 'Planned capacity and responsive scheduling.' },
  { icon: '⚙️', title: 'Customisable products', desc: 'Built to your size, print and construction spec.' },
  { icon: '🤝', title: 'Transparent partnership', desc: 'Clear communication from enquiry to dispatch.' },
  { icon: '♻️', title: 'Sustainable manufacturing', desc: 'Recyclable materials, responsible practices.' },
]

export default function CustomManufacturing() {
  return (
    <section id="custom" className="bg-cream py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <h2 className="font-head font-bold text-[28px] leading-tight text-charcoal sm:text-[34px]">
          <RevealText text="Why " />
          <span className="text-gold-deep"><RevealText text="Dynamic Innovations" delay={0.1} /></span>
        </h2>

        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.1 }}
              whileHover={{ x: 6 }}
              className="flex gap-4 border-l-2 border-gold pl-5"
            >
              <motion.span
                whileHover={{ rotate: 12, scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="text-2xl leading-none"
              >
                {r.icon}
              </motion.span>
              <div>
                <h3 className="font-head text-[16px] font-bold text-navy">{r.title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-charcoal/65">{r.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
