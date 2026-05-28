import { useApp } from '../context/AppContext'
import '../Landing.css'

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
    title: 'Catalogue management',
    description:
      'Add, edit, and organise titles with ISBN, author, genre, and copy counts in one structured catalogue.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
    title: 'Instant search',
    description:
      'Find any book by title, author, or ISBN in seconds—no more digging through paper registers.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Loan tracking',
    description:
      'Monitor borrowed, available, and reserved copies so staff always know what is on the shelf.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
    title: 'Live dashboard',
    description:
      'See totals, availability, and recent activity at a glance the moment you sign in.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: 'Secure access',
    description:
      'Role-based sign-in keeps your library data protected behind authenticated sessions.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'Built for Zimbabwe',
    description:
      'Designed for schools, community libraries, and institutions across Zimbabwe.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Create your account',
    description: 'Register with your work email and set up your library workspace in minutes.',
  },
  {
    number: '02',
    title: 'Build your catalogue',
    description: 'Add books individually with full metadata, quantities, and availability status.',
  },
  {
    number: '03',
    title: 'Run your library',
    description: 'Track loans, monitor stock, and manage your collection from a single dashboard.',
  },
]

const stats = [
  { value: '100%', label: 'Digital catalogue' },
  { value: '24/7', label: 'Cloud-ready access' },
  { value: '3', label: 'Status types tracked' },
  { value: '1', label: 'Unified dashboard' },
]

