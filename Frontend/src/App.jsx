import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
    const [page, setPage] = useState("login"); // o "register"

    return (
        <>
            {page === "login" ? (
                <Login setPage={setPage} />
            ) : (
                <Register setPage={setPage} />
            )}
        </>
    );
}

export default App;