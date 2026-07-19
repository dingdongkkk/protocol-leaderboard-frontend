import { Link } from 'react-router-dom'
import Reveal from './Reveal'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer py-5">
      <div className="container">
        <Reveal y={24}>
          <div className="row">
            {/* Quick links */}
            <div className="col-md-4 mb-4">
              <h5 className="footer-heading condensed">Quick Links</h5>
              <ul className="list-unstyled footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/core">Core Team</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li><Link to="/hackathon">Hackathon</Link></li>
                <li><Link to="/synergy">Synergy Weekly</Link></li>
                <li><Link to="/notes">Notes</Link></li>
                <li><Link to="/daily-challenge">Daily Challenge</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-md-5 mb-4">
              <h5 className="footer-heading condensed">Contact Us</h5>
              <p className="footer-contact">+91 8217617133<br />
                protocol.cse@bmsce.ac.in</p>
              <p className="footer-address">
                B M S College of Engineering<br />
                Bull Temple Road, Basavanagudi<br />
                Bengaluru - 560019
              </p>
            </div>

            {/* Social icons */}
            <div className="col-md-3 d-flex align-items-center justify-content-end">
              <div className="social-icons d-flex flex-column gap-3">
                <a href="https://www.linkedin.com/company/protocol-bmsce/" className="social" target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin"></i></a>
                <a href="https://www.instagram.com/protocol_bmsce/" className="social" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
                <a href="mailto:protocol.cse@bmsce.ac.in" className="social"><i className="bi bi-envelope"></i></a>
              </div>
            </div>
          </div>

          <hr className="footer-divider" />

          <div className="d-flex justify-content-between align-items-center small">
            <div className="brand-footer">
              <span className="logo-text">protocol</span> | CSE Dept Club
            </div>
            <div>© {year} Protocol Club. All rights reserved.</div>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
