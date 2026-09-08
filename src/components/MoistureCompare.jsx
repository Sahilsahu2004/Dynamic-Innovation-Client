import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import RevealText from './shared/RevealText'
import DrawUnderline from './shared/DrawUnderline'
import laminatedFabric from '../assets/brand/laminated-fabric.png'
import wovenFabric from '../assets/brand/woven-fabric.png'

const DROPLETS = Array.from({ length: 6 }, (_, i) => i)

export default function MoistureCompare() {
  const ref = useRef(null)
  const [pos, setPos] = useState(50) // percentage
  const dragging = useRef(false)

  const updateFromClientX = (clientX) => {
    const rect = ref.current.getBoundingClientRect()
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(96, Math.max(4, pct)))
  }

  const onPointerDown = (e) => {
    dragging.current = true
    updateFromClientX(e.clientX ?? e.touches?.[0]?.clientX)
  }
  const onPointerMove = (e) => {
    if (!dragging.current) return
    updateFromClientX(e.clientX ?? e.touches?.[0]?.clientX)
  }
  const stopDrag = () => (dragging.current = false)

  return (
    <section className="bg-navy py-24 md:py-28">
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="text-center">
          <h2 className="font-head text-[26px] font-bold text-cream sm:text-[32px]">
            <RevealText text="Moisture Barrier, Side by Side" />
          </h2>
          <DrawUnderline delay={0.3} className="mx-auto mt-3 h-[3px] w-16 bg-gold" />
          <p className="mx-auto mt-4 max-w-md text-[14px] text-cream/60">
            Drag the handle to compare PP-laminated fabric against a standard, un-laminated weave.
          </p>
        </div>

        <div
          ref={ref}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={stopDrag}
          className="relative mt-12 h-[320px] w-full cursor-ew-resize select-none overflow-hidden bg-white touch-none"
        >
          {/* base layer: standard weave */}
          <img src={wovenFabric} alt="Standard un-laminated weave" className="absolute inset-0 h-full w-full object-cover" draggable={false} />

          {/* top layer: laminated, clipped to slider position */}
          <div
            className="absolute inset-0 h-full w-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <img src={laminatedFabric} alt="PP-laminated moisture-resistant fabric" className="h-full w-full object-cover" draggable={false} />
            {/* decorative droplets beading on the laminated side */}
            {DROPLETS.map((i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-cream/80"
                style={{ left: `${10 + i * 14}%` }}
                animate={{ y: [0, 260], opacity: [0, 1, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35, ease: 'easeIn' }}
              />
            ))}
          </div>

          {/* labels */}
          <span className="absolute left-4 top-4 bg-navy-deep/80 px-3 py-1.5 text-[11.5px] font-semibold text-cream">
            Laminated (Moisture Barrier)
          </span>
          <span className="absolute right-4 top-4 bg-navy-deep/80 px-3 py-1.5 text-[11.5px] font-semibold text-cream">
            Standard Weave
          </span>

          {/* drag handle */}
          <div
            className="absolute top-0 h-full w-[3px] bg-gold"
            style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gold shadow-lg">
              <span className="text-[13px] text-navy-deep">↔</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
