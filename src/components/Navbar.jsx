import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";
import Button from "./Button";

const links = [
  { to: "/app", label: "Dashboard", end: true },
  { to: "/app/patients", label: "Patients" },
  { to: "/app/appointments", label: "Appointments" },
  { to: "/app/patients/new", label: "Add Patient" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  // A small live clock — another concrete useEffect + setInterval example,
  // visible right in the header so "live" state is obvious at a glance.
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000 * 30);
    return () => window.clearInterval(intervalId);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="brand-mark" aria-hidden="true">
          +
        </span>
        <span>MediTrack</span>
      </div>

      {/* nav-with-current-page uses aria-current for accessibility */}
      <nav className="app-nav" aria-label="Primary">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => (isActive ? "is-active" : undefined)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="app-header__user">
        <span className="app-header__clock" aria-label="Current time">
          {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <span className="app-header__username">{user?.name}</span>
        <Button variant="ghost" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </header>
  );
}
