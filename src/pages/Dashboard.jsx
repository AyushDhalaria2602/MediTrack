import { useOutletContext, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import StatCard from "../components/StatCard";
import { appointments } from "../data/mockData";
import { formatDate } from "../utils/helpers";

export default function Dashboard() {
  // Read the state that Layout lifted up and passed via Outlet context.
  const { stats, loading, setFilters } = useOutletContext();
  const navigate = useNavigate();

  const upcoming = useMemo(
    () =>
      [...appointments]
        .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
        .slice(0, 5),
    []
  );

  // Interactive stat cards: clicking one jumps to /app/patients pre-filtered,
  // instead of just displaying a number. Ward rows do the same by ward.
  const goToPatients = (nextFilters) => {
    setFilters((prev) => ({ ...prev, ...nextFilters }));
    navigate("/app/patients");
  };

  if (loading) {
    return <p className="empty-state">Loading dashboard…</p>;
  }

  return (
    <section aria-labelledby="dashboard-heading">
      <div className="page-heading">
        <h1 id="dashboard-heading">Dashboard</h1>
        <p>Live snapshot of admissions, ward load, and today&apos;s schedule. Click any stat to jump to that filtered list.</p>
      </div>

      {/* "Vitals strip" — the signature layout element, built with CSS Grid */}
      <div className="vitals-strip">
        <StatCard
          label="Total patients"
          value={stats.total}
          tone="primary"
          onClick={() => goToPatients({ search: "", ward: "all", status: "all" })}
        />
        <StatCard
          label="Critical"
          value={stats.byStatus.critical ?? 0}
          tone="critical"
          hint="Requires immediate monitoring"
          onClick={() => goToPatients({ status: "critical" })}
        />
        <StatCard
          label="Needs attention"
          value={stats.byStatus.attention ?? 0}
          tone="warning"
          onClick={() => goToPatients({ status: "attention" })}
        />
        <StatCard
          label="Stable"
          value={stats.byStatus.stable ?? 0}
          tone="success"
          onClick={() => goToPatients({ status: "stable" })}
        />
      </div>

      <div className="dashboard-grid">
        <article className="panel">
          <h2>Ward occupancy</h2>
          <ul className="ward-list">
            {Object.entries(stats.byWard).map(([ward, count]) => (
              <li key={ward}>
                <button
                  type="button"
                  className="ward-list__row"
                  onClick={() => goToPatients({ ward, status: "all" })}
                >
                  <span className="ward-list__name">{ward}</span>
                  <span className="ward-list__bar">
                    <span
                      className="ward-list__fill"
                      style={{ width: `${(count / stats.total) * 100}%` }}
                    />
                  </span>
                  <span className="ward-list__count">{count}</span>
                </button>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h2>Upcoming appointments</h2>
          <ul className="appointment-list">
            {upcoming.map((appt) => (
              <li key={appt.id}>
                <div>
                  <p className="appointment-list__type">{appt.type}</p>
                  <p className="appointment-list__doctor">{appt.doctor}</p>
                </div>
                <div className="appointment-list__time">
                  <span>{formatDate(appt.date)}</span>
                  <span>{appt.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
