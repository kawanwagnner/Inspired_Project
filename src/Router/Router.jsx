import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/Main/Home";

export function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<p>404 - Página não disponível.</p>} />
      </Routes>
    </BrowserRouter>
  );
}