const Landing = () => {
  const { setView } = useApp()

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="landing-page">
      <header className="landing-nav">
        <div className="landing-nav-inner">
          <a
            href="#top"
            className="landing-logo"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <span className="landing-logo-mark" aria-hidden="true">
              LZ
            </span>
            <span className="landing-logo-text">
              <span className="landing-logo-eyebrow">Lindroid Zimbabwe</span>
              <strong>Book Management</strong>
            </span>
          </a>

          <nav className="landing-nav-links" aria-label="Primary">
            <button type="button" onClick={() => scrollTo('features')}>
              Features
            </button>
            <button type="button" onClick={() => scrollTo('how-it-works')}>
              How it works
            </button>
            <button type="button" onClick={() => scrollTo('cta')}>
              Get started
            </button>
          </nav>

          <div className="landing-nav-actions">
            <button
              type="button"
              className="landing-btn landing-btn-ghost"
              onClick={() => setView('login')}
            >
              Sign in
            </button>
            <button
              type="button"
              className="landing-btn landing-btn-primary"
              onClick={() => setView('register')}
            >
              Create account
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="landing-hero">
          <div className="landing-hero-inner">
            <div className="landing-hero-content">
              <span className="landing-badge">Library operations, simplified</span>
              <h1>
                Manage your books with{' '}
                <span className="landing-highlight">confidence</span>
              </h1>
              <p className="landing-hero-lead">
                A modern book management system for Zimbabwean libraries—catalogue
                titles, track availability, and oversee loans from one secure,
                easy-to-use platform.
              </p>
              <div className="landing-hero-cta">
                <button
                  type="button"
                  className="landing-btn landing-btn-primary landing-btn-lg"
                  onClick={() => setView('register')}
                >
                  Start free — create account
                </button>
                <button
                  type="button"
                  className="landing-btn landing-btn-outline landing-btn-lg"
                  onClick={() => setView('login')}
                >
                  Sign in to dashboard
                </button>
              </div>
              <ul className="landing-hero-trust" aria-label="Key benefits">
                <li>No installation required</li>
                <li>Real-time inventory updates</li>
                <li>Staff-friendly interface</li>
              </ul>
            </div>

            <div className="landing-hero-visual" aria-hidden="true">
              <div className="landing-mockup">
                <div className="landing-mockup-bar">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="landing-mockup-body">
                  <div className="landing-mockup-sidebar">
                    <div className="mock-nav active" />
                    <div className="mock-nav" />
                    <div className="mock-nav" />
                    <div className="mock-nav" />
                  </div>
                  <div className="landing-mockup-main">
                    <div className="mock-stats">
                      <div className="mock-stat" />
                      <div className="mock-stat" />
                      <div className="mock-stat" />
                      <div className="mock-stat" />
                    </div>
                    <div className="mock-table">
                      <div className="mock-row header" />
                      <div className="mock-row" />
                      <div className="mock-row" />
                      <div className="mock-row" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="landing-floating-card landing-float-1">
                <span className="float-icon available" />
                <div>
                  <strong>Available</strong>
                  <span>12 titles on shelf</span>
                </div>
              </div>
              <div className="landing-floating-card landing-float-2">
                <span className="float-icon borrowed" />
                <div>
                  <strong>On loan</strong>
                  <span>3 copies tracked</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="landing-stats" aria-label="Highlights">
          <div className="landing-stats-inner">
            {stats.map((stat) => (
              <div key={stat.label} className="landing-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="landing-section landing-features">
          <div className="landing-section-inner">
            <header className="landing-section-header">
              <span className="landing-section-tag">Features</span>
              <h2>Everything your library team needs</h2>
              <p>
                From cataloguing new acquisitions to tracking who has what on loan,
                Lindroid keeps daily operations organised and transparent.
              </p>
            </header>
            <div className="landing-features-grid">
              {features.map((feature) => (
                <article key={feature.title} className="landing-feature-card">
                  <div className="landing-feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="landing-section landing-steps">
          <div className="landing-section-inner landing-steps-inner">
            <header className="landing-section-header">
              <span className="landing-section-tag">How it works</span>
              <h2>Up and running in three steps</h2>
              <p>
                Whether you are digitising a school library or a community reading
                room, the workflow stays simple from day one.
              </p>
            </header>
            <ol className="landing-steps-list">
              {steps.map((step) => (
                <li key={step.number} className="landing-step">
                  <span className="landing-step-num">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="landing-section landing-showcase">
          <div className="landing-showcase-inner">
            <div className="landing-showcase-content">
              <span className="landing-section-tag">Why Lindroid</span>
              <h2>Replace spreadsheets with a system built for libraries</h2>
              <p>
                Stop juggling paper ledgers and disconnected files. Give your staff
                one source of truth for every title, copy, and loan status in your
                collection.
              </p>
              <ul className="landing-checklist">
                <li>Centralised book records with edit history</li>
                <li>Filter and sort your full catalogue instantly</li>
                <li>Status badges for available, borrowed, and reserved</li>
                <li>Responsive layout for desk and tablet use</li>
              </ul>
              <button
                type="button"
                className="landing-btn landing-btn-primary"
                onClick={() => setView('register')}
              >
                Get started today
              </button>
            </div>
            <div className="landing-showcase-panel" aria-hidden="true">
              <div className="showcase-book-stack">
                <div className="book-spine spine-1" />
                <div className="book-spine spine-2" />
                <div className="book-spine spine-3" />
                <div className="book-spine spine-4" />
              </div>
            </div>
          </div>
        </section>

        <section id="cta" className="landing-cta">
          <div className="landing-cta-inner">
            <h2>Ready to modernise your library?</h2>
            <p>
              Join librarians and administrators using Lindroid Zimbabwe to keep
              collections organised and accessible.
            </p>
            <div className="landing-cta-buttons">
              <button
                type="button"
                className="landing-btn landing-btn-light landing-btn-lg"
                onClick={() => setView('register')}
              >
                Create your account
              </button>
              <button
                type="button"
                className="landing-btn landing-btn-ghost-light landing-btn-lg"
                onClick={() => setView('login')}
              >
                I already have an account
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-brand">
            <span className="landing-logo-mark" aria-hidden="true">
              LZ
            </span>
            <div>
              <strong>Lindroid Zimbabwe</strong>
              <span>Book Management System</span>
            </div>
          </div>
          <p className="landing-footer-copy">
            © {new Date().getFullYear()} Lindroid Zimbabwe. Secure book management
            for libraries nationwide.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Landing
