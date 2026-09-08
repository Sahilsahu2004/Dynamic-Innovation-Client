import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion'
import Logo from './shared/Logo'
import { useCart } from '../context/CartContext'

const LINKS = [
  { label: 'Company', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#custom' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const { count, setIsOpen } = useCart()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setSolid(y > 40)
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        solid ? 'bg-cream/95 backdrop-blur border-b border-navy/10' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <a href="#top" className="flex items-center">
          <motion.div
            key={solid ? 'solid' : 'transparent'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Logo className="h-10 w-auto md:h-11" light={!solid} />
          </motion.div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`group relative text-[13.5px] font-medium transition-colors hover:text-gold ${
                solid ? 'text-charcoal' : 'text-cream/90'
              }`}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open cart"
            className={`relative grid h-10 w-10 place-items-center transition-colors ${
              solid ? 'text-navy' : 'text-cream'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <path d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13L5.4 5M7 13l-1.5 6h13M9 21a1 1 0 100-2 1 1 0 000 2zM18 21a1 1 0 100-2 1 1 0 000 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="absolute -right-1 -top-1 grid h-[18px] w-[18px] place-items-center rounded-full bg-gold text-[10px] font-bold text-navy-deep"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <a
            href="#enquiry"
            className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-[13.5px] font-semibold transition-colors ${
              solid
                ? 'bg-navy text-cream hover:bg-gold-deep'
                : 'bg-gold text-navy hover:bg-cream'
            }`}
          >
            Request a Quote
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden grid h-10 w-10 place-items-center border focus-ring ${
              solid ? 'border-navy/20 text-navy' : 'border-cream/40 text-cream'
            }`}
          >
            <div className="relative h-3.5 w-5">
              <span
                className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300 ${
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300 ${
                  open ? 'opacity-0' : 'top-1/2 -translate-y-1/2'
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-300 ${
                  open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden bg-navy lg:hidden"
          >
            <nav className="flex flex-col px-6 py-4">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-cream/10 py-4 text-cream text-lg font-head font-semibold"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#enquiry"
                onClick={() => setOpen(false)}
                className="mt-4 bg-gold text-navy text-center py-3 font-semibold"
              >
                Request a Quote
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
