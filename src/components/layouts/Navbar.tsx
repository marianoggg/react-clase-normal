import { NavLink } from "react-router-dom";

function handleLogout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
      <NavLink to="/nativo" style={{ marginRight: "1rem" }} title="Nativo">
        Infinite simple
      </NavLink>

      <NavLink to="/virtualizado" style={{ marginRight: "1rem" }}>
        Infinite Virtualizado
      </NavLink>

      <NavLink to="/select" style={{ marginRight: "1rem" }}>
        Selects
      </NavLink>

      <NavLink to="/tanStackReactTable_simple" style={{ marginRight: "1rem" }}>
        TanStackRT_simple
      </NavLink>

      <NavLink to="/login" onClick={handleLogout}>
        Logout
      </NavLink>
    </nav>
  );
}

export default Navbar;
