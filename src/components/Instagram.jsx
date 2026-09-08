import { motion } from 'framer-motion'
import RevealText from './shared/RevealText'
import RevealImage from './shared/RevealImage'
import TiltCard from './shared/TiltCard'

import wovenBagsSacks from '../assets/brand/woven-bags-sacks.png'
import boppPrinted from '../assets/brand/bopp-printed-bags.png'
import gussetedBox from '../assets/brand/gusseted-box-bags.png'
import wovenFabric from '../assets/brand/woven-fabric.png'
import ldHmLiners from '../assets/brand/ld-hm-liners.png'

const POSTS = [wovenBagsSacks, boppPrinted, gussetedBox, wovenFabric, ldHmLiners]

export default function Instagram() {
  return (
    <section className="bg-cream py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-head font-bold text-[26px] leading-tight text-navy sm:text-[32px]">
            <RevealText text="Follow production, daily" />
          </h2>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ x: 4 }}
            href="https://instagram.com/dynamicinnovations"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[14px] font-semibold text-navy"
          >
            @dynamicinnovations ↗
          </motion.a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {POSTS.map((src, i) => (
            <a
              key={i}
              href="https://instagram.com/dynamicinnovations"
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <TiltCard className="aspect-square w-full overflow-hidden bg-white" max={10} scale={1.05}>
                <RevealImage
                  src={src}
                  alt={`Instagram post ${i + 1}`}
                  direction="up"
                  delay={i * 0.05}
                  fit="contain"
                  className="h-full w-full"
                  imgClassName="p-4 transition-transform duration-500 group-hover:scale-110"
                />
              </TiltCard>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
