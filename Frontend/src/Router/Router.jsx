import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/index.jsx";
import SignIn from "../pages/SignIn/index.jsx";
import SignUp from "../pages/SignUp/index.jsx";
import Feed from "../pages/Feed/index.jsx";
import Profile from "../pages/Profile/index.jsx"; // Importe o componente Profile
import PrivateRoute from "../auth/PrivateRoute.jsx";

export function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/feed" element={<Feed />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<p>404 - Página não disponível.</p>} />
      </Routes>
    </BrowserRouter>
  );
}
