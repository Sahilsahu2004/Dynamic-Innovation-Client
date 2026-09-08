import { motion } from 'framer-motion'

/**
 * Splits text into words and reveals them with a staggered
 * translateY + opacity animation as the element enters the viewport.
 * Each word is masked by an overflow-hidden wrapper so the motion
 * reads as the word rising into place, not a plain fade.
 */
export default function RevealText({
  text,
  as: Tag = 'span',
  className = '',
  delay = 0,
  stagger = 0.045,
  once = true,
  amount = 0.6,
}) {
  const words = text.split(' ')

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const word = {
    hidden: { y: '110%' },
    show: {
      y: '0%',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  }

  return (
    <Tag className={className}>
      <motion.span
        style={{ display: 'inline' }}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once, amount }}
      >
        {words.map((w, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              verticalAlign: 'top',
              paddingBottom: '0.08em',
            }}
          >
            <motion.span style={{ display: 'inline-block' }} variants={word}>
              {w}
              {i !== words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
