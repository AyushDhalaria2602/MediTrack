import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useOutletContext, Link } from "react-router-dom";
import StatusPill from "../components/StatusPill";
import Button from "../components/Button";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContext";
import { formatDate } from "../utils/helpers";

// Small helper: nudge a numeric vital up/down by a bounded random step,
// clamped to a plausible range — just enough to feel "live" on screen.
function jitter(value, step, min, max) {
  const next = value + (Math.random() - 0.5) * step;
  return Math.min(max, Math.max(min, next));
}

export default function PatientDetail() {
  // Dynamic route param: the "id" segment from /app/patients/:id
  const { id } = useParams();
  const navigate = useNavigate();
  const { patients, updatePatient, removePatient } = useOutletContext();
  const { addToast } = useToast();

  const patient = patients.find((p) => p.id === id);

  const [notes, setNotes] = useState(patient?.notes ?? "");
  const [saved, setSaved] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [liveVitals, setLiveVitals] = useState(patient?.vitals ?? null);
  const notesRef = useRef(null);

  // Live monitor: for patients who aren't stable, simulate a bedside
  // monitor by nudging vitals every couple of seconds. Demonstrates
  // useEffect + setInterval + cleanup, driving genuinely "live" UI.
  useEffect(() => {
    if (!patient || patient.status === "stable") return;

    const intervalId = window.setInterval(() => {
      setLiveVitals((prev) => {
        const base = prev ?? patient.vitals;
        return {
          heartRate: Math.round(jitter(base.heartRate, 6, 50, 160)),
          bp: base.bp,
          temp: Math.round(jitter(base.temp, 0.3, 96, 104) * 10) / 10,
          spo2: Math.round(jitter(base.spo2, 1.5, 85, 100)),
        };
      });
    }, 2200);

    return () => window.clearInterval(intervalId);
  }, [patient]);

  if (!patient) {
    return (
      <section className="empty-state">
        <p>No patient found with ID “{id}”.</p>
        <Link className="btn btn--primary" to="/app/patients">
          Back to patient list
        </Link>
      </section>
    );
  }

  const { name, age, gender, ward, status, admitted, doctor } = patient;
  const vitals = liveVitals ?? patient.vitals;
  const isLive = status !== "stable";

  const handleSaveNotes = (event) => {
    event.preventDefault();
    updatePatient(id, { notes });
    setSaved(true);
    addToast(`Notes saved for ${name}.`, { type: "success" });
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDischarge = () => {
    removePatient(id);
    addToast(`${name} has been discharged.`, { type: "info" });
    navigate("/app/patients");
  };

  return (
    <section aria-labelledby="patient-heading">
      <div className="page-heading page-heading--split">
        <div>
          <h1 id="patient-heading">{name}</h1>
          <p>
            {id} · {age} yrs · {gender} · {ward}
          </p>
        </div>
        <StatusPill status={status} />
      </div>

      <div className="detail-grid">
        <article className="panel">
          <div className="panel__header">
            <h2>Vitals</h2>
            {isLive && (
              <span className="live-indicator" title="Updating in real time">
                <span className="live-indicator__dot" aria-hidden="true" />
                Live
              </span>
            )}
          </div>
          <dl className="vitals-list" aria-live={isLive ? "polite" : undefined}>
            <div>
              <dt>Heart rate</dt>
              <dd>{vitals.heartRate} bpm</dd>
            </div>
            <div>
              <dt>Blood pressure</dt>
              <dd>{vitals.bp}</dd>
            </div>
            <div>
              <dt>Temperature</dt>
              <dd>{vitals.temp}°F</dd>
            </div>
            <div>
              <dt>SpO₂</dt>
              <dd>{vitals.spo2}%</dd>
            </div>
          </dl>
          <p className="detail-meta">
            Attending: {doctor} · Admitted {formatDate(admitted)}
          </p>
        </article>

        <article className="panel">
          <h2>Clinical notes</h2>
          <form onSubmit={handleSaveNotes}>
            <div className="field">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                ref={notesRef}
                rows="5"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
            <div className="detail-actions">
              <Button type="submit" variant="primary">
                Save notes
              </Button>
              <Button type="button" variant="danger" onClick={() => setConfirmOpen(true)}>
                Discharge patient
              </Button>
            </div>
            {saved && (
              <p className="form-success" role="status">
                Notes saved.
              </p>
            )}
          </form>
        </article>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Discharge patient?"
        message={`This will remove ${name} from the active patient list. This cannot be undone.`}
        confirmLabel="Discharge"
        tone="danger"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          handleDischarge();
        }}
      />
    </section>
  );
}
