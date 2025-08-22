import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import PublicRoutes from "./components/router/PublicRoutes";
import ProtectedRoutes from "./components/router/ProtectedRoutes";
import MainLayout from "./components/layouts/MainLayout";

function App() {
  const Dashboard = lazy(() => import("./views/Infinite_scroll"));
  const Virtualizado = lazy(() => import("./views/Virtualizado"));

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/virtualizado" element={<Virtualizado />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
