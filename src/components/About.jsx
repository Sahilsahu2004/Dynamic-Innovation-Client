import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import RevealText from './shared/RevealText'
import RevealImage from './shared/RevealImage'
import DrawUnderline from './shared/DrawUnderline'
import rollYellow from '../assets/brand/factory-roll-yellow.jpg'
import rollsColor from '../assets/brand/factory-rolls-color.jpg'

const PILLARS = [
  {
    icon: '🤝',
    title: 'Integrity & Transparency',
    desc: 'Direct access to decision-makers from enquiry to dispatch.',
  },
  {
    icon: '🧪',
    title: 'Lab-Tested Quality',
    desc: 'Quality checks at every stage, from raw PP/HDPE tape to finished bags.',
  },
  {
    icon: '♻️',
    title: 'Sustainable Manufacturing',
    desc: '100% recyclable materials and responsible practices to minimise environmental impact.',
  },
]

export default function About() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 60])
  const fgY = useTransform(scrollYProgress, [0, 1], [20, -20])

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <motion.div style={{ y: fgY }} className="flex flex-col justify-center">
            <motion.span
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex w-fit items-center bg-navy px-4 py-1.5 font-head text-[13px] font-bold text-cream"
            >
              About <span className="ml-1 text-gold">Company</span>
            </motion.span>

            <h2 className="font-head font-bold text-[30px] leading-[1.15] sm:text-[36px]">
              <span className="text-gold"><RevealText text="New Machines." /></span>
              <br />
              <span className="text-navy"><RevealText text="Old-Fashioned Reliability." delay={0.15} /></span>
            </h2>
            <DrawUnderline delay={0.5} className="mt-4 h-[3px] w-16 bg-gold" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-7 text-[15px] leading-relaxed text-charcoal/80"
            >
              We pair advanced extrusion, weaving, lamination, and bag-making
              technology with transparent, direct-access communication. That
              means tighter tolerances, vibrant shelf-ready printing, and
              faster changeovers than plants running legacy equipment.
            </motion.p>
          </motion.div>

          <motion.div style={{ y: bgY }} className="grid grid-cols-1 gap-4">
            <RevealImage
              src={rollYellow}
              alt="Yellow woven polypropylene fabric roll on the production floor"
              direction="right"
              className="h-[220px] w-full sm:h-[260px]"
              imgClassName="transition-transform duration-700 hover:scale-110"
            />
            <RevealImage
              src={rollsColor}
              alt="Rows of finished woven fabric rolls in red, white, blue and green"
              direction="right"
              delay={0.1}
              className="h-[220px] w-full sm:h-[260px]"
              imgClassName="transition-transform duration-700 hover:scale-110"
            />
          </motion.div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              whileHover={{ y: -8, backgroundColor: '#0e1b30' }}
              className="group cursor-default bg-navy/95 p-7 transition-colors"
            >
              <motion.span
                whileHover={{ scale: 1.2, rotate: -6 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="inline-block text-2xl"
              >
                {p.icon}
              </motion.span>
              <h3 className="mt-4 font-head text-[16px] font-bold text-cream">{p.title}</h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-cream/60 transition-colors group-hover:text-cream/80">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
