import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">

      <section className="hero">
        <div className="hero-content">
          <p className="section-label">NASA EXPLORER</p>

          <h1>
            Discover the
            <span> universe </span>
            beyond Earth.
          </h1>

          <p className="hero-text">
            Explore breathtaking space imagery and discoveries
            powered by NASA's scientific data.
          </p>

          <div className="hero-actions">
            <Link to="/apod" className="primary-button">
              Explore APOD →
            </Link>

            <a
              href="https://science.nasa.gov/"
              target="_blank"
              rel="noreferrer"
              className="secondary-button"
            >
              NASA Science
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="planet">
            <div className="planet-glow"></div>
          </div>
        </div>
      </section>

      <section className="home-features">

        <div className="feature-card">
          <span className="feature-icon">🌌</span>

          <h2>Explore Space</h2>

          <p>
            Discover incredible images and stories from
            across the universe.
          </p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">🔭</span>

          <h2>NASA Discoveries</h2>

          <p>
            Learn about astronomy through NASA's
            constantly updated data.
          </p>
        </div>

        <div className="feature-card">
          <span className="feature-icon">🚀</span>

          <h2>Powered by NASA</h2>

          <p>
            Explore real scientific information from
            NASA's public data sources.
          </p>
        </div>

      </section>

      <section className="home-cta">
        <p className="section-label">
          ASTRONOMY PICTURE OF THE DAY
        </p>

        <h2>
          See what the universe looks like today.
        </h2>

        <Link to="/apod" className="primary-button">
          View Today's Discovery →
        </Link>
      </section>

    </main>
  );
}

export default Home;