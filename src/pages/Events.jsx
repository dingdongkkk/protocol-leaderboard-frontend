import PageTransition from '../components/PageTransition'
import Reveal, { StaggerGrid } from '../components/Reveal'
import EventCard from '../components/EventCard'
import { upcomingEvents, pastEvents } from '../data/events'

export default function Events() {
  return (
    <PageTransition>
      <main className="pb-5">
        {/* HERO */}
        <section className="events-hero container-fluid py-5">
          <div className="container">
            <div className="row align-items-center gx-5">
              <div className="col-lg-5 d-none d-lg-block">
                <Reveal y={40}>
                  <h1 className="synergy-title">
                    <span className="condensed">Tech</span>{' '}
                    <span className="hand">Events</span>
                    <span className="condensed d-block">&amp; Workshops</span>
                  </h1>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* UPCOMING EVENTS */}
        <section className="container py-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
            <Reveal>
              <h2 className="featured-heading mb-3 mb-md-0">
                <span className="handwritten featured-hand">Upcoming</span>
                <span className="condensed featured-condensed">Events</span>
              </h2>
            </Reveal>
          </div>
          <StaggerGrid className="events-grid">
            {upcomingEvents.map(ev => <EventCard event={ev} key={ev.title} />)}
          </StaggerGrid>
        </section>

        {/* PAST EVENTS */}
        <section className="container py-4">
          <Reveal>
            <h2 className="featured-heading mb-4">
              <span className="handwritten featured-hand">Past</span>
              <span className="condensed featured-condensed">Events</span>
            </h2>
          </Reveal>
          <StaggerGrid className="events-grid">
            {pastEvents.map(ev => <EventCard event={ev} key={ev.title + ev.date} />)}
          </StaggerGrid>
        </section>
      </main>
    </PageTransition>
  )
}
