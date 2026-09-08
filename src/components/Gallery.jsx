import RevealText from './shared/RevealText'
import RevealImage from './shared/RevealImage'
import TiltCard from './shared/TiltCard'
import DrawUnderline from './shared/DrawUnderline'

import wovenBagsSacks from '../assets/brand/woven-bags-sacks.png'
import boppPrinted from '../assets/brand/bopp-printed-bags.png'
import gussetedBox from '../assets/brand/gusseted-box-bags.png'
import wovenFabric from '../assets/brand/woven-fabric.png'
import laminatedFabric from '../assets/brand/laminated-fabric.png'
import ldHmLiners from '../assets/brand/ld-hm-liners.png'
import heroBags from '../assets/brand/hero-bags.jpg'

const IMAGES = [
  { src: heroBags, alt: 'Woven PP sacks in five colours with Dynamic Innovations branding', span: 'md:row-span-2', dir: 'up', fit: 'cover' },
  { src: wovenBagsSacks, alt: 'HDPE/PP woven bags and sacks', dir: 'left', fit: 'contain' },
  { src: boppPrinted, alt: 'BOPP printed sugar, atta and salt bags', dir: 'right', fit: 'contain' },
  { src: wovenFabric, alt: 'Rolls of HDPE/PP woven fabric', span: 'md:col-span-2', dir: 'up', fit: 'contain' },
  { src: gussetedBox, alt: 'Gusseted and box-style kraft bags', dir: 'left', fit: 'contain' },
  { src: laminatedFabric, alt: 'Laminated and coated fabric rolls', dir: 'right', fit: 'contain' },
  { src: ldHmLiners, alt: 'LD/HM liner rolls in multiple colours', dir: 'up', fit: 'contain' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <h2 className="font-head font-bold text-[30px] leading-tight text-navy sm:text-[36px] max-w-lg">
          <RevealText text="Off the line" />
          <DrawUnderline delay={0.4} className="mt-3 h-[3px] w-16 bg-gold" />
        </h2>
        <p className="mt-4 max-w-md text-[14.5px] text-charcoal/60">
          Actual products manufactured and printed at our facility.
        </p>

        <div className="mt-14 grid auto-rows-[220px] gap-4 md:grid-cols-3">
          {IMAGES.map((img, i) => (
            <TiltCard
              key={img.alt}
              className={`overflow-hidden bg-white ${img.span || ''}`}
              max={7}
              scale={1.02}
            >
              <RevealImage
                src={img.src}
                alt={img.alt}
                direction={img.dir}
                delay={i * 0.06}
                className="h-full w-full"
                fit={img.fit}
                imgClassName={img.fit === 'contain' ? 'p-6 transition-transform duration-500 hover:scale-110' : 'transition-transform duration-500 hover:scale-110'}
              />
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
