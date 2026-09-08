import { motion } from 'framer-motion'
import AnimatedNumber from './shared/AnimatedNumber'

const METRICS = [
  { kind: 'counter', value: 18, suffix: '+', label: 'Current-Generation Machine Lines' },
  { kind: 'counter', value: 100, suffix: '%', label: 'Every Batch Lab-Tested' },
  { kind: 'range', prefix: '5kg – ', value: 75, suffix: 'kg+', label: 'Custom Load Capacities' },
  { kind: 'text', display: 'Global', label: 'Serving Industrial, Agricultural & Bulk Sectors' },
]

export default function KeyMetrics() {
  return (
    <div className="relative z-20 mx-auto -mt-10 max-w-6xl px-6 md:-mt-12 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 gap-px overflow-hidden bg-navy/10 shadow-xl lg:grid-cols-4"
      >
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ backgroundColor: '#ffffff' }}
            className="bg-cream p-6 text-center sm:p-7"
          >
            <p className="font-display text-[26px] font-extrabold text-navy sm:text-[30px]">
              {m.kind === 'counter' && <AnimatedNumber value={m.value} suffix={m.suffix} />}
              {m.kind === 'range' && (
                <>
                  {m.prefix}
                  <AnimatedNumber value={m.value} suffix={m.suffix} />
                </>
              )}
              {m.kind === 'text' && m.display}
            </p>
            <p className="mt-2 text-[12px] font-medium leading-snug text-charcoal/55">
              {m.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
