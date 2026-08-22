import { useState, useMemo } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { appointments } from "../data/mockData";
import { formatDate } from "../utils/helpers";

const columns = [
  { key: "patient", label: "Patient" },
  { key: "doctor", label: "Doctor" },
  { key: "type", label: "Type" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
];

const today = new Date().toISOString().slice(0, 10);

export default function Appointments() {
  const { patients } = useOutletContext();

  // Interactive, sortable table: click a column header to sort by it,
  // click again to reverse direction.
  const [sortKey, setSortKey] = useState("date");
  const [sortDir, setSortDir] = useState("asc");

  const rows = useMemo(() => {
    const withPatientNames = appointments.map((appt) => ({
      ...appt,
      patientName: patients.find((p) => p.id === appt.patientId)?.name ?? "Unknown",
    }));

    const sorted = [...withPatientNames].sort((a, b) => {
      const fieldA = sortKey === "patient" ? a.patientName : a[sortKey];
      const fieldB = sortKey === "patient" ? b.patientName : b[sortKey];
      const key = sortKey === "date" ? `${a.date}${a.time}` : fieldA;
      const keyB = sortKey === "date" ? `${b.date}${b.time}` : fieldB;
      return String(key).localeCompare(String(keyB));
    });

    return sortDir === "asc" ? sorted : sorted.reverse();
  }, [patients, sortKey, sortDir]);

  const handleSort = (key) => {
    if (key === sortKey) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  return (
    <section aria-labelledby="appointments-heading">
      <div className="page-heading">
        <h1 id="appointments-heading">Appointments</h1>
        <p>All scheduled visits across every department. Click a column heading to sort.</p>
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <caption className="sr-only">Scheduled appointments, sortable by column</caption>
          <thead>
            <tr>
              {columns.map((col) => {
                const isActive = sortKey === col.key;
                return (
                  <th key={col.key} scope="col" aria-sort={isActive ? (sortDir === "asc" ? "ascending" : "descending") : "none"}>
                    <button type="button" className="sort-btn" onClick={() => handleSort(col.key)}>
                      {col.label}
                      <span className="sort-btn__icon" aria-hidden="true">
                        {isActive ? (sortDir === "asc" ? "▲" : "▼") : "↕"}
                      </span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((appt) => (
              <tr key={appt.id} className={appt.date === today ? "is-today" : undefined}>
                <td>
                  {appt.patientId ? (
                    <Link to={`/app/patients/${appt.patientId}`}>{appt.patientName}</Link>
                  ) : (
                    appt.patientName
                  )}
                </td>
                <td>{appt.doctor}</td>
                <td>{appt.type}</td>
                <td>
                  {formatDate(appt.date)}
                  {appt.date === today && <span className="today-badge">Today</span>}
                </td>
                <td>{appt.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
