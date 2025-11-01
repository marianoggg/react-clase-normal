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
  const TanStackReactTable_simple = lazy(
    () => import("./views/TanStackReactTable_simple")
  );
  const TanStackReactTableUser = lazy(
    () => import("./views/TanStackReactTable_users")
  );
  const PruebasEffets = lazy(() => import("./views/PruebasEffect"));
  const UserDetailForm = lazy(() => import("./views/userDetailFormRBootstrap"));

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
            <Route
              path="/tanStackReactTable_simple"
              element={<TanStackReactTable_simple />}
            />
            <Route
              path="/tanStackReactTable_users"
              element={<TanStackReactTableUser />}
            />

            <Route path="/pruebasEffect" element={<PruebasEffets />} />

            <Route path="/userDetailForm" element={<UserDetailForm />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
