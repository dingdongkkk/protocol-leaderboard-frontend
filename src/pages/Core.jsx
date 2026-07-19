import PageTransition from '../components/PageTransition'
import Reveal, { StaggerGrid, StaggerItem } from '../components/Reveal'
import { coreMembers, seniorTeam, juniorCore, previousCore } from '../data/team'

function MemberGrid({ members, cols }) {
  return (
    <StaggerGrid className={`core-grid ${cols}`}>
      {members.map(m => (
        <StaggerItem key={m.name}>
          <div className="member-card">
            <img className="member-photo" src={m.photo} alt={m.name} loading="lazy" />
            <div className="member-name condensed">{m.name}</div>
            <div className="member-role">{m.role}</div>
          </div>
        </StaggerItem>
      ))}
    </StaggerGrid>
  )
}

export default function Core() {
  return (
    <PageTransition>
      <main>
        {/* CORE HERO SECTION */}
        <section className="core-hero container-fluid py-5">
          <div className="container">
            <div className="row align-items-start">
              {/* LEFT VERTICAL LABEL */}
              <div className="col-auto d-none d-lg-block">
                <Reveal y={0} className="vertical-label">
                  <div className="vertical-top condensed">Meet the</div>
                  <div className="vertical-handwritten handwritten">Team</div>
                </Reveal>
              </div>

              {/* RIGHT CONTENT GRID */}
              <div className="col">
                <div className="core-grid-wrap">
                  <Reveal><h3 className="section-heading">The Core</h3></Reveal>
                  <MemberGrid members={coreMembers} cols="core-5col" />

                  <Reveal><h3 className="section-heading mt-5">Senior Team</h3></Reveal>
                  <MemberGrid members={seniorTeam} cols="core-4col" />

                  <Reveal><h3 className="section-heading mt-5">Junior Core</h3></Reveal>
                  <MemberGrid members={juniorCore} cols="core-4col" />

                  <Reveal><h3 className="section-heading mt-5">Former Core: 2024-25</h3></Reveal>
                  <MemberGrid members={previousCore} cols="core-5col" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageTransition>
  )
}
