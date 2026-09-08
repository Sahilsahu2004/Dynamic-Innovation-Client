import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function CartToast() {
  const { lastAdded } = useCart()

  return (
    <AnimatePresence>
      {lastAdded && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          className="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 flex items-center gap-3 bg-navy px-5 py-3.5 shadow-2xl"
        >
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-[12px] text-navy-deep">✓</span>
          <p className="text-[13.5px] text-cream">
            <span className="font-semibold">{lastAdded}</span> added to cart
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
