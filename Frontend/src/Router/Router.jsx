import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/index.jsx";
import SignIn from "../pages/SignIn/index.jsx";
import SignUp from "../pages/SignUp/index.jsx";
import Feed from "../pages/Feed/index.jsx";
import Profile from "../pages/Profile/index.jsx";
import PrivateRoute from "../auth/PrivateRoute.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Routers() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<p>404 - Página não disponível.</p>} />
      </Routes>
    </BrowserRouter>
  );
}
