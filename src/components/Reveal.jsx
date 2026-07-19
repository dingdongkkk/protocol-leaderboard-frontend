import { motion } from 'framer-motion'

/* Scroll-triggered reveal wrapper: fades + rises into view once. */
export default function Reveal({ children, delay = 0, y = 34, once = true, className, style }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* Staggered grid reveal: children pop in one after another. */
export function StaggerGrid({ children, className, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className, style }) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.96 },
        show: {
          opacity: 1, y: 0, scale: 1,
          transition: { duration: 0.6, ease: [0.21, 0.6, 0.35, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
