import { useState } from "react";
import "./Login.css";



function Login({setPage}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        // Validación
        if (!username || !password) {
            setError("Completa todos los campos");
            return;
        }

        // Simulación de login (luego lo conectamos a backend)
        if (username === "admin" && password === "1234") {
            alert("Login exitoso ");
            setError("");
        } else {
            setError("Usuario o contraseña incorrectos");
        }
    };

    return (
        <div className="container">
            <form className="card" onSubmit={handleLogin}>

                <div className="icon"></div>

                <h2>Login</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />



                {error && <p className="error">{error}</p>}

                <button type="submit">LOGIN</button>

                <p className="forgot">FORGOT YOUR PASSWORD?</p>

                <p className="signup">
                    New here? <span onClick={() => setPage("Register")}>Sign Up</span>
                </p>

            </form>
        </div>
    );
}

export default Login;