import "./styles.css";
import logojp from "./assets/logo.jpg";
import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
export default function App() {
  const [page, setPage] = useState(0);
  return page === 0 ? (
    <Login changePage={() => setPage(1)} />
  ) : (
    <Register changePage={() => setPage(0)} />
  );
}
