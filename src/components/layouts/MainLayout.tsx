import { Outlet } from "react-router-dom";
import Navbar from "./Navbar"; // Suponiendo que ya tenés uno creado

function MainLayout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
