import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import "./dashboard.css";
import Navbar from "./Navbar";

export default function Dashboard({ setPage }) {

  // ✅ ESTADO
  const [datos, setDatos] = useState([]);

  // ✅ EFECTO (traer datos)
  useEffect(() => {

    const obtenerDatos = () => {
      fetch("http://172.16.25.213:4000/lecturas")
          .then(res => res.json())
          .then(data => {
            console.log("Datos del servidor:", data);
            const datosFormateados = data.map((item, index) => ({
              id: index + 1,
              hora: new Date().toLocaleTimeString(),
              temperatura: item.temperatura,
              humedad: item.humedad
            }));

            setDatos(datosFormateados.slice(0, 10));
          })
          .catch(err => console.error(err));
    };

    obtenerDatos();

    const interval = setInterval(obtenerDatos, 3000);

    return () => clearInterval(interval);

  }, []);

    const ultimoRegistro = datos[0] || {};


  return (
      <div className="dash-layout">
        <Navbar setPage={setPage} activePage="dashboard" />

        <main className="dash-main">

          {/* TARJETAS */}
          <div className="dash-cards">
            <div className="dash-card temp">
              <span className="card-label">Temperatura actual</span>
              <span className="card-value">
              {ultimoRegistro.temperatura ?? "--"}°C
            </span>
            </div>

            <div className="dash-card hum">
              <span className="card-label">Humedad actual</span>
              <span className="card-value">
              {ultimoRegistro.humedad ?? "--"}%
            </span>
            </div>
          </div>

          {/* AQUÍ SIGUE TODO TU CÓDIGO IGUAL */}

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
