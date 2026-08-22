// ---------------------------------------------------------------------------
// A grab-bag of small pure helper functions.
// Deliberately written to show off ES6+ syntax used throughout the app:
//   - arrow functions
//   - object/array destructuring
//   - the spread (...) and rest (...) operators
//   - default parameters
//   - template literals
// ---------------------------------------------------------------------------

/** Format an ISO date string ("2026-08-17") into a readable label. */
export const formatDate = (isoDate, locale = "en-IN") => {
  const date = new Date(isoDate);
  return date.toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/** Map a patient status to a color + human label used across the UI. */
export const statusMeta = (status) => {
  // Object literal used as a lookup table instead of a switch statement.
  const table = {
    stable: { label: "Stable", color: "success" },
    attention: { label: "Needs attention", color: "warning" },
    critical: { label: "Critical", color: "critical" },
  };
  return table[status] ?? { label: "Unknown", color: "muted" };
};

/**
 * Filter + sort patients in one pass.
 * `filters` is destructured with defaults, `...rest` (rest operator)
 * is kept so the function can be extended without breaking callers.
 */
export const queryPatients = (list, { search = "", ward = "all", status = "all", ...rest } = {}) => {
  const term = search.trim().toLowerCase();

  return list
    .filter((patient) => {
      const matchesSearch =
        !term ||
        patient.name.toLowerCase().includes(term) ||
        patient.id.toLowerCase().includes(term);
      const matchesWard = ward === "all" || patient.ward === ward;
      const matchesStatus = status === "all" || patient.status === status;
      return matchesSearch && matchesWard && matchesStatus;
    })
    .sort((a, b) => a.name.localeCompare(b.name));
};

/** Combine a base patient record with partial updates (spread operator). */
export const mergePatient = (original, updates) => ({
  ...original,
  ...updates,
  vitals: { ...original.vitals, ...(updates.vitals ?? {}) },
});

/** Simple id generator for newly added records. */
export const generateId = (prefix = "p") =>
  `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;

/** Count patients per ward using reduce — practicing array/loop basics. */
export const countByWard = (list) =>
  list.reduce((acc, patient) => {
    acc[patient.ward] = (acc[patient.ward] ?? 0) + 1;
    return acc;
  }, {});

/** Count patients per status. */
export const countByStatus = (list) =>
  list.reduce((acc, { status }) => {
    // destructuring the parameter directly
    acc[status] = (acc[status] ?? 0) + 1;
    return acc;
  }, {});
