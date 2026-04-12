import "./navbar.css";

export default function Navbar({ setPage, activePage }) {
  return (
    <nav className="navbar">
      {/* Logo + nombre a la izquierda */}
      <div className="navbar-brand">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="#333" />
          <path d="M16 4 C16 4 8 14 8 19.5 A8 8 0 0 0 24 19.5 C24 14 16 4 16 4Z" fill="#fff" />
          <circle cx="13" cy="16.5" r="1.4" fill="#333" />
          <circle cx="19" cy="21.5" r="1.4" fill="#333" />
          <line x1="13.8" y1="22.3" x2="18.2" y2="15.7" stroke="#333" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <span className="navbar-name">AtmoSync</span>
      </div>

      {/* Links a la derecha */}
      <div className="navbar-links">
        <button
          className={`nav-link ${activePage === "dashboard" ? "nav-link--active" : ""}`}
          onClick={() => setPage("dashboard")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          Dashboard
        </button>

        <button
          className={`nav-link ${activePage === "about" ? "nav-link--active" : ""}`}
          onClick={() => setPage("about")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          Acerca de nosotros
        </button>

        <button
          className="nav-link nav-link--logout"
          onClick={() => setPage("login")}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
}
