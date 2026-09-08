import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { formatINR } from '../data/products'
import { openRazorpayCheckout } from '../lib/razorpay'

const ADVANCE_PERCENT = 0.1 // 10% token advance to confirm order

export default function CartDrawer() {
  const { items, updateQty, removeItem, subtotal, count, isOpen, setIsOpen, clearCart } = useCart()
  const [step, setStep] = useState('cart') // cart | details | paying | success
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '', address: '' })
  const [paymentError, setPaymentError] = useState('')

  const advance = Math.max(500, Math.round(subtotal * ADVANCE_PERCENT))

  const close = () => {
    setIsOpen(false)
    setTimeout(() => setStep('cart'), 300)
  }

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const handlePay = async (e) => {
    e.preventDefault()
    setPaymentError('')
    setStep('paying')
    try {
      await openRazorpayCheckout({
        amount: advance,
        name: form.name,
        email: form.email,
        contact: form.phone,
        notes: { company: form.company, address: form.address, items: items.map((i) => `${i.title} x${i.qty}`).join(', ') },
        onSuccess: () => {
          setStep('success')
          clearCart()
        },
        onDismiss: () => setStep('details'),
      })
    } catch {
      setPaymentError('Could not open payment window. Please check your connection and try again.')
      setStep('details')
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[90] bg-navy-deep/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
            className="fixed right-0 top-0 z-[95] flex h-full w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-navy/10 px-6 py-5">
              <h3 className="font-head text-[17px] font-bold text-navy">
                {step === 'cart' && `Your Cart (${count})`}
                {step === 'details' && 'Order Details'}
                {step === 'paying' && 'Processing'}
                {step === 'success' && 'Order Placed'}
              </h3>
              <button onClick={close} aria-label="Close cart" className="text-navy/60 hover:text-navy text-xl leading-none">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {step === 'cart' && (
                items.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center text-charcoal/50">
                    <span className="text-3xl">🛒</span>
                    <p className="mt-3 text-[14px]">Your cart is empty.</p>
                    <p className="mt-1 text-[12.5px]">Browse products and add what you need.</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-4 border-b border-navy/10 pb-5"
                      >
                        <div className="h-16 w-16 shrink-0 overflow-hidden bg-white">
                          <img src={item.img} alt={item.title} className="h-full w-full object-contain p-1.5" />
                        </div>
                        <div className="flex-1">
                          <p className="font-head text-[13.5px] font-semibold text-navy">{item.title}</p>
                          <p className="mt-0.5 text-[12px] text-charcoal/50">MOQ {item.moq}</p>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center border border-navy/20">
                              <button onClick={() => updateQty(item.id, item.qty - 1)} className="h-7 w-7 text-navy text-sm hover:bg-navy/5">−</button>
                              <span className="w-8 text-center text-[13px] font-semibold text-navy">{item.qty}</span>
                              <button onClick={() => updateQty(item.id, item.qty + 1)} className="h-7 w-7 text-navy text-sm hover:bg-navy/5">+</button>
                            </div>
                            <span className="font-semibold text-gold">{formatINR(item.priceFrom * item.qty)}</span>
                          </div>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="self-start text-charcoal/30 hover:text-charcoal/60 text-sm">✕</button>
                      </motion.div>
                    ))}
                  </div>
                )
              )}

              {step === 'details' && (
                <form id="checkout-form" onSubmit={handlePay} className="space-y-4">
                  <p className="text-[12.5px] leading-relaxed text-charcoal/60">
                    Share your details — we confirm final pricing and specs before production.
                    A token advance secures your slot in the production queue.
                  </p>
                  {['name', 'company', 'phone', 'email'].map((field) => (
                    <input
                      key={field}
                      name={field}
                      required
                      value={form[field]}
                      onChange={onChange}
                      placeholder={field[0].toUpperCase() + field.slice(1)}
                      className="w-full border-b border-navy/25 bg-transparent py-2.5 text-[14px] text-navy placeholder:text-charcoal/40 focus:border-gold-deep outline-none transition-colors"
                    />
                  ))}
                  <textarea
                    name="address"
                    required
                    rows={2}
                    value={form.address}
                    onChange={onChange}
                    placeholder="Delivery address"
                    className="w-full resize-none border-b border-navy/25 bg-transparent py-2.5 text-[14px] text-navy placeholder:text-charcoal/40 focus:border-gold-deep outline-none transition-colors"
                  />
                  {paymentError && <p className="text-[12.5px] text-red-600">{paymentError}</p>}
                </form>
              )}

              {step === 'paying' && (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="h-8 w-8 rounded-full border-2 border-gold border-t-transparent"
                  />
                  <p className="mt-4 text-[13.5px] text-charcoal/60">Opening secure payment window…</p>
                </div>
              )}

              {step === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="flex h-full flex-col items-center justify-center text-center"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-gold text-2xl text-navy-deep">✓</span>
                  <h4 className="mt-5 font-head text-[18px] font-bold text-navy">Advance received</h4>
                  <p className="mt-2 max-w-xs text-[13.5px] text-charcoal/60">
                    Rahul's team will call you to confirm final specs and schedule production.
                  </p>
                </motion.div>
              )}
            </div>

            {step === 'cart' && items.length > 0 && (
              <div className="border-t border-navy/10 px-6 py-5">
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-charcoal/60">Indicative subtotal</span>
                  <span className="font-head text-[17px] font-bold text-gold">{formatINR(subtotal)}</span>
                </div>
                <p className="mt-1 text-[11.5px] text-charcoal/40">Final price confirmed on quote before dispatch.</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep('details')}
                  className="mt-4 w-full bg-navy py-3.5 text-[14px] font-semibold text-cream"
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            )}

            {step === 'details' && (
              <div className="border-t border-navy/10 px-6 py-5">
                <div className="mb-3 flex items-center justify-between text-[13.5px]">
                  <span className="text-charcoal/60">Token advance (10%)</span>
                  <span className="font-head text-[16px] font-bold text-gold">{formatINR(advance)}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  form="checkout-form"
                  className="w-full bg-gold py-3.5 text-[14px] font-semibold text-navy-deep"
                >
                  Pay {formatINR(advance)} with Razorpay
                </motion.button>
                <button onClick={() => setStep('cart')} className="mt-3 w-full text-center text-[12.5px] text-charcoal/50 hover:text-charcoal">
                  ← Back to cart
                </button>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
