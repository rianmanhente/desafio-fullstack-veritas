import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Board from "./Pages/Board";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

console.log("Arquivo App.tsx foi carregado");

function App() {
  return (
    <Router>
      <Routes>
        {/* Redireciona a rota raiz para o login */}
        <Route path="/" element={<Navigate to="/register"  />} />

        {/* Telas de autenticação */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Tela principal (Board) */}
        <Route path="/board" element={<Board />} />

        {/* Rota coringa (404) */}
        <Route path="*" element={<h1 style={{ textAlign: "center", color: "black"}}>Página não encontrada</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
