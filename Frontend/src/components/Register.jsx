import { useState } from "react";
import "./register.css";

function Register({setPage}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Completa todos los campos");
            return;
        }

        // Guardar en el navegador
        localStorage.setItem("user", JSON.stringify({ username, password }));

        alert("Registro exitoso");
        setError("");
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            setError("No hay usuarios registrados");
            return;
        }

        if (username === user.username && password === user.password) {
            alert("Login correcto");
        } else {
            setError("Datos incorrectos");
        }
    };

    return (
        <div className="container">
            <form className="card" onSubmit={handleRegister}>

                <div className="icon"></div>

                <h2>Registro</h2>
                <input
                    type="gmail"
                    placeholder="Digita tu correo electronico"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Crea un nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />



                <input
                    type="password"
                    placeholder="Crea una contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />





                {error && <p className="error">{error}</p>}

                <button type="submit">CREAR CUENTA</button>

                <p className="forgot">OLVIDASTE TU CONTRASEÑA?</p>

                <p className="signup">
                    Ya tienes una cuenta?{" "}
                    <span onClick={() => setPage("login")}>Iniciar sesión</span>
                </p>

            </form>
        </div>
    );
}

export default Register;