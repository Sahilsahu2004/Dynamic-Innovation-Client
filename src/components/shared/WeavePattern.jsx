import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * A subtle cross-hatch SVG pattern evoking woven PP/HDPE tape, which
 * drifts gently in response to cursor position — a lightweight stand-in
 * for a true fabric shader, achievable without WebGL.
 */
export default function WeavePattern({ className = '' }) {
  const ref = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 40, damping: 20 })
  const sy = useSpring(my, { stiffness: 40, damping: 20 })

  const translateX = useTransform(sx, [-1, 1], [-14, 14])
  const translateY = useTransform(sy, [-1, 1], [-14, 14])

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      className={`pointer-events-auto absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.svg
        style={{ x: translateX, y: translateY }}
        className="absolute -inset-6 h-[calc(100%+3rem)] w-[calc(100%+3rem)] opacity-[0.07]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="weave" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M0 7h28M0 21h28" stroke="#e6c869" strokeWidth="2" />
            <path d="M7 0v28M21 0v28" stroke="#e6c869" strokeWidth="2" />
            <rect x="0" y="0" width="7" height="7" fill="#e6c869" fillOpacity="0.3" />
            <rect x="14" y="14" width="7" height="7" fill="#e6c869" fillOpacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#weave)" />
      </motion.svg>
    </div>
  )
}
