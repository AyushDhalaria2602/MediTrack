import { useState } from "react";
import { Link } from "react-router-dom";
import StatusPill from "./StatusPill";
import { formatDate } from "../utils/helpers";

/** Renders one patient as a card. Used inside PatientList via .map(). */
export default function PatientCard({ patient }) {
  const { id, name, age, gender, ward, status, admitted, doctor, vitals } = patient;

  // Local UI-only state: expand/collapse a quick vitals preview without
  // leaving the list or triggering a route change.
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="patient-card">
      <header className="patient-card__header">
        <h3>
          {/* Dynamic route: /patients/:id */}
          <Link to={`/app/patients/${id}`}>{name}</Link>
        </h3>
        <StatusPill status={status} />
      </header>
      <dl className="patient-card__meta">
        <div>
          <dt>ID</dt>
          <dd>{id}</dd>
        </div>
        <div>
          <dt>Age / Gender</dt>
          <dd>
            {age} · {gender}
          </dd>
        </div>
        <div>
          <dt>Ward</dt>
          <dd>{ward}</dd>
        </div>
        <div>
          <dt>Admitted</dt>
          <dd>{formatDate(admitted)}</dd>
        </div>
      </dl>
      <p className="patient-card__doctor">Attending: {doctor}</p>

      <button
        type="button"
        className="patient-card__toggle"
        aria-expanded={expanded}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {expanded ? "Hide quick vitals ▲" : "Quick vitals ▼"}
      </button>

      {expanded && (
        <dl className="patient-card__vitals">
          <div>
            <dt>Heart rate</dt>
            <dd>{vitals.heartRate} bpm</dd>
          </div>
          <div>
            <dt>Blood pressure</dt>
            <dd>{vitals.bp}</dd>
          </div>
          <div>
            <dt>Temp</dt>
            <dd>{vitals.temp}°F</dd>
          </div>
          <div>
            <dt>SpO₂</dt>
            <dd>{vitals.spo2}%</dd>
          </div>
        </dl>
      )}

      <Link className="patient-card__link" to={`/app/patients/${id}`}>
        View full record →
      </Link>
    </article>
  );
}
