import { motion } from 'framer-motion'

/* Shared page-level enter/exit animation. */
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.45, ease: [0.21, 0.6, 0.35, 1] }}
    >
      {children}
    </motion.div>
  )
}
