import { useRef, useEffect } from "react";
import { wards } from "../data/mockData";
import Button from "./Button";

const defaultFilters = { search: "", ward: "all", status: "all" };

/**
 * Controlled search + filter form.
 * - Every input's value comes from `filters` state (controlled components)
 * - useRef grabs a direct DOM handle to auto-focus the search box on mount
 * - A window "keydown" listener lets "/" jump focus to search from
 *   anywhere on the page, like GitHub/Slack-style shortcuts
 */
export default function FilterBar({ filters, onChange }) {
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const isTypingElsewhere = ["INPUT", "SELECT", "TEXTAREA"].includes(
        document.activeElement?.tagName
      );
      if (event.key === "/" && !isTypingElsewhere) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleField = (field) => (event) => {
    onChange({ ...filters, [field]: event.target.value });
  };

  const hasActiveFilters =
    filters.search !== "" || filters.ward !== "all" || filters.status !== "all";

  return (
    <form className="filter-bar" role="search" onSubmit={(e) => e.preventDefault()}>
      <div className="field">
        <label htmlFor="search">Search patients</label>
        <input
          id="search"
          ref={searchRef}
          type="search"
          placeholder="Search by name or ID… (press / to focus)"
          value={filters.search}
          onChange={handleField("search")}
        />
      </div>

      <div className="field">
        <label htmlFor="ward">Ward</label>
        <select id="ward" value={filters.ward} onChange={handleField("ward")}>
          <option value="all">All wards</option>
          {wards.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="status">Status</label>
        <select id="status" value={filters.status} onChange={handleField("status")}>
          <option value="all">All statuses</option>
          <option value="stable">Stable</option>
          <option value="attention">Needs attention</option>
          <option value="critical">Critical</option>
        </select>
      </div>

      {hasActiveFilters && (
        <div className="field field--action">
          <span aria-hidden="true">&nbsp;</span>
          <Button variant="ghost" onClick={() => onChange(defaultFilters)}>
            Clear filters
          </Button>
        </div>
      )}
    </form>
  );
}
