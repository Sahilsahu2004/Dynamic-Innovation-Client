import { motion } from 'framer-motion'

/**
 * Reveals an image with a subtle scale + slide settle as it enters the
 * viewport. Unlike a clip-path wipe, the image is never set to opacity 0
 * or fully clipped — it is visible from first paint no matter what, so a
 * missed scroll-trigger just means it skips the flourish, not that the
 * image disappears.
 */
export default function RevealImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  direction = 'up', // 'up' | 'left' | 'right'
  delay = 0,
  once = true,
  amount = 0.15,
  fit = 'cover', // 'cover' | 'contain'
}) {
  const translate =
    direction === 'left' ? { x: -24 } : direction === 'right' ? { x: 24 } : { y: 24 }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} ${imgClassName}`}
        initial={{ scale: 1.15, ...translate }}
        whileInView={{ scale: 1, x: 0, y: 0 }}
        viewport={{ once, amount }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      />
    </div>
  )
}
