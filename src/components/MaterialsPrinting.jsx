import { motion } from 'framer-motion'
import RevealText from './shared/RevealText'

const ROWS = [
  ['Capacity/Size', '5 kg to 75 kg', 'As per requirement', 'Width and length as per requirement'],
  ['Construction', 'With/without liner, gusseted, box', 'Loop, liner and closure options', 'Tubular or flat, laminated or plain'],
  ['Fabric GSM', 'As per requirement', 'As per requirement', 'As per requirement'],
  ['Printing', 'Multi-colour, BOPP or flexo', 'As per artwork', 'Plain or printed'],
  ['Options', 'UV stabilised, anti-skid, perforated', 'Food-safe handling on request', 'UV stabilised, coated'],
]

export default function MaterialsPrinting() {
  return (
    <section className="bg-cream py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[12.5px] tracking-wide text-gold-deep"
        >
          Indicative Specifications
        </motion.p>
        <h2 className="mt-3 font-head font-bold text-[30px] leading-tight text-navy sm:text-[36px]">
          <RevealText text="Built around your requirement" />
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4 max-w-2xl text-[14px] text-charcoal/60"
        >
          Typical ranges below. Every parameter is customisable — share your
          requirement and we will confirm the specification with your quote.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-10 overflow-x-auto"
        >
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="bg-navy">
                <th className="p-4 font-head text-[12.5px] font-bold uppercase tracking-wide text-cream">Parameter</th>
                <th className="p-4 font-head text-[12.5px] font-bold uppercase tracking-wide text-cream">Woven Bags/Sacks</th>
                <th className="p-4 font-head text-[12.5px] font-bold uppercase tracking-wide text-cream">FIBC/Jumbo Bags</th>
                <th className="p-4 font-head text-[12.5px] font-bold uppercase tracking-wide text-cream">Fabric & Liners</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <motion.tr
                  key={row[0]}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className={i % 2 === 0 ? 'bg-cream-dim' : 'bg-cream'}
                >
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`p-4 text-[13.5px] ${j === 0 ? 'font-semibold text-navy' : 'text-charcoal/75'}`}
                    >
                      {cell}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}
