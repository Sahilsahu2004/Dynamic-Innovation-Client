import RevealText from './shared/RevealText'
import { motion } from 'framer-motion'

export default function ContactMap() {
  return (
    <section id="contact" className="bg-navy-deep py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <h2 className="font-head font-bold text-[28px] leading-tight text-cream sm:text-[34px] max-w-lg">
          <RevealText text="Find us" />
        </h2>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-[14.5px] text-cream/75"
          >
            <div>
              <p className="font-head font-semibold text-cream">Address</p>
              <p className="mt-1 text-cream/60">
                Ahmedabad – 382210,
                <br /> Gujarat, India
              </p>
            </div>
            <div>
              <p className="font-head font-semibold text-cream">Contact person</p>
              <p className="mt-1 text-cream/60">Rahul Agrawal — CEO</p>
            </div>
            <div>
              <p className="font-head font-semibold text-cream">Phone / WhatsApp</p>
              <a href="https://wa.me/917009550413" className="mt-1 block text-cream/60 hover:text-gold transition-colors">
                +91 70095 50413
              </a>
            </div>
            <div>
              <p className="font-head font-semibold text-cream">Email</p>
              <a href="mailto:info@dynainnovate.com" className="mt-1 block text-cream/60 hover:text-gold transition-colors">
                info@dynainnovate.com
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="h-[320px] w-full overflow-hidden lg:h-full"
          >
            <iframe
              title="Dynamic Innovations location"
              src="https://www.google.com/maps?q=Ahmedabad+382210+Gujarat+India&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
