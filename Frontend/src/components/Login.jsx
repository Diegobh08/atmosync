import { useState } from "react";
import "./styles.css";

function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Completa todos los campos");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.text();

      if (data === "Usuario encontrado") {
        setError("");
        setPage("dashboard");
      } else {
        setError(data); // muestra "Usuario no existe" o "Contraseña incorrecta"
      }
    } catch (err) {
      setError("No se pudo conectar al servidor");
    }
  };

  return (
    <div className="auth-wrapper">
      {/* Left: form */}
      <div className="auth-left">
        {/* Logo */}
        <div className="auth-logo">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#333"/>
            {/* Water drop */}
            <path d="M16 4 C16 4 8 14 8 19.5 A8 8 0 0 0 24 19.5 C24 14 16 4 16 4Z" fill="#fff"/>
            {/* % symbol inside drop */}
            <circle cx="13" cy="16.5" r="1.4" fill="#333"/>
            <circle cx="19" cy="21.5" r="1.4" fill="#333"/>
            <line x1="13.8" y1="22.3" x2="18.2" y2="15.7" stroke="#333" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          AtmoSync
        </div>

        {/* Form */}
        <div className="auth-form-area">
          <h1 className="auth-title">Inicia Sesión</h1>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="input-group">
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Correo electrónico</label>
              <span className="input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
              </span>
            </div>

            {/* Password */}
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Contraseña</label>
              <span className="input-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </span>
            </div>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="btn-primary">Iniciar Sesión</button>

            <p className="auth-bottom">
              ¿No tienes una cuenta?{" "}
              <span onClick={() => setPage("Register")}>Regístrate</span>
            </p>
          </form>
        </div>
      </div>

    </div>
  );
}

export default Login;
