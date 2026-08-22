import { statusMeta } from "../utils/helpers";

/** Small reusable badge that turns a raw status string into a labeled pill. */
export default function StatusPill({ status }) {
  const { label, color } = statusMeta(status);
  return (
    <span className={`pill pill--${color}`}>
      <span className="pill__dot" aria-hidden="true" />
      {label}
    </span>
  );
}
