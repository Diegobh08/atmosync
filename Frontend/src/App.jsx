import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import About from "./components/About";

function App() {
    const [page, setPage] = useState("login"); // "login" | "register" | "dashboard" | "about"

    return (
        <>
            {page === "login" && <Login setPage={setPage} />}
            {(page === "register" || page === "Register") && <Register setPage={setPage} />}
            {page === "dashboard" && <Dashboard setPage={setPage} />}
            {page === "about" && <About setPage={setPage} />}
        </>
    );
}

export default App;