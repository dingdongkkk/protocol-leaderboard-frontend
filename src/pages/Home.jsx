import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AnimatePresence, motion, animate, useInView,
  useMotionValue, useMotionTemplate, useSpring, useTransform,
} from 'framer-motion'

import PageTransition from '../components/PageTransition'
import HeroParticles from '../components/HeroParticles'
import TiltCard from '../components/TiltCard'
import Reveal from '../components/Reveal'
import { pastEvents, upcomingEvents } from '../data/events'
import { articles } from '../data/articles'
import { coreMembers, seniorTeam, juniorCore, previousCore } from '../data/team'
import '../styles/home.css'

const EVENT_DATE = '2026-03-11T09:00:00'
const EASE = [0.21, 0.6, 0.35, 1]

/* ---------- countdown ---------- */
function useCountdown(target) {
  const [time, setTime] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' })

  useEffect(() => {
    const eventDate = new Date(target)
    function update() {
      const diff = eventDate.getTime() - Date.now()
      if (diff <= 0) {
        setTime({ days: '00', hours: '00', minutes: '00', seconds: '00' })
        return
      }
      const pad = n => String(n).padStart(2, '0')
      setTime({
        days: pad(Math.floor(diff / 86400000)),
        hours: pad(Math.floor(diff / 3600000) % 24),
        minutes: pad(Math.floor(diff / 60000) % 60),
        seconds: pad(Math.floor(diff / 1000) % 60),
      })
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [target])

  return time
}

function FlipNumber({ value }) {
  return (
    <div className="count-number">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="count-digit"
          initial={{ y: '-0.6em', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '0.6em', opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

/* ---------- letter-by-letter headline ---------- */
function Letters({ text, delay = 0, step = 0.045 }) {
  return (
    <span aria-label={text} role="text">
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="hh-letter"
          aria-hidden="true"
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: delay + i * step, duration: 0.65, ease: EASE }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

/* ---------- animated count-up stat ---------- */
function Stat({ value, label, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.8,
      delay,
      ease: 'easeOut',
      onUpdate: v => setN(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, delay])

  return (
    <div ref={ref} className="hh-stat">
      <div className="hh-stat-num">{n}+</div>
      <div className="hh-stat-label">{label}</div>
    </div>
  )
}

/* Stats derived from the site's real data — nothing invented */
const STAT_EVENTS = Math.floor((pastEvents.length + upcomingEvents.length) / 5) * 5
const STAT_ARTICLES = Math.floor(articles.length / 5) * 5
const STAT_MEMBERS = Math.floor(
  (coreMembers.length + seniorTeam.length + juniorCore.length + previousCore.length) / 5,
) * 5

const marqueeTitles = [...upcomingEvents, ...pastEvents].map(e => e.title)

export default function Home() {
  const time = useCountdown(EVENT_DATE)

  /* mouse-follow spotlight + 3D visual tilt */
  const heroRef = useRef(null)
  const mx = useMotionValue(50)
  const my = useMotionValue(38)
  const spotlight = useMotionTemplate`radial-gradient(640px circle at ${mx}% ${my}%, rgba(216, 166, 182, 0.10), transparent 65%)`

  const tiltX = useSpring(useTransform(my, [0, 100], [7, -7]), { stiffness: 120, damping: 20 })
  const tiltY = useSpring(useTransform(mx, [0, 100], [-9, 9]), { stiffness: 120, damping: 20 })

  function onHeroMove(e) {
    const rect = heroRef.current.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width) * 100)
    my.set(((e.clientY - rect.top) / rect.height) * 100)
  }

  return (
    <PageTransition>
      <main className="home-main">
        {/* ================= HERO ================= */}
        <section className="home-hero" ref={heroRef} onMouseMove={onHeroMove}>
          <div className="hh-grid-bg" aria-hidden="true" />
          <motion.div className="hh-spotlight" style={{ background: spotlight }} aria-hidden="true" />
          <HeroParticles />

          <div className="container hh-content">
            <div className="row align-items-center">
              {/* Left: headline */}
              <div className="col-lg-7">
                <motion.span
                  className="hh-badge"
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <span className="hh-badge-dot" />
                  BMSCE · CSE Dept Club
                </motion.span>

                <h1 className="mb-0">
                  <span className="hh-pre d-block"><Letters text="Where" delay={0.25} /></span>
                  <motion.span
                    className="hh-hand"
                    initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)', filter: 'blur(6px)' }}
                    animate={{ opacity: 1, clipPath: 'inset(0 0% 0 0)', filter: 'blur(0px)' }}
                    transition={{ duration: 1.1, delay: 0.6, ease: EASE }}
                  >
                    Creativity
                  </motion.span>
                  <span className="hh-cond d-block"><Letters text="Happens" delay={1.1} step={0.05} /></span>
                </h1>

                <motion.p
                  className="hh-desc"
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.5, ease: EASE }}
                >
                  Protocol is the CSE department's premier club fostering innovation, creativity, and technological
                  excellence through collaborative projects and cutting-edge events.
                </motion.p>

                <motion.div
                  className="hh-ctas"
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.7, ease: EASE }}
                >
                  <Link className="btn btn-pill btn-light-fill" to="/events">Explore our events &rarr;</Link>
                  <Link className="btn btn-pill btn-light-outline" to="/about">About Us &rarr;</Link>
                </motion.div>

                <motion.div
                  className="hh-stats"
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.9, ease: EASE }}
                >
                  <Stat value={STAT_EVENTS} label="Events Hosted" delay={0} />
                  <Stat value={STAT_ARTICLES} label="Synergy Articles" delay={0.15} />
                  <Stat value={STAT_MEMBERS} label="Team Members" delay={0.3} />
                </motion.div>
              </div>

              {/* Right: floating logo card with orbits */}
              <div className="col-lg-5">
                <motion.div
                  className="hh-visual"
                  initial={{ opacity: 0, scale: 0.82 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.8, ease: EASE }}
                >
                  <div className="hh-orbit o1"><span className="dot" /></div>
                  <div className="hh-orbit o2"><span className="dot" /></div>
                  <motion.div className="hh-card" style={{ rotateX: tiltX, rotateY: tiltY }}>
                    <img src="/data/Protocol(Round-Logo).png" alt="Protocol club logo" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* SVG Wave at bottom */}
          <div className="hero-wave">
            <svg viewBox="0 0 1440 150" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#7f1f3a" />
                  <stop offset="100%" stopColor="#d8a6b6" />
                </linearGradient>
              </defs>
              <path d="M0,40 C250,140 400,0 720,40 C1050,80 1200,0 1440,40 L1440 160 L0 160 Z" fill="url(#g1)" />
            </svg>
          </div>
        </section>

        {/* ================= EVENTS MARQUEE ================= */}
        <div className="event-marquee" aria-hidden="true">
          <div className="marquee-track">
            {[0, 1].map(copy => (
              <span className="marquee-item" key={copy}>
                {marqueeTitles.map(title => (
                  <span key={title}>{title} <span className="sep ms-4">✦</span></span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* ================= JOIN PROTOCOL ================= */}
        <section className="join-protocol text-center">
          <div className="container">
            <Reveal>
              <div className="join-card">
                <h2 className="countdown-pre handwritten">Join Protocol</h2>
                <p className="hero-desc mx-auto mt-3 mb-4" style={{ maxWidth: 600 }}>
                  Ready to push your limits and be a part of an incredible technical community? Become a member of the CSE
                  department's premier club, Protocol, today.
                </p>
                <div>
                  <a
                    className="btn btn-pill btn-light-fill"
                    href="https://forms.gle/7FNvDmpX6YzJd9X19"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join the team &rarr;
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ================= GAMES ================= */}
        <section className="games-section container py-5">
          {/* Game 1 */}
          <Reveal>
            <TiltCard
              href="https://protocol-treasurehunt.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="game-card d-flex flex-column flex-lg-row align-items-stretch mb-4"
            >
              <div className="game-media col-lg-5 d-flex align-items-center justify-content-center">
                <img src="/data/tpg.jpeg" alt="The Protocol Gauntlet" className="game-img" />
              </div>
              <div className="game-info col-lg-7 p-4">
                <h3 className="game-title">The Protocol Gauntlet</h3>
                <p className="game-text">Experience the opening round of The Protocol Gauntlet: an online mystery set inside Wren
                  Manor, built entirely by our team.
                  Click through interactive clue cards, follow an Agatha Christie–style murder trail, and see if you can piece
                  together the story.
                  Try it out and test your detective skills.</p>
                <div className="mt-3">
                  <span className="badge bg-dark text-light">Built with: </span>
                  <p>Vite, React, Tailwind CSS, Firebase, Netlify</p>
                  <span className="badge bg-dark text-light">Single Player</span>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          {/* Game 2 */}
          <Reveal>
            <TiltCard
              href="https://protocol-zeta.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="game-card d-flex flex-column flex-lg-row align-items-stretch mb-4"
            >
              <div className="game-media col-lg-5 d-flex align-items-center justify-content-center order-lg-2">
                <img src="/data/pb.jpeg" alt="Project Blackscreen" className="game-img" />
              </div>
              <div className="game-info col-lg-7 p-4 order-lg-1">
                <h3 className="game-title">Project Blackscreen</h3>
                <p className="game-text">Step into our high-pressure two-member challenge built on a custom platform built by our
                  team. One teammate answers analytical and logical reasoning questions to earn 1-second glimpses of the
                  Python code, while the other writes and debugs the solution with the screen constantly blacking out.
                  It’s fast, chaotic, and all about communication, memory, and precision. Click through to try the experience
                  yourself.</p>
                <div className="mt-3">
                  <span className="badge bg-dark text-light">Built with: </span>
                  <p>HTML,CSS,JS,Flask,Vercel</p>
                  <span className="badge bg-dark text-light">MultiPlayer</span>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </section>

        {/* ================= COUNTDOWN ================= */}
        <section className="countdown-section home-countdown text-center py-5">
          <div className="container">
            <Reveal>
              <h2 className="countdown-pre handwritten">Next Big Event</h2>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="countdown d-flex justify-content-center mt-4">
                {[
                  ['days', 'Days'],
                  ['hours', 'Hours'],
                  ['minutes', 'Minutes'],
                  ['seconds', 'Seconds'],
                ].map(([key, label]) => (
                  <div className="countdown-item" key={key}>
                    <FlipNumber value={time[key]} />
                    <div className="count-label">{label}</div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-4">
                <Link className="btn btn-pill btn-light-fill" to="/events">Check out the event &rarr;</Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
