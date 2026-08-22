import { useState, useEffect, useCallback, useMemo } from "react";
import { patients as seedPatients } from "../data/mockData";
import { queryPatients, countByWard, countByStatus } from "../utils/helpers";

/**
 * Simulates an async network request (like the Fetch API hitting a real
 * hospital records API) that resolves with patient data after a short delay.
 * Returns a Promise, so callers can `await` it — practicing Promises / async-await.
 */
function fetchPatientsFromServer() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...seedPatients]), 500);
  });
}

/**
 * Custom hook that owns all patient data + derived stats for the app.
 * Demonstrates:
 *   - useState for local state
 *   - useEffect for a one-time "fetch on mount" side effect
 *   - async/await consuming a Promise
 *   - useCallback to keep function identities stable across renders
 *   - useMemo to avoid recomputing derived data on every render
 */
export function usePatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ search: "", ward: "all", status: "all" });

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        const data = await fetchPatientsFromServer();
        if (isMounted) setPatients(data);
      } catch (err) {
        if (isMounted) setError("Could not load patient records.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();
    // cleanup avoids setting state after unmount
    return () => {
      isMounted = false;
    };
  }, []);

  const addPatient = useCallback((patient) => {
    setPatients((prev) => [patient, ...prev]);
  }, []);

  const updatePatient = useCallback((id, updates) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const removePatient = useCallback((id) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Derived, filtered list — recomputed only when patients/filters change.
  const filteredPatients = useMemo(
    () => queryPatients(patients, filters),
    [patients, filters]
  );

  // Derived dashboard stats — also memoized.
  const stats = useMemo(
    () => ({
      total: patients.length,
      byWard: countByWard(patients),
      byStatus: countByStatus(patients),
    }),
    [patients]
  );

  return {
    patients,
    filteredPatients,
    loading,
    error,
    filters,
    setFilters,
    stats,
    addPatient,
    updatePatient,
    removePatient,
  };
}
