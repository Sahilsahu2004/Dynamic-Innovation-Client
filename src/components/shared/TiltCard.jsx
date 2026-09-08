import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * Wraps any children in a card that tilts in 3D toward the cursor on hover,
 * with a soft spring settle back to flat on mouse leave. Used to make
 * product photos and cards feel physically responsive rather than static.
 */
export default function TiltCard({ children, className = '', max = 10, scale = 1.03 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), {
    stiffness: 220,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), {
    stiffness: 220,
    damping: 20,
  })
  const springScale = useSpring(1, { stiffness: 260, damping: 22 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
    springScale.set(1)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => springScale.set(scale)}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, scale: springScale, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
