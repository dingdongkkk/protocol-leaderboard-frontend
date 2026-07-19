import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'
import { notesYears } from '../data/notes'

function SemesterCard({ semester }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`semester-card ${open ? 'open' : ''}`}>
      <button className="semester-toggle" onClick={() => setOpen(o => !o)}>
        {semester.name}
        <motion.span
          className="sem-arrow"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="subjects"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.21, 0.6, 0.35, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <motion.div
              className="subjects-grid-react"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
            >
              {semester.subjects.map(s => (
                <motion.a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="subject-card"
                  variants={{
                    hidden: { opacity: 0, y: 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
                  }}
                >
                  {s.name}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Notes() {
  return (
    <PageTransition>
      <main className="notes-main container">
        <Reveal>
          <h1 className="notes-title handwritten">Notes Repository</h1>
          <p className="notes-subtitle">
            Curated Notes for the Students of the Department of Computer Science &amp; Engineering
          </p>
        </Reveal>

        {notesYears.map(year => (
          <section className="notes-year" key={year.year}>
            <Reveal>
              <h2 className="notes-year-title handwritten">{year.year}</h2>
            </Reveal>
            <div className="notes-sem-grid">
              {year.semesters.map((sem, i) => (
                <Reveal delay={i * 0.1} key={sem.name}>
                  <SemesterCard semester={sem} />
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </main>
    </PageTransition>
  )
}
