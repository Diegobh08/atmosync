import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
    const [page, setPage] = useState("login"); // "login" | "register" | "dashboard"

    return (
        <>
            {page === "login" && <Login setPage={setPage} />}
            {(page === "register" || page === "Register") && <Register setPage={setPage} />}
            {page === "dashboard" && <Dashboard setPage={setPage} />}
        </>
    );
}

export default App;