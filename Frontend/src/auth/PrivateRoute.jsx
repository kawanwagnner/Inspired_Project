import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem("authToken");

  // If authenticated, render the Outlet to show the child routes
  // Otherwise, navigate to the /signin page
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
