import { motion } from 'framer-motion'
import PageTransition from '../components/PageTransition'
import Reveal from '../components/Reveal'

export default function Contact() {
  return (
    <PageTransition>
      {/* CONTACT HEADING */}
      <section className="contact-header text-center mt-5">
        <motion.h1
          className="contact-title"
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, ease: [0.21, 0.6, 0.35, 1] }}
        >
          Contact <span style={{ fontFamily: "'Delicious Handrawn', cursive", color: '#dba1b9' }}>Us</span>
        </motion.h1>
      </section>

      {/* CONTACT CARD */}
      <section className="container d-flex justify-content-center mt-4 mb-5">
        <Reveal className="contact-card" delay={0.15}>
          {/* Email */}
          <div className="contact-item text-center">
            <i className="bi bi-envelope-fill contact-icon"></i>
            <p>protocol.cse@bmsce.ac.in</p>
          </div>

          {/* Phone */}
          <div className="contact-item text-center mt-4">
            <i className="bi bi-telephone-fill contact-icon"></i>
            <p>
              Aaryan Prakash (President) : +91 8217617133<br />
              Bhavya J Makadia (Vice President) : +91 8086824847
            </p>
          </div>

          {/* Location */}
          <div className="contact-item text-center mt-4">
            <i className="bi bi-geo-alt-fill contact-icon"></i>
            <p>
              B M S College of Engineering<br />
              Bull Temple Road, Basavanagudi<br />
              Bengaluru - 560019
            </p>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  )
}
