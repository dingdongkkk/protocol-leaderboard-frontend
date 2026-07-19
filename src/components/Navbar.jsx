import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import '../styles/nav.css'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/core', label: 'Core' },
  { to: '/events', label: 'Events' },
  { to: '/hackathon', label: 'Hackathon', highlight: true },
  { to: '/synergy', label: 'Synergy Weekly' },
  { to: '/notes', label: 'Notes' },
  { to: '/daily-challenge', label: 'Daily Challenge' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu when navigating
  useEffect(() => { setOpen(false) }, [location.pathname])

  const linkClass = (l) => ({ isActive }) =>
    `pnav-link ${isActive ? 'active' : ''} ${l.highlight ? 'highlight' : ''}`

  return (
    <header>
      <nav className={`pnav ${scrolled ? 'scrolled' : ''}`}>
        <div className="pnav-inner">
          <Link className="pnav-brand" to="/" aria-label="Protocol — Home">
            <img src="/data/logo.png" alt="Protocol Logo" />
          </Link>

          <ul className="pnav-links">
            {links.map(l => (
              <li key={l.to}>
                <NavLink className={linkClass(l)} to={l.to} end={l.to === '/'}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="pnav-cta">
            <Link className="btn btn-contact" to="/contact">Contact</Link>
          </div>

          <button
            className={`pnav-burger ${open ? 'open' : ''}`}
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="pnav-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.21, 0.6, 0.35, 1] }}
          >
            <motion.ul
              className="pnav-mobile-list"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
            >
              {links.map(l => (
                <motion.li
                  key={l.to}
                  variants={{
                    hidden: { opacity: 0, x: -18 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.35 } },
                  }}
                >
                  <NavLink className={linkClass(l)} to={l.to} end={l.to === '/'}>
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li
                className="pnav-mobile-cta"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                }}
              >
                <Link className="btn btn-contact w-100" to="/contact">Contact</Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
