import { motion } from 'framer-motion'
import RevealImage from './shared/RevealImage'
import factory from '../assets/brand/factory.jpg'

const MARKETS = [
  'Fertilizers', 'Cement', 'Food Grains', 'Sugar', 'Salt',
  'Textile', 'Chemicals', 'Agriculture', 'Industrial Packaging',
]

export default function Clients() {
  return (
    <section className="bg-navy">
      <RevealImage
        src={factory}
        alt="Dynamic Innovations manufacturing facility"
        className="h-[280px] w-full sm:h-[380px]"
        imgClassName="transition-transform duration-[1200ms] hover:scale-105"
        direction="up"
      />

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-head text-[13px] font-bold tracking-wide text-gold"
        >
          MARKETS WE SERVE
        </motion.p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {MARKETS.map((m, i) => (
            <motion.span
              key={m}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              whileHover={{ scale: 1.06, borderColor: '#9ab525', color: '#9ab525' }}
              className="border border-cream/25 px-5 py-2.5 text-[13.5px] text-cream/80 transition-colors"
            >
              {m}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
