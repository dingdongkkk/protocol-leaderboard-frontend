import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import About from './pages/About'
import Core from './pages/Core'
import Events from './pages/Events'
import Hackathon from './pages/Hackathon'
import Synergy from './pages/Synergy'
import Notes from './pages/Notes'
import DailyChallenge from './pages/DailyChallenge'
import Contact from './pages/Contact'

const titles = {
  '/': 'Protocol — Home',
  '/about': 'Protocol — About',
  '/core': 'Protocol — Core Team',
  '/events': 'Protocol — Events',
  '/hackathon': 'Protocol — Mega Hackathon',
  '/synergy': 'Synergy Weekly — Protocol',
  '/notes': 'Protocol — Notes',
  '/daily-challenge': 'Protocol — Daily Challenge',
  '/contact': 'Contact Us | Protocol',
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
  return <motion.div className="scroll-progress" style={{ scaleX }} />
}

function Aurora() {
  return (
    <div className="aurora" aria-hidden="true">
      <div className="aurora-blob b1" />
      <div className="aurora-blob b2" />
      <div className="aurora-blob b3" />
    </div>
  )
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    document.title = titles[location.pathname] || 'Protocol'
  }, [location.pathname])

  return (
    <>
      <ScrollProgress />
      <Aurora />
      <Navbar />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/core" element={<Core />} />
          <Route path="/events" element={<Events />} />
          <Route path="/hackathon" element={<Hackathon />} />
          <Route path="/synergy" element={<Synergy />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/daily-challenge" element={<DailyChallenge />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}
