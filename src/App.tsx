import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import PublicRoutes from "./components/router/PublicRoutes";
import ProtectedRoutes from "./components/router/ProtectedRoutes";
import MainLayout from "./components/layouts/MainLayout";

function App() {
  const Dashboard = lazy(() => import("./views/Dashboard"));
  const Notifications = lazy(() => import("./views/Notifications"));
  const Profile = lazy(() => import("./views/Profile"));

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
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
