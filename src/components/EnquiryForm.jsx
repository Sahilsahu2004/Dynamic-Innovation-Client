import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import RevealText from './shared/RevealText'

const PRODUCTS = [
  'HDPE/PP Woven Fabric & Bags',
  'PP-BOPP Bags',
  'HM/LD Liner',
  'FIBC/Jumbo Bags',
  'Tarpaulin',
  'Not sure yet',
]

const inputCls =
  'w-full border-b border-cream/25 bg-transparent py-3 text-[15px] text-cream placeholder:text-cream/40 focus:border-gold focus-ring outline-none transition-colors'

export default function EnquiryForm() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    product: PRODUCTS[0],
    message: '',
  })

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    // Connect this to your backend / form service (e.g. Formspree, EmailJS)
    setSent(true)
  }

  return (
    <section id="enquiry" className="bg-navy py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-[12.5px] tracking-wide text-gold"
          >
            Let's talk packaging
          </motion.p>
          <h2 className="mt-3 font-head font-bold text-[32px] leading-tight text-cream sm:text-[38px]">
            <RevealText text="Tell us the load." />
            <br />
            <RevealText text="We'll build the bag." delay={0.15} />
          </h2>
          <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed text-cream/60">
            Share your product, capacity and printing requirements. We will
            respond with a specification and quote, fast.
          </p>
          <div className="mt-10 space-y-4 text-[14px] text-cream/70">
            <div>
              <p className="font-head text-[11px] font-bold uppercase tracking-wide text-gold">Contact Person</p>
              <p className="mt-1">Rahul Agrawal — CEO</p>
            </div>
            <div>
              <p className="font-head text-[11px] font-bold uppercase tracking-wide text-gold">Phone / WhatsApp</p>
              <a href="https://wa.me/917009550413" className="mt-1 block hover:text-gold transition-colors">+91 70095 50413</a>
            </div>
            <div>
              <p className="font-head text-[11px] font-bold uppercase tracking-wide text-gold">Email</p>
              <a href="mailto:info@dynainnovate.com" className="mt-1 block hover:text-gold transition-colors">info@dynainnovate.com</a>
            </div>
            <div>
              <p className="font-head text-[11px] font-bold uppercase tracking-wide text-gold">Address</p>
              <p className="mt-1">Ahmedabad – 382210, Gujarat, India</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex h-full min-h-[360px] flex-col items-center justify-center border border-cream/15 p-10 text-center"
              >
                <span className="grid h-14 w-14 place-items-center bg-gold text-navy text-2xl">
                  ✓
                </span>
                <h3 className="mt-6 font-head font-bold text-[20px] text-cream">
                  Enquiry received
                </h3>
                <p className="mt-2 max-w-xs text-[14px] text-cream/60">
                  We'll reach out on the phone number you shared, usually
                  within one business day.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onSubmit={onSubmit}
                className="grid gap-7 sm:grid-cols-2"
              >
                <motion.input
                  whileFocus={{ y: -2 }}
                  name="name"
                  required
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your name"
                  className={inputCls}
                />
                <motion.input
                  whileFocus={{ y: -2 }}
                  name="company"
                  required
                  value={form.company}
                  onChange={onChange}
                  placeholder="Company / brand name"
                  className={inputCls}
                />
                <motion.input
                  whileFocus={{ y: -2 }}
                  name="phone"
                  required
                  value={form.phone}
                  onChange={onChange}
                  placeholder="Phone number"
                  className={inputCls}
                />
                <motion.select
                  whileFocus={{ y: -2 }}
                  name="product"
                  value={form.product}
                  onChange={onChange}
                  className={`${inputCls} appearance-none`}
                >
                  {PRODUCTS.map((p) => (
                    <option key={p} value={p} className="bg-navy text-cream">
                      {p}
                    </option>
                  ))}
                </motion.select>
                <motion.textarea
                  whileFocus={{ y: -2 }}
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={onChange}
                  placeholder="Bag size, weight, monthly quantity, artwork status…"
                  className={`${inputCls} resize-none sm:col-span-2`}
                />
                <motion.button
                  whileHover={{ x: 4, backgroundColor: '#7c9420' }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  type="submit"
                  className="mt-2 flex w-fit items-center gap-2 bg-gold px-8 py-3.5 text-[14px] font-semibold text-navy-deep sm:col-span-2"
                >
                  Send enquiry
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
