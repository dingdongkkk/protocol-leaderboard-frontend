import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'

export default function About() {
  return (
    <PageTransition>
      {/* ABOUT HERO */}
      <section className="about-hero container">
        <div className="row">
          <div className="col-lg-6">
            <h1 className="about-title">
              <motion.span
                className="about-normal d-inline-block"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.21, 0.6, 0.35, 1] }}
              >
                About
              </motion.span>
              <br />
              <motion.span
                className="about-hand d-inline-block"
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.6, 0.35, 1] }}
              >
                Protocol
              </motion.span>
            </h1>
          </div>
        </div>
      </section>

      {/* ABOUT CONTENT BOXES */}
      <section className="about-content container pb-5">
        <Reveal>
          <div className="about-box mb-4">
            <p className="about-box-title">Who We Are</p>
            <p>
              Protocol is the official club of the Department of Computer Science and Engineering Department at
              BMS College of Engineering, Bengaluru. We’re a student-led community of tech enthusiasts passionate
              about innovation, learning, and collaboration.
            </p>
            <p>
              At Protocol, our mission is to create a space where students can explore new technologies, build
              meaningful projects, and grow, both technically and personally. Throughout the academic year, we host
              a wide range of events, from hands-on workshops and expert-led seminars to competitive hackathons and
              coding contests, all designed to sharpen skills and spark curiosity.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="about-box">
            <p className="about-box-title">What We Do</p>
            <p>
              Beyond technical excellence, we’re equally committed to nurturing soft skills like leadership,
              communication, and teamwork. Every event, initiative, and project is an opportunity for our members
              to grow as confident, well-rounded individuals.
            </p>
            <p>
              Protocol is also an active part of BMSCE’s cultural and technical scene, organizing engaging events at
              the college's flagship fests—fun, interactive experiences at Utsav, and cutting-edge showcases at
              Phaseshift. At Protocol, we don’t just code, we build, we connect, and we grow together.
            </p>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  )
}
