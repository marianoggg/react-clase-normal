import { Navigate, Outlet } from "react-router-dom";

function PublicRoutes() {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/nativo" />;
  }

  return <Outlet />;
}

export default PublicRoutes;
