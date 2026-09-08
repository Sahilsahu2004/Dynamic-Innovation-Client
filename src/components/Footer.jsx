import { motion } from 'framer-motion'
import Logo from './shared/Logo'

const LINKS = [
  { label: 'Company', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#custom' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-navy-deep pt-20">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 border-t border-cream/10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Logo className="h-11 w-auto" light />
            <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-cream/50">
              Manufacturer and supplier of HDPE/PP woven fabric and bags,
              serving the industrial, agricultural and packaging sectors all
              over the globe.
            </p>
          </div>

          <div>
            <p className="font-head font-semibold text-[14px] text-cream">Explore</p>
            <ul className="mt-4 space-y-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <motion.a
                    whileHover={{ x: 4 }}
                    href={l.href}
                    className="inline-block text-[13.5px] text-cream/55 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-head font-semibold text-[14px] text-cream">Get in touch</p>
            <ul className="mt-4 space-y-3 text-[13.5px] text-cream/55">
              <li>Rahul Agrawal — CEO</li>
              <li><a href="https://wa.me/917009550413" className="hover:text-gold transition-colors">+91 70095 50413</a></li>
              <li><a href="mailto:info@dynainnovate.com" className="hover:text-gold transition-colors">info@dynainnovate.com</a></li>
              <li>Ahmedabad – 382210, Gujarat, India</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-cream/10 py-8 text-[12.5px] text-cream/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dynamic Innovations. HDPE/PP Woven Fabric & Bags · Ahmedabad, India.</p>
          <p>Built to be a dependable partner.</p>
        </div>
      </div>
    </footer>
  )
}
