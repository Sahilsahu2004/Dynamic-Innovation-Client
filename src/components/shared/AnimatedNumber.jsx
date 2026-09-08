import { useEffect, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

export default function AnimatedNumber({ value, suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const motionVal = useMotionValue(0)
  const spring = useSpring(motionVal, { damping: 30, stiffness: 90 })

  useEffect(() => {
    if (inView) motionVal.set(value)
  }, [inView, value, motionVal])

  const displayRef = useRef(null)

  useEffect(() => {
    const unsub = spring.on('change', (v) => {
      if (displayRef.current) {
        displayRef.current.textContent = Math.round(v).toLocaleString('en-IN') + suffix
      }
    })
    return unsub
  }, [spring, suffix])

  return (
    <span ref={ref} className={className}>
      <span ref={displayRef}>0{suffix}</span>
    </span>
  )
}
