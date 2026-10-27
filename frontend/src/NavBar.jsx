
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: "#F5F0E9",
        borderBottom: "1px solid #E5DCD1",
        padding: "18px 0"
      }}
    >
      <div className="container">
        <NavLink
          className="navbar-brand"
          to="/"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "26px",
            color: "#4B3C32",
            fontWeight: "600"
          }}
        >
          <i className="bi bi-camera me-2"></i>
          The Photography Atelier
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#studioNavbar"
          aria-controls="studioNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="studioNavbar"
        >
          <div className="navbar-nav ms-auto gap-lg-3">
            {[
              { path: "/", label: "Home" },
              { path: "/dashboard", label: "Dashboard" },
              { path: "/packages", label: "Our Packages" },
              { path: "/add", label: "Add Package" }
            ].map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "fw-bold" : ""}`
                }
                style={{ color: "#655448" }}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
