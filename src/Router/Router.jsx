import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/index";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="*" element={<p>404 - Página não disponível.</p>} />
      </Routes>
    </BrowserRouter>
  );
}
