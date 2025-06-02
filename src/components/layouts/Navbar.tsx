import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
      <NavLink to="/dashboard" style={{ marginRight: "1rem" }}>
        Dashboard
      </NavLink>
      <NavLink to="/profile" style={{ marginRight: "1rem" }}>
        Profile
      </NavLink>
      <NavLink to="/notifications">Notifications</NavLink>
      <NavLink
        to="/login"
        style={{ marginLeft: "1rem" }}
        onClick={() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }}
      >
        Logout
      </NavLink>
    </nav>
  );
}

export default Navbar;
//
