import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* 3D tilt-on-hover wrapper used for the big game cards. */
export default function TiltCard({ children, className, href, target, rel, max = 6 }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 150, damping: 18 })

  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  function onMouseLeave() {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, perspective: 1000 }}
    >
      {children}
    </motion.a>
  )
}
