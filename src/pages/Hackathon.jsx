import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Reveal, { StaggerGrid, StaggerItem } from '../components/Reveal'
import '../styles/hackathon.css'

const problems = [
  {
    badge: 'Public Safety / Civic Infrastructure',
    title: '1. Offline-First Disaster Communication Network',
    problem: 'During natural disasters such as earthquakes, floods, or cyclones, communication infrastructure often becomes unreliable or completely unavailable. Communities are unable to share critical information like medical needs, blocked routes, or requests for assistance.',
    challenge: 'Design and develop a system that enables individuals within a local area to share and access essential information even when internet connectivity is unavailable.',
  },
  {
    badge: 'Accessibility Technology',
    title: '2. Indoor Navigation for Visually Impaired',
    problem: 'Visually impaired individuals often face significant challenges navigating unfamiliar indoor environments such as hospitals, universities, or malls. Unlike outdoor navigation with GPS, indoor spaces often lack accessible guidance.',
    challenge: 'Develop a digital solution that enables visually impaired users to navigate indoor environments safely and independently, helping them locate destinations with confidence.',
  },
  {
    badge: 'Migration Policy / Digital Governance',
    title: '3. Digital Border Management System',
    problem: 'Border management authorities must process large volumes of travelers while ensuring security and efficient documentation. Fragmented systems and manual processes make it difficult to manage records and coordinate agencies.',
    challenge: 'Design a digital system that improves the management of border entry information, documentation processes, and coordination between authorities and humanitarian organizations.',
  },
]

const winners = [
  { rank: '2nd', cls: 'winner-silver', color: '#bdc3c7', icon: 'bi-person-fill', score: '74.5/100', team: 'PUBLIC STATIC VOID MAIN' },
  { rank: '1st', cls: 'winner-gold', color: '#f1c40f', icon: 'bi-trophy-fill', score: '81.2/100', team: 'HexBlaze' },
  { rank: '3rd', cls: 'winner-bronze', color: '#cd7f32', icon: 'bi-person-fill', score: '64.2/100', team: 'Supernova' },
]

export default function Hackathon() {
  return (
    <PageTransition>
      <main>
        <section className="hackathon-hero container position-relative">
          <div className="hackathon-loading" aria-hidden="true">
            <span />
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h1 className="hackathon-title mb-4">
                <motion.span
                  className="condensed d-block mb-2"
                  initial={{ opacity: 0, letterSpacing: '0.4em' }}
                  animate={{ opacity: 1, letterSpacing: '0.05em' }}
                  transition={{ duration: 1, ease: [0.21, 0.6, 0.35, 1] }}
                >
                  PROTOCOL PRESENTS
                </motion.span>
                <motion.span
                  className="handwritten d-inline-block"
                  initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, delay: 0.25, ease: [0.21, 0.6, 0.35, 1] }}
                >
                  Mega Hackathon
                </motion.span>
              </h1>
              <motion.p
                className="hero-desc mx-auto text-center"
                style={{ marginTop: '1rem' }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                48 Hours. Infinite Possibilities. Join the CSE department's ultimate coding showdown. Build, innovate, and
                claim your spot on the Wall of Fame.
              </motion.p>
            </div>
          </div>
        </section>

        <section className="container py-5">
          <Reveal><h2 className="section-heading text-center mb-5">The Challenges</h2></Reveal>

          <Reveal delay={0.1}>
            <div className="text-center mb-5">
              <p className="mx-auto" style={{ maxWidth: 800, color: 'var(--text-light)', opacity: 0.9, fontSize: '1.1rem' }}>
                Registration is based on a <strong>first-come, first-served</strong> basis.
                Each problem statement has a limit of <strong>20 slots</strong>. Click on the link below to secure your spot:
              </p>
              <div className="mt-4">
                <a href="https://protocol-hackathon.netlify.app/" className="btn btn-pill btn-light-fill" target="_blank" rel="noopener noreferrer">
                  Register at protocol-hackathon.netlify.app &rarr;
                </a>
              </div>
            </div>
          </Reveal>

          <StaggerGrid className="row g-4 justify-content-center">
            {problems.map(p => (
              <StaggerItem className="col-lg-4" key={p.title}>
                <div className="about-box ps-card">
                  <span className="ps-badge">{p.badge}</span>
                  <h3 className="about-box-title">{p.title}</h3>
                  <div className="about-box-content mt-3">
                    <p style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '1.5rem' }}>
                      <strong>Problem:</strong> {p.problem}
                    </p>
                    <p className="pt-3" style={{ fontSize: '0.95rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                      <strong>Challenge:</strong> {p.challenge}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>

        <section className="container py-5 mb-5">
          <Reveal>
            <h2 className="section-heading text-center">Wall of Fame</h2>
            <p className="text-center" style={{ color: 'var(--text-light)', opacity: 0.8, fontWeight: 300 }}>
              The champions of this edition.
            </p>
          </Reveal>

          <StaggerGrid className="podium-grid">
            {winners.map(w => (
              <StaggerItem key={w.rank}>
                <div className={`winner-card ${w.cls}`}>
                  <h3 className="winner-rank" style={{ color: w.color }}>{w.rank}</h3>
                  <div className="winner-avatar"><i className={`bi ${w.icon}`}></i></div>
                  <h4 className="winner-name">{w.score}</h4>
                  <p style={{ color: 'var(--text-light)', opacity: 0.7, fontSize: '0.9rem' }}>{w.team}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>
      </main>
    </PageTransition>
  )
}
