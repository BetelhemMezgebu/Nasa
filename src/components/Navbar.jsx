import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">

      <Link
        to="/"
        className="navbar-brand"
        onClick={closeMenu}
      >
        <span className="navbar-logo">🚀</span>
        <span>NASA Explorer</span>
      </Link>

      <button
        type="button"
        className={`mobile-menu-button ${
          menuOpen ? "menu-open" : ""
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div
        className={`navbar-links ${
          menuOpen ? "navbar-links-open" : ""
        }`}
      >

        <NavLink
          to="/"
          end
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/apod"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          APOD
        </NavLink>

        <NavLink
          to="/favorites"
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive
              ? "nav-link active"
              : "nav-link"
          }
        >
          Favorites
        </NavLink>

      </div>

    </nav>
  );
}

export default Navbar;