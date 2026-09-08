import { motion } from 'framer-motion'

export default function DrawUnderline({ className = 'w-16 h-[3px] bg-gold', delay = 0 }) {
  return (
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6, delay, ease: [0.76, 0, 0.24, 1] }}
      style={{ originX: 0 }}
      className={`block ${className}`}
    />
  )
}
