import { motion } from 'framer-motion'
import RevealText from './shared/RevealText'

const STEPS = [
  {
    n: '01',
    title: 'Extrusion',
    detail: 'HDPE/PP granules are extruded into film and drawn into tape, the raw material for our woven fabric.',
  },
  {
    n: '02',
    title: 'Circular weaving',
    detail: 'Tape is woven on high-speed circular looms into tubular or flat fabric, to your width and GSM.',
  },
  {
    n: '03',
    title: 'Lamination & printing',
    detail: 'Fabric is BOPP-laminated or coated where needed, then printed in multi-colour, BOPP or flexo.',
  },
  {
    n: '04',
    title: 'Bag-making & dispatch',
    detail: 'Cutting, stitching and finishing to spec, checked in-house before it leaves for your dock.',
  },
]

export default function ManufacturingProcess() {
  return (
    <section id="process" className="bg-navy py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[12.5px] tracking-wide text-gold"
        >
          Our Process
        </motion.p>
        <h2 className="mt-3 font-head font-bold text-[30px] leading-tight text-cream sm:text-[36px] max-w-lg">
          <RevealText text="Current-generation lines, start to finish" />
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              whileHover={{ y: -8, backgroundColor: 'rgba(247,247,241,0.06)' }}
              className="relative border border-cream/15 p-7"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 + 0.15, type: 'spring', stiffness: 200 }}
                className="font-display text-[15px] font-extrabold text-gold"
              >
                {s.n}
              </motion.span>
              <h3 className="mt-4 font-head text-[17px] font-bold text-cream">{s.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-cream/60">{s.detail}</p>
              {i < STEPS.length - 1 && (
                <span className="absolute -right-3 top-1/2 hidden -translate-y-1/2 text-gold/50 lg:block">
                  →
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
