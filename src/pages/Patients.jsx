import { useOutletContext } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import PatientList from "../components/PatientList";

export default function Patients() {
  const { filteredPatients, filters, setFilters, loading } = useOutletContext();

  return (
    <section aria-labelledby="patients-heading">
      <div className="page-heading">
        <h1 id="patients-heading">Patients</h1>
        <p>Search and filter every patient currently admitted.</p>
      </div>

      <FilterBar filters={filters} onChange={setFilters} />

      {!loading && (
        <p className="result-count" role="status">
          {filteredPatients.length} {filteredPatients.length === 1 ? "patient" : "patients"} found
        </p>
      )}

      <PatientList patients={filteredPatients} loading={loading} />
    </section>
  );
}
