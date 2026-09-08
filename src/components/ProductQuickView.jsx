import { useState } from 'react'
import { motion } from 'framer-motion'
import Modal from './shared/Modal'
import { useCart } from '../context/CartContext'
import { formatINR } from '../data/products'

export default function ProductQuickView({ product, open, onClose }) {
  const [qty, setQty] = useState(1)
  const { addItem } = useCart()

  if (!product) return null

  const handleAdd = () => {
    addItem(product, qty)
    onClose()
    setQty(1)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center bg-navy text-cream focus-ring"
      >
        ✕
      </button>

      <div className="grid gap-0 md:grid-cols-2">
        <div className="flex items-center justify-center bg-white p-10">
          <motion.img
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            src={product.img}
            alt={product.title}
            className="max-h-[280px] w-full object-contain"
          />
        </div>

        <div className="p-8 md:p-10">
          <p className="font-mono text-[11.5px] tracking-wide text-gold-deep">
            MOQ {product.moq}
          </p>
          <h3 className="mt-2 font-head text-[22px] font-bold text-navy">{product.title}</h3>
          <p className="mt-3 text-[14px] leading-relaxed text-charcoal/70">{product.desc}</p>

          <div className="mt-5 flex items-baseline gap-2">
            <span className="font-display text-[26px] font-extrabold text-gold">
              {formatINR(product.priceFrom)}
            </span>
            <span className="text-[13px] text-charcoal/50">{product.unit} · starting from</span>
          </div>
          <p className="mt-1 text-[12px] text-charcoal/40">
            Indicative price. Final rate depends on GSM, print colours and quantity.
          </p>

          <div className="mt-6 space-y-2 border-y border-navy/10 py-5">
            {product.specs.map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 text-[13px]">
                <span className="text-charcoal/50">{label}</span>
                <span className="text-right font-medium text-navy">{value}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center border border-navy/20">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-10 w-10 text-navy hover:bg-navy/5"
              >
                −
              </button>
              <span className="w-10 text-center font-semibold text-navy">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="h-10 w-10 text-navy hover:bg-navy/5"
              >
                +
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleAdd}
              className="flex-1 bg-gold px-6 py-3 text-[14px] font-semibold text-navy-deep"
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
