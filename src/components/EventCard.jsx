import { StaggerItem } from './Reveal'

/* Event card — same markup/classes as the vanilla createEventCard().
   StaggerItem is a plain wrapper so the card's own CSS hover lift keeps working. */
export default function EventCard({ event }) {
  return (
    <StaggerItem>
      <div className="event-card h-100">
        <div className="event-card-poster">
          <img className="event-card-img" src={event.image} alt={event.title} loading="lazy" />
        </div>
        <div className="event-card-body">
          <h4 className="event-card-title condensed">{event.title}</h4>
          <div className="event-card-date small text-muted">{event.date}</div>
          <p className="event-card-desc">{event.description}</p>
          {event.register && (
            <a
              href={event.register}
              target="_blank"
              rel="noopener noreferrer"
              className="read-btn w-100 text-center mt-2 d-block"
            >
              Register
            </a>
          )}
        </div>
      </div>
    </StaggerItem>
  )
}
