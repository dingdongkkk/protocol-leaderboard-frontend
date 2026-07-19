import PageTransition from '../components/PageTransition'
import Reveal, { StaggerGrid, StaggerItem } from '../components/Reveal'
import { articles, getFeaturedIndex } from '../data/articles'

export default function Synergy() {
  const featured = articles[getFeaturedIndex()] || articles[0]

  return (
    <PageTransition>
      <main>
        <section className="synergy-hero container-fluid">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5 d-none d-lg-block">
                <Reveal y={40}>
                  <h1 className="synergy-title">
                    <span className="hand">Synergy</span>
                    <span className="condensed d-block">Weekly</span>
                  </h1>
                </Reveal>
              </div>

              <div className="col-lg-7">
                <Reveal>
                  <h2 className="featured-heading">
                    <span className="handwritten featured-hand">Featured</span>
                    <span className="condensed featured-condensed">Article</span>
                  </h2>
                </Reveal>

                {featured && (
                  <Reveal delay={0.15}>
                    <a
                      className="featured-link d-block"
                      href={featured.url && featured.url.trim() !== '' ? featured.url : undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div className="featured-inner">
                        <div className="featured-label"></div>
                        <div className="featured-media">
                          <img className="featured-thumb" src={featured.image} alt={featured.title || 'Featured'} />
                        </div>
                        <div className="featured-meta">
                          <h3 style={{ fontWeight: 100 }}>{featured.title}</h3>
                          <p>{featured.description}</p>
                          <span className="read-btn">Read on LinkedIn</span>
                        </div>
                      </div>
                    </a>
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="container synergy-grid-wrap">
          <StaggerGrid className="synergy-grid">
            {articles.map(a => (
              <StaggerItem key={a.title}>
                <a
                  className="article-card d-flex flex-column h-100"
                  href={a.url && a.url.trim() !== '' ? a.url : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img className="article-thumb" src={a.image} alt={a.title || ''} loading="lazy" />
                  <div className="article-body">
                    <h4 className="article-title">{a.title}</h4>
                    <div className="article-meta">
                      <span className="read-btn" style={{ fontWeight: 200 }}>Read more</span>
                    </div>
                  </div>
                </a>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </section>
      </main>
    </PageTransition>
  )
}
