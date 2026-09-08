import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RevealText from './shared/RevealText'
import RevealImage from './shared/RevealImage'
import TiltCard from './shared/TiltCard'
import DrawUnderline from './shared/DrawUnderline'
import ProductQuickView from './ProductQuickView'
import { useCart } from '../context/CartContext'
import { PRODUCTS, INDUSTRIES, formatINR } from '../data/products'

export default function ProductCategories() {
  const [quickView, setQuickView] = useState(null)
  const [filter, setFilter] = useState('All')
  const { addItem } = useCart()

  const filtered = useMemo(
    () => (filter === 'All' ? PRODUCTS : PRODUCTS.filter((p) => p.industries.includes(filter))),
    [filter]
  )

  return (
    <section id="products" className="bg-navy py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-[12.5px] tracking-wide text-gold"
        >
          Product Matrix
        </motion.p>
        <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="font-head font-bold text-[30px] leading-tight text-cream sm:text-[38px] max-w-xl">
            <RevealText text="Packaging for every load, every market" />
            <DrawUnderline delay={0.4} className="mt-3 h-[3px] w-16 bg-gold" />
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-sm text-[14px] text-cream/55"
          >
            Filter by industry, or tap any card for full specs and pricing.
          </motion.p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2.5">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind}
              onClick={() => setFilter(ind)}
              className={`relative px-4 py-2 text-[12.5px] font-semibold transition-colors ${
                filter === ind ? 'text-navy-deep' : 'text-cream/70 hover:text-cream'
              }`}
            >
              {filter === ind && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 bg-gold"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{ind}</span>
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((c, i) => (
              <motion.div
                layout
                key={c.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group flex flex-col bg-cream"
              >
                <button onClick={() => setQuickView(c)} className="block text-left">
                  <TiltCard className="relative h-56 overflow-hidden bg-white" max={6} scale={1}>
                    <span className="absolute left-3 top-3 z-10 bg-gold px-2.5 py-1 text-[11px] font-bold text-navy-deep">
                      From {formatINR(c.priceFrom)} {c.unit}
                    </span>
                    <span className="absolute right-3 top-3 z-10 bg-navy-deep/80 px-2.5 py-1 text-[10.5px] font-semibold text-cream">
                      {c.structure}
                    </span>
                    <RevealImage
                      src={c.img}
                      alt={c.title}
                      className="h-full w-full"
                      fit="contain" imgClassName="p-6 transition-transform duration-500 group-hover:scale-110"
                      direction={c.dir}
                      delay={(i % 3) * 0.05}
                    />
                  </TiltCard>
                </button>
                <div className="border-t-2 border-navy bg-navy p-4">
                  <h3 className="font-head text-[15px] font-bold text-cream">{c.title}</h3>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="flex-1 text-[13.5px] leading-relaxed text-charcoal/70">{c.desc}</p>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setQuickView(c)}
                      className="flex-1 border border-navy/25 py-2.5 text-[12.5px] font-semibold text-navy transition-colors hover:bg-navy/5"
                    >
                      Quick View
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => addItem(c, 1)}
                      className="flex-1 bg-gold py-2.5 text-[12.5px] font-semibold text-navy-deep"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProductQuickView product={quickView} open={!!quickView} onClose={() => setQuickView(null)} />
    </section>
  )
}
