import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import RevealText from './shared/RevealText'
import TiltCard from './shared/TiltCard'
import WeavePattern from './shared/WeavePattern'
import MagneticButton from './shared/MagneticButton'

import heroBags from '../assets/brand/hero-bags.jpg'
import wovenFabric from '../assets/brand/woven-fabric.png'
import ldHmLiners from '../assets/brand/ld-hm-liners.png'
import boppPrinted from '../assets/brand/bopp-printed-bags.png'
import gussetedBox from '../assets/brand/gusseted-box-bags.png'

const COLLAGE = [
  {
    src: heroBags, alt: 'Woven PP bags in five colours', fit: 'cover',
    className: 'left-[8%] top-[6%] h-[62%] w-[52%] z-20',
    rotate: -4, depth: 90, delay: 0.3,
  },
  {
    src: wovenFabric, alt: 'Rolls of HDPE/PP woven fabric', fit: 'contain',
    className: 'right-[2%] top-0 h-[34%] w-[42%] z-10 bg-white',
    rotate: 6, depth: 150, delay: 0.5,
  },
  {
    src: boppPrinted, alt: 'BOPP printed sugar, atta and salt bags', fit: 'contain',
    className: 'right-0 bottom-[8%] h-[42%] w-[38%] z-30 bg-white',
    rotate: -5, depth: 60, delay: 0.65,
  },
  {
    src: gussetedBox, alt: 'Gusseted and box-style kraft bags', fit: 'contain',
    className: 'left-0 bottom-0 h-[36%] w-[36%] z-10 bg-white',
    rotate: 5, depth: 130, delay: 0.8,
  },
  {
    src: ldHmLiners, alt: 'LD/HM liner rolls in multiple colours', fit: 'contain',
    className: 'left-[24%] bottom-[-4%] h-[28%] w-[32%] z-40 bg-white',
    rotate: -3, depth: 40, delay: 0.95,
  },
]

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-navy-deep pt-28 pb-20 md:pt-32"
    >
      <WeavePattern />

      <motion.div style={{ opacity: fade }} className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 font-mono text-[12.5px] tracking-wide text-gold"
          >
            HDPE/PP WOVEN FABRIC · BOPP BAGS · FIBC SOLUTIONS
          </motion.p>

          <h1 className="font-display font-extrabold text-cream leading-[0.98] text-[10.5vw] sm:text-[7vw] md:text-[46px] lg:text-[52px] xl:text-[58px]">
            <RevealText text="Heavy-Duty Packaging." delay={0.15} />
            <br />
            <span className="text-gold"><RevealText text="Engineered to Precision." delay={0.4} /></span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-7 max-w-md text-[15.5px] leading-relaxed text-cream/70"
          >
            Current-generation HDPE/PP woven fabrics, BOPP bags, and FIBC
            solutions built for global markets.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <MagneticButton
              href="#enquiry"
              className="bg-gold px-7 py-3.5 text-[14px] font-semibold text-navy-deep"
            >
              Request a Fast Quote
            </MagneticButton>
            <MagneticButton
              href="#products"
              strength={0.25}
              className="border border-cream/30 px-7 py-3.5 text-[14px] font-semibold text-cream"
            >
              Explore Specifications
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="mt-14 flex flex-wrap gap-x-10 gap-y-4 border-t border-cream/15 pt-8"
          >
            {['Industrial', 'Agricultural', 'Bulk & FIBC'].map((tag) => (
              <span key={tag} className="font-head text-[13px] font-semibold tracking-wide text-cream/60">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Product collage */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-lg lg:block" style={{ perspective: 1200 }}>
          {COLLAGE.map((item) => (
            <CollageItem key={item.alt} item={item} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Mobile: simple 2-col grid, no absolute positioning */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {COLLAGE.slice(0, 4).map((item, i) => (
            <motion.div
              key={item.alt}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              className={`aspect-square overflow-hidden ${item.fit === 'contain' ? 'bg-white' : ''}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className={`h-full w-full ${item.fit === 'contain' ? 'object-contain p-3' : 'object-cover'}`}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] tracking-wide text-cream/40"
      >
        <div className="flex flex-col items-center gap-2">
          <span>Scroll</span>
          <motion.span
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="h-8 w-px origin-top bg-cream/30"
          />
        </div>
      </motion.div>
    </section>
  )
}

function CollageItem({ item, scrollYProgress }) {
  const y = useTransform(scrollYProgress, [0, 1], [0, item.depth])

  return (
    <motion.div
      className={`absolute ${item.className}`}
      style={{ y }}
      initial={{ opacity: 0, scale: 0.7, rotate: item.rotate * 3 }}
      animate={{ opacity: 1, scale: 1, rotate: item.rotate }}
      transition={{ duration: 0.9, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4 + item.depth / 50, repeat: Infinity, ease: 'easeInOut', delay: item.delay }}
        className="h-full w-full"
      >
        <TiltCard className="h-full w-full shadow-2xl shadow-black/30" max={8} scale={1.06}>
          <img
            src={item.src}
            alt={item.alt}
            className={`h-full w-full ${item.fit === 'contain' ? 'object-contain p-4' : 'object-cover'}`}
          />
        </TiltCard>
      </motion.div>
    </motion.div>
  )
}
