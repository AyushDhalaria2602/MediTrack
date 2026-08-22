import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { usePatients } from "../hooks/usePatients";

/**
 * Shared shell for every authenticated page.
 * <Outlet /> is where React Router renders the matched *nested* route —
 * this is what makes /app, /app/patients, /app/patients/:id etc. all
 * share the same Navbar without repeating it in every page.
 *
 * LIFTING STATE UP: patient data is owned once, here, at the layout level
 * (the closest shared ancestor of every page that needs it) instead of in
 * each page individually. Rather than drilling it down as props through
 * every intermediate element, it's handed to the matched child route via
 * React Router's Outlet `context` — the pages read it with
 * `useOutletContext()`.
 */
export default function Layout() {
  const patientsState = usePatients();

  return (
    <div className="app-shell">
      <Navbar />
      <main id="main-content" className="app-main">
        <Outlet context={patientsState} />
      </main>
      <footer className="app-footer">
        <p>MediTrack Hospital Management Dashboard</p>
      </footer>
    </div>
  );
}
