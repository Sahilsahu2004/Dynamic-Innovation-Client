import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import RevealText from './shared/RevealText'
import DrawUnderline from './shared/DrawUnderline'
import boppPrinted from '../assets/brand/bopp-printed-bags.png'
import factory from '../assets/brand/factory.jpg'

const TABS = [
  {
    id: 'agri',
    label: 'Agriculture & Food Grains',
    img: boppPrinted,
    fit: 'contain',
    items: ['Sugar', 'Salt', 'Atta', 'Rice', 'Flour'],
  },
  {
    id: 'industrial',
    label: 'Industrial & Construction',
    img: factory,
    fit: 'cover',
    items: ['Cement', 'Fertilizers', 'Chemicals', 'Textiles'],
  },
]

export default function IndustryApplications() {
  const [active, setActive] = useState(TABS[0].id)
  const tab = TABS.find((t) => t.id === active)

  return (
    <section className="bg-cream py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <h2 className="font-head font-bold text-[28px] leading-tight text-navy sm:text-[34px]">
          <RevealText text="Industry Applications" />
          <DrawUnderline delay={0.3} className="mt-3 h-[3px] w-16 bg-gold" />
        </h2>

        <div className="mt-10 flex gap-3">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`relative px-5 py-3 text-[13.5px] font-semibold transition-colors ${
                active === t.id ? 'text-cream' : 'text-navy/60 hover:text-navy'
              }`}
            >
              {active === t.id && (
                <motion.span
                  layoutId="industry-tab-bg"
                  className="absolute inset-0 bg-navy"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{t.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-8 overflow-hidden border border-navy/10 md:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="h-64 overflow-hidden bg-white md:h-full"
            >
              <img
                src={tab.img}
                alt={tab.label}
                className={`h-full w-full ${tab.fit === 'contain' ? 'object-contain p-8' : 'object-cover'}`}
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id + '-list'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col justify-center p-8"
            >
              <p className="font-mono text-[11.5px] tracking-wide text-gold-deep">
                Application area
              </p>
              <h3 className="mt-2 font-head text-[20px] font-bold text-navy">{tab.label}</h3>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {tab.items.map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="border border-navy/20 px-4 py-2 text-[13px] font-medium text-navy"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
