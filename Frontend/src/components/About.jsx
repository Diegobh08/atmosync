import Navbar from "./Navbar";
import "./about.css";

const integrantes = [
  {
    nombre: "Richard Montes",
    iniciales: "RM",
    rol: "Desarrollador",
  },
  {
    nombre: "Ronald Pradilla",
    iniciales: "RP",
    rol: "Desarrollador",
  },
  {
    nombre: "Diego Barrios",
    iniciales: "DB",
    rol: "Desarrollador",
  },
];

export default function About({ setPage }) {
  return (
    <div className="about-layout">
      <Navbar setPage={setPage} activePage="about" />

      <main className="about-main">
        {/* ── Hero ── */}
        <section className="about-hero">
          <div className="about-hero-icon">
            <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" rx="16" fill="#0f172a" />
              <path d="M32 8 C32 8 16 28 16 39 A16 16 0 0 0 48 39 C48 28 32 8 32 8Z" fill="#fff" />
              <circle cx="26" cy="33" r="2.8" fill="#0f172a" />
              <circle cx="38" cy="43" r="2.8" fill="#0f172a" />
              <line x1="27.6" y1="44.6" x2="36.4" y2="31.4" stroke="#0f172a" strokeWidth="2.6" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="about-title">AtmoSync</h1>
          <p className="about-subtitle">Monitoreo ambiental en tiempo real</p>
        </section>

        {/* ── Descripción del proyecto ── */}
        <section className="about-section">
          <h2 className="section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            Sobre el proyecto
          </h2>

          <div className="about-cards">
            <div className="about-card">
              <div className="about-card-icon temp-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                </svg>
              </div>
              <h3>Temperatura</h3>
              <p>Recolección continua de datos de temperatura ambiente con precisión en tiempo real.</p>
            </div>

            <div className="about-card">
              <div className="about-card-icon hum-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <h3>Humedad</h3>
              <p>Medición precisa de la humedad relativa del ambiente para análisis completo.</p>
            </div>

            <div className="about-card">
              <div className="about-card-icon esp-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M6 10h.01M6 14h.01M10 10h4M10 14h4M18 10h.01M18 14h.01" />
                </svg>
              </div>
              <h3>ESP32</h3>
              <p>Microcontrolador ESP32 conectado a sensores para transmisión inalámbrica de datos.</p>
            </div>
          </div>
        </section>

        {/* ── Equipo ── */}
        <section className="about-section">
          <h2 className="section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Equipo de trabajo
          </h2>

          <div className="team-grid">
            {integrantes.map((p) => (
              <div key={p.nombre} className="team-card">
                <div className="team-avatar">{p.iniciales}</div>
                <h3 className="team-name">{p.nombre}</h3>
                <span className="team-role">{p.rol}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tecnologías ── */}
        <section className="about-section">
          <h2 className="section-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            Tecnologías utilizadas
          </h2>
          <div className="tech-list">
            {["ESP32", "Sensor DHT11 / DHT22", "React", "Python / FastAPI", "Recharts"].map((tech) => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
