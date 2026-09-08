import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../../assets/brand/logo-white.png'

export default function Preloader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1300)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, delay: 0.1 } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-navy-deep"
        >
          {/* top loading bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            style={{ originX: 0 }}
            className="absolute left-0 top-0 h-[3px] w-full bg-gold"
          />

          {/* circular loom spinner: spokes rotating like a bobbin/loom wheel */}
          <motion.svg
            width="72"
            height="72"
            viewBox="0 0 72 72"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="36" cy="36" r="30" fill="none" stroke="#1a2c47" strokeWidth="3" />
            <circle
              cx="36" cy="36" r="30" fill="none"
              stroke="#c9a227" strokeWidth="3" strokeLinecap="round"
              strokeDasharray="47 141"
            />
            {[0, 45, 90, 135].map((deg) => (
              <line
                key={deg}
                x1="36" y1="10" x2="36" y2="22"
                stroke="#e6c869" strokeWidth="2"
                transform={`rotate(${deg} 36 36)`}
              />
            ))}
          </motion.svg>

          <motion.img
            src={logo}
            alt="Dynamic Innovations"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 h-8 w-auto"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
