import './App.css';


// ──────────────────────────────────────────
// SVG Icons
// ──────────────────────────────────────────
const IconHome = () => (
  <svg viewBox="0 0 24 24">
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
    <path d="M9 21V12h6v9" />
  </svg>
);

const IconSearch = () => (
  <svg viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconCalendar = () => (
  <svg viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconHistory = () => (
  <svg viewBox="0 0 24 24">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-4" />
    <polyline points="12 7 12 12 16 14" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconPlay = () => (
  <svg viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);

// ──────────────────────────────────────────
// Letter Hover Helper
// ──────────────────────────────────────────
function LetterHover({ text }) {
  return (
    <span className="letter-hover-group">
      {text.split('').map((char, i) => (
        <span key={i} className="letter-hover">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

// ──────────────────────────────────────────
// Navbar
// ──────────────────────────────────────────
function Navbar() {
  return (
    <nav className="navbar">
      <a href="/" className="nav-logo">
        <img src="/logo.png" alt="NWMSU Logo" />
      </a>

      <ul className="nav-links">
        <li>
          <a href="/" aria-label="Home">
            <IconHome />
            <span className="link-label">Home</span>
          </a>
        </li>
        <li>
          <a href="/search" aria-label="Search">
            <IconSearch />
            <span className="link-label">Search</span>
          </a>
        </li>
        <li>
          <a href="/calendar" aria-label="Calendar">
            <IconCalendar />
            <span className="link-label">Calendar</span>
          </a>
        </li>
        <li>
          <a href="/history" aria-label="History">
            <IconHistory />
            <span className="link-label">History</span>
          </a>
        </li>
        <li>
          <a href="/contact" aria-label="Contact">
            <IconMail />
            <span className="link-label">Contact</span>
          </a>
        </li>
      </ul>

      <button className="nav-cta" id="nav-view-exams-btn">View Exams</button>
    </nav>
  );
}

// ──────────────────────────────────────────
// Hero
// ──────────────────────────────────────────
function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">

        <h1 className="hero-heading">
          <LetterHover text="Welcome To" /><br />
          <LetterHover text="NWMSU" /><br />
          <LetterHover text="Exam Scheduler!" />
        </h1>

        <p className="hero-sub">
          Add your exams to your calendar with ease!<br />
          Just search, click add, and export&hellip;
        </p>

        <div className="hero-actions">
          <button className="btn-primary" id="get-started-btn">GET STARTED</button>
        </div>

      </div>

      <div className="hero-illustration">
        <img src="/writing-pen.png" alt="Student writing exam" />
      </div>
    </section>
  );
}

// ──────────────────────────────────────────
// App
// ──────────────────────────────────────────
export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
    </div>
  );
}
