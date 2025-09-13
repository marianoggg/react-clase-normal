import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import PublicRoutes from "./components/router/PublicRoutes";
import ProtectedRoutes from "./components/router/ProtectedRoutes";
import MainLayout from "./components/layouts/MainLayout";

function App() {
  const Nativo = lazy(() => import("./views/Nativo"));
  const Virtualizado = lazy(() => import("./views/Virtualizado"));
  const Select = lazy(() => import("./views/Select"));

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<MainLayout />}>
            <Route path="/nativo" element={<Nativo />} />
            <Route path="/virtualizado" element={<Virtualizado />} />
            <Route path="/select" element={<Select />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
