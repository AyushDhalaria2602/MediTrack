import PatientCard from "./PatientCard";

/**
 * Renders a grid of patients, or an empty/loading state.
 * Demonstrates conditional rendering (loading / empty / list) and
 * rendering lists with the `key` prop.
 */
export default function PatientList({ patients, loading }) {
  if (loading) {
    return (
      <p className="empty-state" role="status">
        Loading patient records…
      </p>
    );
  }

  if (patients.length === 0) {
    return (
      <p className="empty-state">
        No patients match your filters. Try adjusting search, ward, or status.
      </p>
    );
  }

  return (
    <div className="patient-grid">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} />
      ))}
    </div>
  );
}
