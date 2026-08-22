import { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();

  // controlled form state, held together in one object
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // Already logged in? Bounce straight to the dashboard.
  if (user) return <Navigate to="/app" replace />;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(form.username.trim(), form.password);
    if (!result.ok) {
      setError(result.message);
      addToast(result.message, { type: "error" });
      return;
    }
    addToast(`Welcome back!`, { type: "success" });
    const redirectTo = location.state?.from?.pathname ?? "/app";
    navigate(redirectTo, { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card__brand">
          <span className="brand-mark" aria-hidden="true">
            +
          </span>
          <h1>MediTrack</h1>
        </div>
        <p className="login-card__subtitle">Sign in to the hospital dashboard</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" variant="primary">
            Log in
          </Button>
        </form>

        <p className="login-card__hint">
          Demo credentials — <strong>admin</strong> / <strong>admin123</strong> or{" "}
          <strong>nurse</strong> / <strong>nurse123</strong>
        </p>
      </div>
    </div>
  );
}
