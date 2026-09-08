import { motion } from 'framer-motion'

const BLOCKS = [
  {
    icon: '👁',
    title: 'Our Vision',
    type: 'text',
    body: "To become a trusted global partner in the woven packaging industry by providing innovative, durable and eco-friendly solutions that add value to our customers' products.",
  },
  {
    icon: '🎯',
    title: 'Our Mission',
    type: 'list',
    items: [
      'Deliver superior quality woven fabric and bags through continuous innovation and improvement.',
      'Maintain long-term relationships built on trust, service and performance.',
      'Promote sustainable manufacturing practices that minimise environmental impact.',
    ],
  },
  {
    icon: '💎',
    title: 'Our Values',
    type: 'list',
    items: [
      'Integrity & transparency',
      'Continuous improvement',
      'Sustainability & responsibility',
      'Customer satisfaction',
    ],
  },
]

export default function VisionMissionValues() {
  return (
    <section className="bg-navy-deep py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-14 sm:grid-cols-3 sm:gap-10">
          {BLOCKS.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className={i > 0 ? 'sm:border-l sm:border-cream/15 sm:pl-10' : ''}
            >
              <motion.span
                initial={{ scale: 0.7, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.25, rotate: -8 }}
                transition={{ duration: 0.4, delay: i * 0.12 + 0.15, type: 'spring' }}
                className="inline-block text-2xl"
              >
                {b.icon}
              </motion.span>
              <h3 className="mt-3 flex items-center gap-2 font-head text-[19px] font-bold uppercase text-cream">
                <span className="h-4 w-[3px] bg-gold" />
                {b.title}
              </h3>

              {b.type === 'text' ? (
                <p className="mt-4 text-[14px] leading-relaxed text-cream/60">{b.body}</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {b.items.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[14px] leading-relaxed text-cream/60">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
