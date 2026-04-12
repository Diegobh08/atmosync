import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import "./dashboard.css";

// ── Datos simulados ──
const datosMock = [
  { id: 1, hora: "08:00", temperatura: 22, humedad: 65 },
  { id: 2, hora: "08:30", temperatura: 23, humedad: 63 },
  { id: 3, hora: "09:00", temperatura: 24, humedad: 61 },
  { id: 4, hora: "09:30", temperatura: 25, humedad: 59 },
  { id: 5, hora: "10:00", temperatura: 26, humedad: 57 },
  { id: 6, hora: "10:30", temperatura: 27, humedad: 55 },
  { id: 7, hora: "11:00", temperatura: 28, humedad: 54 },
  { id: 8, hora: "11:30", temperatura: 29, humedad: 52 },
  { id: 9, hora: "12:00", temperatura: 30, humedad: 50 },
  { id: 10, hora: "12:30", temperatura: 28, humedad: 53 },
];

export default function Dashboard({ setPage }) {
  const [datos] = useState(datosMock);

  const ultimoRegistro = datos[datos.length - 1] || {};

  return (
    <div className="dash-layout">
      <main className="dash-main">
        {/* ── Header ── */}
        <header className="dash-header">
          <div className="dash-logo">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#333" />
              <path d="M16 4 C16 4 8 14 8 19.5 A8 8 0 0 0 24 19.5 C24 14 16 4 16 4Z" fill="#fff" />
              <circle cx="13" cy="16.5" r="1.4" fill="#333" />
              <circle cx="19" cy="21.5" r="1.4" fill="#333" />
              <line x1="13.8" y1="22.3" x2="18.2" y2="15.7" stroke="#333" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            AtmoSync
          </div>

          <div className="dash-header-right">
            <span className="dash-badge">En vivo</span>
            <button className="dash-logout" onClick={() => setPage("login")}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* ── Tarjetas de resumen ── */}
        <div className="dash-cards">
          <div className="dash-card temp">
            <span className="card-label">Temperatura actual</span>
            <span className="card-value">{ultimoRegistro.temperatura ?? "--"}°C</span>
          </div>
          <div className="dash-card hum">
            <span className="card-label">Humedad actual</span>
            <span className="card-value">{ultimoRegistro.humedad ?? "--"}%</span>
          </div>
        </div>

        {/* ── Gráficas ── */}
        <div className="dash-charts">
          <div className="dash-chart-card">
            <h2 className="chart-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
              </svg>
              Temperatura (°C)
            </h2>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={datos} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hora" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, fontSize: 13 }}
                  formatter={(v) => [`${v}°C`, "Temperatura"]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="temperatura"
                  stroke="#64748b"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Temperatura"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="dash-chart-card">
            <h2 className="chart-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
              Humedad (%)
            </h2>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={datos} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hora" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, fontSize: 13 }}
                  formatter={(v) => [`${v}%`, "Humedad"]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="humedad"
                  stroke="#64748b"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  name="Humedad"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── Tablas ── */}
        <div className="dash-tables">
          <div className="dash-table-card">
            <h2 className="table-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
              </svg>
              Registros de Temperatura
            </h2>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Hora</th>
                    <th>Temperatura (°C)</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {datos.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.hora}</td>
                      <td>{row.temperatura}</td>
                      <td>
                        <span className={`badge ${row.temperatura > 27 ? "badge-alert" : "badge-ok"}`}>
                          {row.temperatura > 27 ? "Alta" : "Normal"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="dash-table-card">
            <h2 className="table-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
              Registros de Humedad
            </h2>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Hora</th>
                    <th>Humedad (%)</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {datos.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.hora}</td>
                      <td>{row.humedad}</td>
                      <td>
                        <span className={`badge ${row.humedad < 50 ? "badge-alert" : "badge-ok"}`}>
                          {row.humedad < 50 ? "Baja" : "Normal"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
